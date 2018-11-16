import m from 'mithril';
import { Switch, Size, Intent } from '@/';
import { IntentSelect, Example, SizeSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/switch/examples/index.ts';

export class SwitchExample {
  private disabled: boolean = false;
  private intent: Intent;
  private label: boolean = true;
  private readonly: boolean = false;
  private size: Size;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Switch, {
        disabled: this.disabled,
        label: this.label && 'Switch label',
        intent: this.intent,
        readonly: this.readonly,
        size: this.size
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Sizes'),
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
