export const Intent = {
  NONE: 'none' as 'none',
  PRIMARY: 'primary' as 'primary',
  NEGATIVE: 'negative' as 'negative',
  POSITIVE: 'positive' as 'positive',
  WARNING: 'warning' as 'warning'
};

export type Intent = typeof Intent[keyof typeof Intent];
