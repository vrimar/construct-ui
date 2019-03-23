import m from 'mithril';
import { Switch, Tag, Size, Intent } from '@/';
import { IntentSelect, SizeSelect, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/tag/examples/index.ts';

export class TagExample {
  private size: Size;
  private intent: Intent;
  private removable = false;
  private rounded = false;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Tag, {
        label: 'Tag Label',
        intent: this.intent,
        rounded: this.rounded,
        size: this.size,
        onRemove: this.removable ? console.log : undefined
      })
    ]);
  }

  public renderOptions() {
    return [
      m('h5', 'Sizes'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m('h5', 'Intent'),
      m(IntentSelect, { onSelect: (intent: Intent) => this.intent = intent }),
      m(Switch, {
        checked: this.removable,
        label: 'Removable',
        onchange: () => this.removable = !this.removable
      }),
      m(Switch, {
        checked: this.rounded,
        label: 'Rounded',
        onchange: () => this.rounded = !this.rounded
      })
    ];
  }
}
