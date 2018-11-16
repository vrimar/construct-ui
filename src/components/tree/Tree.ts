import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs } from '../../_shared';

export interface ITreeAttrs extends IAttrs {
  /** An array of child nodes */
  nodes?: Array<m.Vnode<ITreeAttrs>>;
}

export class Tree implements m.Component<ITreeAttrs> {
  public view({ attrs }: m.Vnode<ITreeAttrs>) {
    const { nodes, class: className, ...htmlAttrs } = attrs;
    const treeClasses = classnames(Classes.TREE, className);

    return m('ul', {
      ...htmlAttrs,
      class: treeClasses
    }, nodes);
  }
}
