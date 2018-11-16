import m from 'mithril';
import { Icons, MenuDivider, MenuItem, Size, PopoverMenu, Button, Switch } from '@/';
import { Example, SizeSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/popover-menu/examples/index.ts';

export class PopoverMenuExample {
  private size: Size;
  private closeOnClick: boolean = true;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(PopoverMenu, {
        closeOnContentClick: this.closeOnClick,
        content: [
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
        ],
        menuAttrs: { size: this.size },
        trigger: m(Button, { iconLeft: Icons.SETTINGS })
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m(Switch, {
        label: 'Close on select',
        onchange: () => this.closeOnClick = !this.closeOnClick,
        checked: this.closeOnClick
      })
    ];
  }
}
