export const Align = {
  LEFT: 'left' as 'left',
  CENTER: 'center' as 'center',
  RIGHT: 'right' as 'right'
};

export type Align = typeof Align[keyof typeof Align];
