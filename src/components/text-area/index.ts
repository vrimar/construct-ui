import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs, IIntentAttrs } from '../../_shared';

export interface ITextAreaAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Toggles basic styling (only bottom border) */
  basic?: boolean;

  /** Initial value to display (uncontrolled mode) */
  defaultValue?: string;

  /** Disables input */
  disabled?: boolean;

  /** Fills width of parent container */
  fluid?: boolean;

  /** Callback invoked on value change */
  onchange?: (e: Event) => void;

  /** Input value */
  value?: string | number;

  [htmlAttrs: string]: any;
}

export class TextArea implements m.Component<ITextAreaAttrs> {
  public view({ attrs }: m.Vnode<ITextAreaAttrs>) {
    const {
      basic,
      class: className,
      disabled,
      fluid,
      intent,
      size,
      style,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.INPUT,
      Classes.TEXT_AREA,
      basic && Classes.BASIC,
      disabled && Classes.DISABLED,
      fluid && Classes.FLUID,
      intent && `cui-${intent}`,
      size && `cui-${size}`,
      className
    );

    return m('', { class: classes, style }, m('textarea', { ...htmlAttrs }));
  }
}
