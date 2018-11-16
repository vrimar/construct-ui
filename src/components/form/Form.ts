import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs } from '../../_shared';
import { Grid, IGridAttrs } from '../grid';

export interface IFormAttrs extends IAttrs, IGridAttrs {
  [htmlAttrs: string]: any;
}

export class Form implements m.Component<IFormAttrs> {
  public view({ attrs, children }: m.Vnode<IFormAttrs>) {
    const classes = classnames(
      Classes.FORM,
      attrs.class
    );

    return m(Grid, {
      ...attrs,
      element: 'form',
      class: classes
    }, children);
  }
}
