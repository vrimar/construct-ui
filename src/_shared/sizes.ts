export const Size = {
  XS: 'xs' as 'xs',
  SM: 'sm' as 'sm',
  DEFAULT: 'default' as 'default',
  LG: 'lg' as 'lg',
  XL: 'xl' as 'xl'
};

export type Size = typeof Size[keyof typeof Size];
