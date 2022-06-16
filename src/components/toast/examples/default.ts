import m from 'mithril';
import { Button, Icons, Select, Switch, Toaster, ToasterPosition, Intent, Size } from '@/';
import { IntentSelect, Example, SizeSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/toast/examples/default.ts';
const AppToaster = new Toaster();

export class ToastDefaultExample {
  private clearOnEscapeKey = true;
  private icon = true;
  private inline = false;
  private intent: Intent;
  private position: ToasterPosition = 'top';
  private size: Size;
  private timeout: number = 3000;

  public view() {
    return m(Example, { options: this.renderOptions(), direction: 'column', src: EXAMPLE_SRC }, [
      m(Button, {
        label: 'Show Toast',
        onclick: this.show,
        intent: 'primary',
        style: 'margin-bottom: 10px'
      }),

      m(Button, {
        label: 'Update first',
        onclick: this.updateFirst,
        disabled: AppToaster.getToasts().length === 0,
        style: 'margin-bottom: 10px'
      }),

      m(Button, {
        label: 'Remove first',
        onclick: this.dismissFirst,
        disabled: AppToaster.getToasts().length === 0
      }),

      m(AppToaster, {
        clearOnEscapeKey: this.clearOnEscapeKey,
        inline: this.inline,
        position: this.position
      })
    ]);
  }

  private show = () => {
    AppToaster.show({
      message: `Timestamp: ${Date.now()}`,
      icon: this.icon ? Icons.ALERT_TRIANGLE : undefined,
      intent: this.intent,
      size: this.size,
      timeout: this.timeout
    });
  };

  private updateFirst = () => {
    const toast = AppToaster.getToasts()[0];
    AppToaster.update(toast.key!, {
      message: 'UPDATED MESSAGE',
      intent: 'primary'
    });
  };

  private dismissFirst = () => {
    const toast = AppToaster.getToasts()[0];
    AppToaster.dismiss(toast.key!, false);
  };

  private renderOptions() {
    return [
      m('h5', 'Position'),
      m(Select, {
        options: Object.keys(ToasterPosition).map(key => ToasterPosition[key]),
        onchange: (e: Event) => this.position = (e.target as HTMLInputElement).value as ToasterPosition,
        size: 'xs'
      }),
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m('h5', 'Intent'),
      m(IntentSelect, { onSelect: (intent: Intent) => this.intent = intent }),
      m(Switch, {
        checked: this.clearOnEscapeKey,
        label: 'Clear on ESC key',
        onchange: () => this.clearOnEscapeKey = !this.clearOnEscapeKey
      }),
      m(Switch, {
        checked: this.inline,
        label: 'Inline',
        onchange: () => this.inline = !this.inline
      }),
      m(Switch, {
        checked: this.icon,
        label: 'Icon',
        onchange: () => this.icon = !this.icon
      }),

      m(Switch, {
        checked: this.timeout === 0,
        label: 'Timeout = 0',
        onchange: () => this.timeout = this.timeout === 0 ? 3000 : 0
      })
    ];
  }
}
