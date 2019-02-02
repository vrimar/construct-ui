import m from 'mithril';
import classnames from 'classnames';
import { IAttrs, ISizeAttrs, IIntentAttrs, Classes } from '../../_shared';
import { Icon, IconName, Icons } from '../icon';

export interface ICalloutAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Inner text content */
  content?: m.Children;

  /**
   * Callback invoked when "dismiss" icon is clicked;
   * Omitting this property will hide the dismiss icon.
   */
  onDismiss?: (e: Event) => void;

  /** Header content */
  header?: m.Children;

  /** Left-justified icon  */
  icon?: IconName;

  [htmlAttrs: string]: any;
}

export class Callout implements m.Component<ICalloutAttrs> {
  public view({ attrs }: m.Vnode<ICalloutAttrs>) {
    const { content, header, icon, intent, onDismiss, size, ...htmlAttrs } = attrs;

    const innerContent = [
      onDismiss && m(Icon, {
        class: Classes.CALLOUT_DISMISS_ICON,
        name: Icons.X,
        onclick: onDismiss
      }),
      icon && m(Icon, { name: icon }),
      header && m(`.${Classes.CALLOUT_HEADER}`, header),
      content && m(`.${Classes.CALLOUT_CONTENT}`, content)
    ];

    const classes = classnames(
      Classes.CALLOUT,
      icon && Classes.CALLOUT_ICON,
      intent && `cui-${attrs.intent}`,
      size && `cui-${attrs.size}`,
      attrs.class
    );

    return m('', { ...htmlAttrs, class: classes }, innerContent);
  }
}
