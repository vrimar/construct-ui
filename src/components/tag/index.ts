import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs, IIntentAttrs } from '../../_shared';
import { Icon, Icons } from '../icon';

export interface ITagAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Text label */
  label?: m.Children;

  /**
   * Callback invoked when "remove" icon is clicked;
   * Omitting this property will hide the remove icon.
   */
  onRemove?: (e: Event) => void;

  /** Toggles rounded styling */
  rounded?: boolean;

  [htmlAttrs: string]: any;
}

export class Tag implements m.Component<ITagAttrs> {
  public view({ attrs }: m.Vnode<ITagAttrs>) {
    const {
      class: className,
      label,
      intent,
      size,
      rounded,
      onRemove,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.TAG,
      intent && `cui-${intent}`,
      rounded && Classes.ROUNDED,
      onRemove && Classes.TAG_REMOVABLE,
      size && `cui-${size}`,
      className
    );

    const content = [
      label,
      onRemove && m(Icon, {
        name: Icons.X,
        onclick: onRemove
      })
    ];

    return m('span', { ...htmlAttrs, class: classes }, content);
  }
}
