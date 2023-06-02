export const Align = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right'
} as const;

export type Align = typeof Align[keyof typeof Align];
