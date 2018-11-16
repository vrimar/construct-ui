import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs } from '../../_shared';

export interface IControlGroupAttrs extends IAttrs {
  [htmlAttrs: string]: any;
}

export class ControlGroup implements m.Component<IControlGroupAttrs> {
  public view({ attrs, children }: m.Vnode<IControlGroupAttrs>) {
    const { class: className, ...htmlAttrs } = attrs;

    return m('', {
      ...htmlAttrs,
      class: classnames(
        Classes.CONTROL_GROUP,
        className
      )
    }, children);
  }
}
