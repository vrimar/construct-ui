import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs } from '../../_shared';

export interface IMenuAttrs extends IAttrs, ISizeAttrs {
  /** Toggles basic styling (no border)  */
  basic?: boolean;

  [htmlAttrs: string]: any;
}

export class Menu implements m.Component<IMenuAttrs> {
  public view({ attrs, children }: m.Vnode<IMenuAttrs>) {
    const { basic, class: className, size, ...htmlAttrs } = attrs;

    const classes = classnames(
      Classes.MENU,
      basic && Classes.BASIC,
      size && `cui-${size}`,
      className
    );

    return m('', { ...htmlAttrs, class: classes }, children);
  }
}
