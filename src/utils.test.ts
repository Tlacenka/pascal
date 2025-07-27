import { describe, expect, it } from 'vitest';
import { Strength, SymbolCategory } from './constants';
import {
  calculateStrength,
  containsAcceptableSequences,
  containsCategory,
  containsCharacterCategories,
  containsForbiddenCharacters,
  containsUpperAmongLowercase,
  isFair,
  isStrong,
  isWeak,
} from './utils';

describe('calculateStrength', () => {
  it.each([
    ['', 'unacceptable'],
    ['Aho1', 'unacceptable'], // too short
    // BUG 9: this is not enforced
    // ['123456', 'unacceptable'], // missing uppercase and lowercase
    ['12345$', 'unacceptable'], // forbidden character $
    ['HeLL1!', 'weak'],
    ['HeLLo123!', 'fair'],
    ['HeLLos12345!', 'strong'],
  ] satisfies [string, Strength][])(
    'should classify password %s as %s',
    (text, strength) => {
      expect(calculateStrength(text)).toBe(strength);
    }
  );
});

describe('isWeak', () => {
  it.each([
    [6, 'Hello1'],
    [7, 'Hello12'],
  ] satisfies [number, string][])(
    'should classify %d-character password with lowercase, uppercase and number as weak',
    (_, text) => {
      expect(isWeak(text)).toBe(true);
    }
  );
  it('should reject strings shorter than 5 characters (bug included)', () => {
    expect(isWeak('Aa12')).toBe(false);
  });

  // BUG 9: this is not enforced
  // it('should reject strings without lowercase characters', () => {
  //   expect(isWeak('HELLO123')).toBe(false);
  // });
  // it('should reject strings without uppercase characters', () => {
  //   expect(isWeak('hello123')).toBe(false);
  // });
  // it('should reject strings without numbers', () => {
  //   expect(isWeak('Password')).toBe(false);
  // });
});

describe('isFair', () => {
  it.each([
    [9, '1passWord'],
    [10, '12passWord'],
  ] satisfies [number, string][])(
    'should classify %d-character password with lowercase, uppercase and number and uppercase among lowercase as fair',
    (_, text) => {
      expect(isFair(text)).toBe(true);
    }
  );
  it('should reject strings shorter than 9 characters', () => {
    expect(isFair('aAa12345')).toBe(false);
  });
  it('should reject strings with uppercase character at the beginning', () => {
    expect(isFair('Password1')).toBe(false);
  });
});

describe('isStrong', () => {
  it('should classify 12-character password with lowercase, uppercase, number and special symbol, each of consecutive length of at most 5 and uppercase among lowercase as strong', () => {
    expect(isStrong('passWord123!')).toBe(true);
  });
  it('should reject strings shorter than 11 characters', () => {
    expect(isStrong('passWord1!')).toBe(false);
  });
  it('should reject strings with uppercase character at the beginning', () => {
    expect(isStrong('Pass123aaa12!')).toBe(false);
  });
  it('should reject strings with consecutive group of characters of the same category longer than 5', () => {
    expect(isStrong('pAssword12!')).toBe(false);
  });
});

describe('containsCategory', () => {
  it.each([
    ['lowercase', 'HElLO'],
    ['uppercase', 'hellO'],
    ['number', 'h3llo'],
    ['special symbol', 'hello!'],
  ] satisfies [SymbolCategory, string][])(
    'should detect %s character',
    (category, text) => {
      expect(containsCategory(category, text)).toBe(true);
    }
  );

  it.each([
    ['lowercase', '1234'],
    ['uppercase', 'hello'],
    ['number', 'Hello'],
    ['special symbol', 'Hell0'],
  ] satisfies [SymbolCategory, string][])(
    'should report missing %s character',
    (category, text) => {
      expect(containsCategory(category, text)).toBe(false);
    }
  );
});

