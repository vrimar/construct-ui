export const Size = {
  XS: 'xs',
  SM: 'sm',
  DEFAULT: 'default',
  LG: 'lg',
  XL: 'xl'
} as const;

export type Size = typeof Size[keyof typeof Size];
