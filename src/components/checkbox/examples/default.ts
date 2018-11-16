import m from 'mithril';
import { Checkbox, Switch, Size, Intent } from '@/';
import { IntentSelect, Example, SizeSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/checkbox/examples/default.ts';

export class CheckboxExample {
  private disabled = false;
  private intent: Intent;
  private label = true;
  private readonly = false;
  private size: Size;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Checkbox, {
        defaultChecked: true,
        disabled: this.disabled,
        label: this.label && 'Checkbox label',
        intent: this.intent,
        readonly: this.readonly,
        size: this.size
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m('h5', 'Intent'),
      m(IntentSelect, { onSelect: (intent: Intent) => this.intent = intent }),
      m(Switch, {
        checked: this.disabled,
        label: 'Disabled',
        onchange: () => this.disabled = !this.disabled
      }),

      m(Switch, {
        checked: this.label,
        label: 'Label',
        onchange: () => this.label = !this.label
      }),

      m(Switch, {
        checked: this.readonly,
        label: 'Readonly',
        onchange: () => this.readonly = !this.readonly
      })
    ];
  }
}
