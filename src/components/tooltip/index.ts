import classnames from 'classnames';
import m from 'mithril';
import { Classes, IAttrs, ISizeAttrs } from '../..';
import { Popover, IPopoverAttrs, PopoverPosition } from '../popover';

export interface ITooltipAttrs extends IAttrs, ISizeAttrs {
  /** Inner content */
  content?: m.Children;

  /** Content to trigger tooltip */
  trigger?: m.Child;

  /**
   * Position of content relative to trigger
   * @default 'auto'
   */
  position?: PopoverPosition;

  /**
   * Displays an arrow pointing to trigger
   * @default true
   */
  hasArrow?: boolean;

  /** Duration of close delay on hover interaction */
  hoverCloseDelay?: number;

  /** Duration of open delay on hover interaction */
  hoverOpenDelay?: number;

  /**
   * Transition duration
   * @default 300
   */
  transitionDuration?: number;
}

export class Tooltip implements m.Component<ITooltipAttrs> {
  public view({ attrs }: m.Vnode<ITooltipAttrs>) {
    const { size, class: className, ...otherAttrs } = attrs;

    const classes = classnames(
      Classes.TOOLTIP,
      size && `cui-${size}`,
      className
    );

    return m(Popover, {
      addToStack: false,
      ...otherAttrs as IPopoverAttrs,
      class: classes,
      interactionType: 'hover-trigger'
    });
  }
}
