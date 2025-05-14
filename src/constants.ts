export type SymbolCategory =
  | 'uppercase'
  | 'lowercase'
  | 'number'
  | 'special symbol';

export const categoryRegex: Record<SymbolCategory, RegExp> = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  'special symbol': /[_\+\*\?\!-]/,
};

export type Strength = 'unacceptable' | 'weak' | 'fair' | 'strong';

export const STRENGTH_BADGE: Record<Strength, string> = {
  unacceptable: '⛔ nepřijatelné',
  weak: '🌧️ slabé',
  fair: '🌥️ střední',
  strong: '🌞 silné',
};
