export const Keys = {
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  ESCAPE: 27,
  SPACE: 32,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40
};

export type Keys = typeof Keys[keyof typeof Keys];
