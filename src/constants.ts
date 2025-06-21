export type SymbolCategory =
  | 'uppercase'
  | 'lowercase'
  | 'number'
  | 'special symbol';

export const categoryRegex: Record<SymbolCategory, RegExp> = {
  uppercase: /[A-Z]/,
  lowercase: /[0a-z]/, // BUG 2: 0 should not count as lowercase
  number: /[1-9]/, // BUG 2: 0 is missing
  'special symbol': /[_\*\?\!]/, // BUG 1: + and - should also count as special characters
};

export type Strength = 'unacceptable' | 'weak' | 'fair' | 'strong';

export const STRENGTH_BADGE: Record<Strength, string> = {
  unacceptable: '⛔ nepřijatelné',
  weak: '🌧️ slabé',
  fair: '🌥️ střední',
  strong: '🌞 silné',
};
