import { categoryRegex, Strength, SymbolCategory } from './constants';

/**
 *
 * @param text given text
 * @returns strength of given password
 */
export function calculateStrength(text: string): Strength {
  if (containsForbiddenCharacters(text)) {
    return 'unacceptable';
  }

  if (isStrong(text)) {
    return 'strong';
  }

  if (isFair(text)) {
    return 'fair';
  }

  if (isWeak(text)) {
    return 'weak';
  }

  return 'unacceptable';
}

/**
 *
 * @param text given text
 * @returns whether text contains only allowed characters
 */
export function containsForbiddenCharacters(text: string) {
  return !/^[a-zA-Z0-9_\+\*\?\!-]+$/.test(text);
}

/**
 *
 * @param text given text
 * @returns whether a given password is strong (11+ chars, at least one lowercase, uppercase, number, special symbol)
 * Additional rules: at least one uppercase among lowercase, length of consecutive sequence of symbols of the same category is 5 at most
 */
export function isStrong(text: string) {
  return (
    text.length >= 11 &&
    containsCharacterCategories(
      ['uppercase', 'lowercase', 'number', 'special symbol'],
      text
    ) &&
    containsUpperAmongLowercase(text) &&
    containsAcceptableSequences(text)
  );
}

/**
 *
 * @param text given text
 * @returns whether a given password is fair (9-10 chars, at least one lowercase, uppercase, number)
 * Additional rules: at least one uppercase among lowercase
 */
export function isFair(text: string) {
  return (
    text.length >= 9 &&
    text.length <= 10 &&
    containsCharacterCategories(['uppercase', 'lowercase', 'number'], text) &&
    containsUpperAmongLowercase(text)
  );
}

/**
 *
 * @param text given text
 * @returns whether a given password is weak (6-8 chars, at least one lowercase, uppercase, number)
 */
export function isWeak(text: string) {
  return (
    text.length >= 6 &&
    text.length <= 8 &&
    containsCharacterCategories(['uppercase', 'lowercase', 'number'], text)
  );
}

/**
 *
 * @param text given text
 * @returns whether given text contains at least one character of all given categories
 */
export function containsCharacterCategories(
  categories: SymbolCategory[],
  text: string
) {
  return categories
    .map((category) => containsCategory(category, text))
    .every((val) => val === true);
}

/**
 *
 * @param category symbol category
 * @param text given text
 * @returns whether given text contains a character of a given symbol category
 */
export function containsCategory(category: SymbolCategory, text: string) {
  return categoryRegex[category].test(text);
}

/**
 *
 * @param text given text
 * @returns whether given text contains at least one uppercase character that has both a prefix and suffix containing a lowercase character
 * Avoids creating capitalised words as a password, e.g. "Hello".
 */
export function containsUpperAmongLowercase(text: string) {
  return /[a-z].*[A-Z]+.*[a-z]/.test(text);
}

/**
 *
 * @param text given text
 * @returns whether given text only contains symbol sequences of length of at most 5
 * Strong passwords should combine all symbol categories. Avoids unbalanced passwords, such as "1Password!"
 */
export function containsAcceptableSequences(text: string) {
  const regexps = [/[a-z]{6,}/, /[A-Z]{6,}/, /[0-9]{6,}/, /[_\+\*\?\!-]{6,}/];
  return regexps.every((regexp) => !regexp.test(text));
}
