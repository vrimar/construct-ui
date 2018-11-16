import m from 'mithril';
import { Checkbox, Switch } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/checkbox/examples/controlled.ts';

export class CheckboxControlledExample {
  private checked = false;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Checkbox, {
        checked: this.checked,
        label: 'Controlled Checkbox',
        onchange: () => null
      })
    ]);
  }

  private renderOptions() {
    return [
      m(Switch, {
        checked: this.checked,
        label: 'Checked',
        onchange: () => this.checked = !this.checked
      })
    ];
  }
}
