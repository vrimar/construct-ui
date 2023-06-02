export const PopoverInteraction = {
  CLICK: 'click',
  CLICK_TRIGGER: 'click-trigger',
  HOVER: 'hover',
  HOVER_TRIGGER: 'hover-trigger'
} as const;

export type PopoverInteraction = typeof PopoverInteraction[keyof typeof PopoverInteraction];

export const PopoverPosition = {
  AUTO: 'auto',
  AUTO_START: 'auto-start',
  AUTO_END: 'auto-end',
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end'
} as const;

export type PopoverPosition = typeof PopoverPosition[keyof typeof PopoverPosition];
