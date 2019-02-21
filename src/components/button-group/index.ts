import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs, IIntentAttrs } from '../../_shared';

export interface IButtonGroupAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Toggles basic styling on children (no borders/background) */
  basic?: boolean;

  /** Adds rounded styling (no borders/background) */
  rounded?: boolean;

  /** Toggles outline styling on children (no background) */
  outlined: boolean;

  /** Fills width of parent container */
  fluid?: boolean;

  [htmlAttrs: string]: any;
}

export class ButtonGroup implements m.Component<IButtonGroupAttrs> {
  public view({ attrs, children }: m.Vnode<IButtonGroupAttrs>) {
    const { class: className, size, fluid, intent, rounded, outlined, basic, ...htmlAttrs } = attrs;

    return m('', {
      ...htmlAttrs,
      class: classnames(
        Classes.BUTTON_GROUP,
        rounded && Classes.ROUNDED,
        fluid && Classes.FLUID,
        basic && Classes.BASIC,
        outlined && Classes.OUTLINED,
        intent && `cui-${intent}`,
        size && `cui-${size}`,
        className
      )
    }, children);
  }
}
