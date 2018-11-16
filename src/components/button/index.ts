import classnames from 'classnames';
import m from 'mithril';
import { Icon } from '../icon';
import { Spinner } from '../spinner';
import { Classes, IActionItemAttrs, IAttrs, ISizeAttrs, IIntentAttrs, Align } from '../../_shared';

export interface IButtonAttrs extends IAttrs, IActionItemAttrs, ISizeAttrs, IIntentAttrs {
  /** Content alignment; Used to align left/right icon when fluid=true  */
  align?: Align;

  /** Toggles basic styling (no borders/background) */
  basic?: boolean;

  /** Reduces horizontal padding */
  compact?: boolean;

  /** Sets anchor tag URL (anchor button only) */
  href?: string;

  /** Toggles loading animation */
  loading?: boolean;

  /** Toggles rounded styling */
  rounded?: boolean;

  /** Fills width of parent container */
  fluid?: boolean;

  /** Sublabel */
  sublabel?: m.Child;

  [htmlAttrs: string]: any;
}

export class Button implements m.Component<IButtonAttrs> {
  public view({ attrs }: m.Vnode<IButtonAttrs>) {
    const {
      align = 'center',
      active,
      basic,
      compact,
      class: className,
      disabled,
      fluid,
      href,
      iconLeft,
      iconRight,
      intent,
      loading,
      label,
      onclick,
      rounded,
      size,
      sublabel,
      ...htmlAttrs
    } = attrs;

    const tag = href ? 'a' : 'button';
    const isAnchor = tag === 'a';

    const classes = classnames(
      Classes.BUTTON,
      align && `${Classes.ALIGN}-${align}`,
      active && Classes.ACTIVE,
      compact && Classes.COMPACT,
      disabled && Classes.DISABLED,
      fluid && Classes.FLUID,
      loading && Classes.LOADING,
      size && `cui-${size}`,
      intent && `cui-${intent}`,
      rounded && Classes.ROUNDED,
      basic && Classes.BASIC,
      !label && !sublabel && (!iconLeft || !iconRight) && Classes.BUTTON_ICON,
      className
    );

    const content = [
      loading && m(Spinner, { active: true, fill: true }),
      iconLeft && m(Icon, { name: iconLeft }),
      sublabel && m('span', { class: Classes.BUTTON_SUBLABEL }, sublabel),
      label && m('span', { class: Classes.BUTTON_LABEL }, label),
      iconRight && m(Icon, { name: iconRight })
    ];

    return m(tag, {
      type: isAnchor ? undefined : 'button',
      role: isAnchor ? 'button' : undefined,
      ...htmlAttrs,
      class: classes,
      disabled,
      // Undefined attrs are not removed on redraw. See https://github.com/MithrilJS/mithril.js/pull/1865#issuecomment-382990558'
      href: disabled ? undefined : href,
      onclick: disabled ? undefined : onclick,
      tabIndex: disabled ? undefined : htmlAttrs.tabIndex
    }, content);
  }
}
