import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs } from '../../_shared';

export interface IListAttrs extends IAttrs, ISizeAttrs {
  /** Wether to show background on item hover */
  interactive?: boolean;

  [htmlAttrs: string]: any;
}

export class List implements m.Component<IListAttrs> {
  public view({ attrs, children }: m.Vnode<IListAttrs>) {
    const { class: className, size, interactive = true, ...htmlAttrs } = attrs;

    return m('', {
      ...htmlAttrs,
      class: classnames(
        Classes.LIST,
        interactive && Classes.INTERACTIVE,
        size && `cui-${size}`,
        className
      )
    }, children);
  }
}
