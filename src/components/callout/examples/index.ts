import m from 'mithril';
import { Callout, Switch, Icons, Size, Intent } from '@/';
import { SizeSelect, IntentSelect, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/callout/examples/index.ts';

export class CalloutExample {
  private size: Size;
  private intent: Intent;
  private showIcon = false;
  private showHeader = true;
  private showContent = true;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Callout, {
        header: this.showHeader && 'Callout header',
        content: this.showContent && 'Callout content',
        icon: this.showIcon ? Icons.ALERT_CIRCLE : undefined,
        size: this.size,
        intent: this.intent
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
      })
    ];
  }
}
