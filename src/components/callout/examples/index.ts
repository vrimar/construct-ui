import m from 'mithril';
import { Callout, Switch, Icons, Size, Intent } from '@/';
import { SizeSelect, IntentSelect, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/callout/examples/index.ts';

const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rhoncus tempor neque, sed malesuada eros dapibus vel. Aliquam in ligula vitae tortor porttitor laoreet iaculis finibus est.';

export class CalloutExample {
  private size: Size;
  private intent: Intent;
  private showIcon = true;
  private showHeader = true;
  private showContent = true;
  private dismissable = true;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Callout, {
        header: this.showHeader && 'Callout header',
        content: this.showContent && content,
        icon: this.showIcon ? Icons.ALERT_CIRCLE : undefined,
        size: this.size,
        intent: this.intent,
        onDismiss: this.dismissable ? () => null : undefined
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
        checked: this.showIcon,
        label: 'Show icon',
        onchange: () => this.showIcon = !this.showIcon
      }),
      m(Switch, {
        checked: this.showHeader,
        label: 'Show header',
        onchange: () => this.showHeader = !this.showHeader
      }),
      m(Switch, {
        checked: this.showContent,
        label: 'Show content',
        onchange: () => this.showContent = !this.showContent
      }),
      m(Switch, {
        checked: this.dismissable,
        label: 'Dismissable',
        onchange: () => this.dismissable = !this.dismissable
      })
    ];
  }
}
