import m from 'mithril';
import { Classes } from '../../_shared';
import { BaseControl, IControlAttrs } from '../base-control';

export class Radio implements m.Component<IControlAttrs> {
  public view({ attrs }: m.Vnode<IControlAttrs>) {
    return m(BaseControl, {
      ...attrs,
      type: 'radio',
      typeClass: Classes.RADIO
    });
  }
}
