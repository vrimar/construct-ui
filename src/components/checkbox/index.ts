import m from 'mithril';
import { Classes } from '../../_shared';
import { BaseControl, IControlAttrs } from '../base-control';

export interface ICheckboxAttrs extends IControlAttrs {
  /** Initially sets control to indeterminate state (uncontrolled mode)  */
  defaultIndeterminate?: boolean;

  /** Toggles indeterminate state */
  indeterminate?: boolean;
}

export class Checkbox implements m.Component<ICheckboxAttrs> {
  private input: HTMLInputElement;

  public oncreate({ attrs, dom }: m.VnodeDOM<ICheckboxAttrs>) {
    this.input = dom.querySelector('input') as HTMLInputElement;

    if (attrs.defaultIndeterminate != null) {
      this.input.indeterminate = attrs.defaultIndeterminate;
    }
    this.updateIndeterminate(attrs);
  }

  public onupdate({ attrs, dom }: m.VnodeDOM<ICheckboxAttrs>) {
    this.input = dom.querySelector('input') as HTMLInputElement;
    this.updateIndeterminate(attrs);
  }

  public view({ attrs }: m.Vnode<ICheckboxAttrs>) {
    return m(BaseControl, {
      ...attrs as IControlAttrs,
      type: 'checkbox',
      typeClass: Classes.CHECKBOX
    });
  }

  private updateIndeterminate(attrs: ICheckboxAttrs) {
    if (attrs.indeterminate != null) {
      this.input.indeterminate = attrs.indeterminate;
    }
  }
}
