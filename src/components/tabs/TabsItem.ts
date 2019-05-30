import m from 'mithril';
import classnames from 'classnames';
import { IAttrs, Classes } from '../../_shared';
import { Spinner } from '../spinner';

export interface ITabItemAttrs extends IAttrs {
  /** Toggles active state */
  active?: boolean;

  /** Inner text or children */
  label: m.Children;

  /** Toggles loading animation */
  loading?: boolean;

  [htmlAttrs: string]: any;
}

export class TabItem implements m.ClassComponent<ITabItemAttrs> {
  public view({ attrs }: m.Vnode<ITabItemAttrs>) {
    const {
      active,
      label,
      loading,
      size,
      class: className,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.TABS_ITEM,
      active && Classes.ACTIVE,
      loading && Classes.LOADING,
      size && `cui-${size}`,
      className
    );

    const content = [
      loading && m(Spinner, { active: true, fill: true }),
      label
    ];

    return m('', {
      class: classes,
      ...htmlAttrs
    }, content);
  }
}
