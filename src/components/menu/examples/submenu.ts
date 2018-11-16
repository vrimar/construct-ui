import m from 'mithril';
import { Icons, Menu, MenuDivider, MenuItem, Switch } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/menu/examples/submenu.ts';

export class MenuSubExample {
  private closeOnSubmenuClick = false;

  public view() {
    const downloadActions = [
      m(MenuItem, {
        iconLeft: Icons.PACKAGE,
        label: 'Package'
      }),
      m(MenuItem, {
        iconLeft: Icons.FILE,
        label: 'File'
      }),
      m(MenuItem, {
        iconLeft: Icons.FILE_TEXT,
        label: 'Text File'
      })
    ];

    const actions = [
      m(MenuItem, {
        iconLeft: Icons.BOOKMARK,
        label: 'Bookmark'
      }),
      m(MenuItem, {
        iconLeft: Icons.DOWNLOAD_CLOUD,
        label: 'Download',
        submenu: downloadActions,
        closeOnSubmenuClick: this.closeOnSubmenuClick
      })
    ];

    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Menu, [
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
          label: 'Settings',
          submenu: actions,
          closeOnSubmenuClick: this.closeOnSubmenuClick
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
      m(Switch, {
        checked: this.closeOnSubmenuClick,
        label: 'Close on submenu click',
        onchange: () => this.closeOnSubmenuClick = !this.closeOnSubmenuClick
      })
    ];
  }
}
