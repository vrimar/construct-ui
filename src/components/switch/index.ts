import m from 'mithril';
import { Classes } from '../../_shared';
import { BaseControl, IControlAttrs } from '../base-control';

export class Switch implements m.Component<IControlAttrs> {
  public view({ attrs }: m.Vnode<IControlAttrs>) {
    return m(BaseControl, {
      ...attrs,
      type: 'checkbox',
      typeClass: Classes.SWITCH
    });
  }
}
