import classnames from 'classnames';
import m from 'mithril';
import { Classes, IAttrs, ISizeAttrs, IIntentAttrs } from '../../_shared';

export interface IControlAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Toggles checked state */
  checked?: boolean;

  /**
   * Attrs passed through to container element
   */
  containerAttrs?: any;

  /** Initially sets control to checked state (uncontrolled mode) */
  defaultChecked?: boolean;

  /** Disables interaction */
  disabled?: boolean;

  /** Text label */
  label?: m.Children;

  /** Callback invoked on control change */
  onchange?: (e: Event) => void;

  /** Disables interaction but maintains styling */
  readonly?: boolean;

  type?: 'checkbox' | 'radio';

  typeClass?: string;

  [htmlAttrs: string]: any;
}

export class BaseControl implements m.Component<IControlAttrs> {
  public view({ attrs }: m.Vnode<IControlAttrs>) {
    const {
      class: className,
      containerAttrs = {},
      intent,
      label,
      size,
      type,
      typeClass,
      style,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.CONTROL,
      typeClass,
      htmlAttrs.disabled && Classes.DISABLED,
      intent && `cui-${intent}`,
      size && `cui-${size}`,
      className
    );

    const content = [
      m('input', {
        ...htmlAttrs,
        disabled: htmlAttrs.disabled || htmlAttrs.readonly,
        type
      }),
      m(`span.${Classes.CONTROL_INDICATOR}`),
      label
    ];

    return m('label', {
      class: classes,
      style,
      ...containerAttrs
    }, content);
  }
}
