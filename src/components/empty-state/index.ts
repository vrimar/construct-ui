import classnames from 'classnames';
import m from 'mithril';
import { Classes, IAttrs } from '../../_shared';
import { Icon, IconName } from '../icon';

export interface IEmptyStateAttrs extends IAttrs {
  /** Icon name */
  icon?: IconName | undefined;

  /** Header content */
  header?: m.Children;

  /** Main content */
  content?: m.Children;

  /**
   * Fills the height/width of parent container
   * @default true
   */
  fill?: boolean;

  [htmlAttrs: string]: any;
}

export class EmptyState implements m.Component<IEmptyStateAttrs> {
  public view({ attrs }: m.Vnode<IEmptyStateAttrs>) {
    const { class: className, fill = true, icon, header, content, ...htmlAttrs } = attrs;

    const classes = classnames(
      Classes.EMPTY_STATE,
      fill && Classes.EMPTY_STATE_FILL,
      className
    );

    const container = [
      icon && m(`.${Classes.EMPTY_STATE_ICON}`, m(Icon, { name: icon })),
      header && m(`.${Classes.EMPTY_STATE_HEADER}`, header),
      content && m(`.${Classes.EMPTY_STATE_CONTENT}`, content)
    ];

    return m('', { ...htmlAttrs, class: classes }, container);
  }
}
