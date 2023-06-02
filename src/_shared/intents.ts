export const Intent = {
  NONE: 'none',
  PRIMARY: 'primary',
  NEGATIVE: 'negative',
  POSITIVE: 'positive',
  WARNING: 'warning'
} as const;

export type Intent = typeof Intent[keyof typeof Intent];