describe('containsCharacterCategories', () => {
  it('should accept empty array', () => {
    expect(containsCharacterCategories([], 'hello')).toBe(true);
  });

  it('should detect character in a single category', () => {
    expect(containsCharacterCategories(['lowercase'], 'hello')).toBe(true);
  });

  it('should detect characters in multiple categories', () => {
    expect(
      containsCharacterCategories(['lowercase', 'number'], 'hello123')
    ).toBe(true);
  });
  it('should report missing character in one of defined categories', () => {
    expect(
      containsCharacterCategories(
        ['lowercase', 'number', 'special symbol'],
        'hello123'
      )
    ).toBe(false);
  });
});

describe('containsUpperAmongLowercase', () => {
  it('should detect uppercase character among lowercase characters', () => {
    expect(containsUpperAmongLowercase('heLLo')).toBe(true);
  });
  it('should reject uppercase character at the beginning', () => {
    expect(containsUpperAmongLowercase('Hello')).toBe(false);
  });
  it('should reject text without uppercase characters', () => {
    expect(containsUpperAmongLowercase('hello')).toBe(false);
  });
  it('should reject text with only uppercase characters', () => {
    expect(containsUpperAmongLowercase('HELLO')).toBe(false);
  });
});

describe('containsAcceptableSequences', () => {
  it('should accept text with consecutive sequences of one category <= 5', () => {
    expect(containsAcceptableSequences('12345ABCDEabcde*-*-*')).toBe(true);
  });
  it.each([
    ['lowercase', 'Password'],
    ['uppercase', 'bestFOREVER'],
    ['number', '1211987'],
    ['special symbol', '******!'],
  ] satisfies [SymbolCategory, string][])(
    'should reject text with consecutive sequences of %s > 6 (bug included)',
    (_, text) => {
      expect(containsAcceptableSequences(text)).toBe(false);
    }
  );
});

describe('containsForbiddenCharacters', () => {
  it('should detect forbidden character $ in password', () => {
    expect(containsForbiddenCharacters('Password1$')).toBe(true);
  });

  it('should return false for password with only allowed characters', () => {
    expect(containsForbiddenCharacters('0PassWord!')).toBe(false);
  });
});

describe('Bugs', () => {
  it('1 Does not count + and - as special characters', () => {
    expect(containsCategory('special symbol', '+')).toBe(false);
    expect(containsCategory('special symbol', '-')).toBe(false);
    expect(containsForbiddenCharacters('+-')).toBe(false);
  });

  it('2 Does not count 0 as number, counts it as lowercase instead', () => {
    expect(containsCategory('number', '0')).toBe(false);
    expect(containsCategory('lowercase', '0')).toBe(true);
    expect(containsForbiddenCharacters('0')).toBe(false);
  });

  it('4 Counts 5-character password (meeting other cocditions) as weak instead of unacceptable', () => {
    expect(isWeak('He11o')).toBe(true);
  });

  it('5 Counts 11-character password (meeting other conditions) as fair instead of strong', () => {
    expect(isFair('Cz3ch1Tas!')).toBe(true);
    expect(isStrong('Cz3ch1Tas!')).toBe(false);
  });

  it('6 Counts diacritic as acceptable characters', () => {
    expect(containsForbiddenCharacters('ěščřžýáíéúů!')).toBe(false);
  });

  it('7 Counts one uppercase at the end as among lowercase', () => {
    expect(containsUpperAmongLowercase('hellO')).toBe(true);
  });

  it('8 Strong password allows sequence of 6 characters of the same category', () => {
    expect(isStrong('HeLLos!123456')).toBe(true);
  });

  it('9 Weak password does not enforce at least one lowercase, uppercase and number', () => {
    expect(isWeak('PASSWORD')).toBe(true);
    expect(isWeak('password')).toBe(true);
    expect(isWeak('123456')).toBe(true);
    expect(isWeak('HELLO123')).toBe(true);
    expect(isWeak('hello123')).toBe(true);
    expect(isWeak('Password')).toBe(true);
  });
});
