import m from 'mithril';
import { Switch, Icon, Intent, Icons, IconName, SelectList, ListItem, Button } from '@/';
import { Example, IntentSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/icon/examples/index.ts';
const iconNames = Object.keys(Icons).slice(1);

export class IconExample {
  private intent: Intent;
  private interactive = false;
  private iconName: IconName = Icons.SETTINGS;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Icon, {
        intent: this.intent,
        name: this.iconName,
        onclick: this.interactive ? () => null : undefined,
        size: 'xl'
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Intent'),
      m(IntentSelect, { onSelect: (intent: Intent) => this.intent = intent }),
      m('h5', 'Icon name'),
      m(SelectList, {
        closeOnSelect: false,
        items: iconNames,
        itemRender: (iconName: IconName) => m(ListItem, {
          contentLeft: m(Icon, { name: Icons[iconName] }),
          label: iconName,
          selected: this.iconName === Icons[iconName]
        }),
        itemPredicate: (query: string, item: string) => {
          return item.toLowerCase().includes(query.toLowerCase());
        },
        trigger: m(Button, {
          align: 'left',
          compact: true,
          iconRight: Icons.CHEVRON_DOWN,
          label: this.iconName,
          size: 'xs',
          style: 'margin-bottom: 10px',
          fluid: true
        }),
        onSelect: (iconName: IconName) => this.iconName = Icons[iconName]
      }),

      m(Switch, {
        checked: this.interactive,
        label: 'Interactive',
        onchange: () => this.interactive = !this.interactive
      })
    ];
  }
}
