export const PopoverInteraction = {
  CLICK: 'click' as 'click',
  CLICK_TRIGGER: 'click-trigger' as 'click-trigger',
  HOVER: 'hover' as 'hover',
  HOVER_TRIGGER: 'hover-trigger' as 'hover-trigger'
};

export type PopoverInteraction = typeof PopoverInteraction[keyof typeof PopoverInteraction];

export const PopoverPosition = {
  AUTO: 'auto' as 'auto',
  AUTO_START: 'auto-start' as 'auto-start',
  AUTO_END: 'auto-end' as 'auto-end',
  TOP: 'top' as 'top',
  TOP_START: 'top-start' as 'top-start',
  TOP_END: 'top-end' as 'top-end',
  RIGHT: 'right' as 'right',
  RIGHT_START: 'right-start' as 'right-start',
  RIGHT_END: 'right-end' as 'right-end',
  BOTTOM: 'bottom' as 'bottom',
  BOTTOM_START: 'bottom-start' as 'bottom-start',
  BOTTOM_END: 'bottom-end' as 'bottom-end',
  LEFT: 'left' as 'left',
  LEFT_START: 'left-start' as 'left-start',
  LEFT_END: 'left-end' as 'left-end'
};

export type PopoverPosition = typeof PopoverPosition[keyof typeof PopoverPosition];
