import m from 'mithril';
import { Icons, Menu, MenuDivider, MenuItem, Switch, Size } from '@/';
import { Example, SizeSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/menu/examples/default.ts';

export class MenuExample {
  private basic: boolean = false;
  private size: Size;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Menu, { size: this.size, basic: this.basic }, [
        m(MenuItem, {
          iconLeft: Icons.COPY,
          label: 'Copy'
        }),

        m(MenuItem, {
          iconLeft: Icons.EDIT_2,
          label: 'Edit'
        }),

        m(MenuItem, {
          iconLeft: Icons.SETTINGS,
          label: 'Settings'
        }),

        m(MenuDivider),

        m(MenuItem, {
          iconLeft: Icons.TRASH_2,
          label: 'Delete',
          intent: 'negative'
        })
      ])
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m(Switch, {
        checked: this.basic,
        label: 'Basic',
        onchange: () => this.basic = !this.basic
      })
    ];
  }
}
