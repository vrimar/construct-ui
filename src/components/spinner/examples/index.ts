import m from 'mithril';
import { Intent, Size, Spinner, Switch } from '@/';
import { IntentSelect, SizeSelect, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/spinner/examples/index.ts';

export class SpinnerExample {
  private size: Size;
  private intent: Intent;
  private active: boolean = true;
  private fill: boolean;
  private background: boolean;
  private hasMessage: boolean = false;

  public view() {
    return m(Example, { options: this.renderOptions(), center: false, src: EXAMPLE_SRC }, [
      m(Spinner, {
        active: this.active,
        background: this.background,
        fill: this.fill,
        intent: this.intent,
        size: this.size,
        message: this.hasMessage ? 'Uploading files...' : undefined
      })
    ]);
  }

  public renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m('h5', 'Intent'),
      m(IntentSelect, { onSelect: (intent: Intent) => this.intent = intent }),
      m(Switch, {
        checked: this.active,
        label: 'Active',
        onchange: () => this.active = !this.active
      }),

      m(Switch, {
        checked: this.fill,
        label: 'Fill container',
        onchange: () => this.fill = !this.fill
      }),

      m(Switch, {
        checked: this.background,
        label: 'Has background',
        onchange: () => this.background = !this.background
      }),

      m(Switch, {
        checked: this.hasMessage,
        label: 'Message',
        onchange: () => this.hasMessage = !this.hasMessage
      })
    ];
  }
}
