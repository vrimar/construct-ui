import m from 'mithril';
import { TextArea, Switch, Size, Intent } from '@/';
import { IntentSelect, SizeSelect, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/text-area/examples/index.ts';

export class TextAreaExample {
  private disabled: boolean = false;
  private fluid: boolean = false;
  private intent: Intent;
  private readonly: boolean = false;
  private size: Size;

  public view() {
    return m(Example, { options: this.renderOptions(), center: false, src: EXAMPLE_SRC }, [
      m(TextArea, {
        disabled: this.disabled,
        fluid: this.fluid,
        intent: this.intent,
        placeholder: 'Placeholder...',
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
        checked: this.readonly,
        label: 'Readonly',
        onchange: () => this.readonly = !this.readonly
      }),

      m(Switch, {
        checked: this.fluid,
        label: 'Fluid',
        onchange: () => this.fluid = !this.fluid
      })
    ];
  }
}
