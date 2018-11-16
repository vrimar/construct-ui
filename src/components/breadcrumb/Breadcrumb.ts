import classnames from 'classnames';
import m from 'mithril';
import { Classes, IAttrs, ISizeAttrs } from '../../_shared';

export interface IBreadcrumbAttrs extends IAttrs, ISizeAttrs {
  /** Element to display in between breadcrumb items */
  seperator?: m.Child;

  [htmlAttrs: string]: any;
}

export class Breadcrumb implements m.Component<IBreadcrumbAttrs> {
  public view({ attrs, children }: m.Vnode<IBreadcrumbAttrs>) {
    const { class: className, seperator = '/', size, ...htmlAttrs } = attrs;

    const classes = classnames(
      Classes.BREADCRUMB,
      size && `cui-${size}`,
      className
    );

    return m('', {
      ...htmlAttrs,
      class: classes
    }, this.renderChildren(children as m.ChildArray, attrs));
  }

  private renderChildren(children: m.ChildArray, { seperator }: IBreadcrumbAttrs) {
    return children
      .filter((item) => item != null)
      .map((item) => [
        item,
        m(`span.${Classes.BREADCRUMB_SEPERATOR}`, seperator)
      ]);
  }
}
