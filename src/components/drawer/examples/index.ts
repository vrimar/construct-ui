import m from 'mithril';
import { Button, Drawer, DrawerPosition, Switch, Select, getObjectKeys } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/drawer/examples/index.ts';

export class DrawerExample {
  private closeOnEscapeKey = true;
  private closeOnOutsideClick = true;
  private hasBackdrop = true;
  private inline = false;
  private isOpen = false;
  private position: DrawerPosition = 'right';

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m('.cui-example-overflow-hidden', [
        m(Drawer, {
          closeOnEscapeKey: this.closeOnEscapeKey,
          closeOnOutsideClick: this.closeOnOutsideClick,
          content: [
            m('h4', 'Drawer Content'),
            m(Button, {
              label: 'Close Drawer',
              onclick: () => this.isOpen = false
            })
          ],
          hasBackdrop: this.hasBackdrop,
          position: this.position,
          isOpen: this.isOpen,
          inline: this.inline,
          onClose: () => this.isOpen = false
        })
      ]),

      m(Button, {
        label: 'Show drawer',
        intent: 'primary',
        onclick: () => this.isOpen = !this.isOpen
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Position'),
      m(Select, {
        options: getObjectKeys(DrawerPosition).map(key => DrawerPosition[key]),
        onchange: (e: Event) => this.position = (e.target as HTMLInputElement).value as DrawerPosition,
        size: 'xs',
        fluid: true,
        value: this.position
      }),

      m(Switch, {
        checked: this.closeOnEscapeKey,
        label: 'Close on ESC key',
        onchange: () => this.closeOnEscapeKey = !this.closeOnEscapeKey
      }),

      m(Switch, {
        checked: this.closeOnOutsideClick,
        label: 'Close on outer click',
        onchange: () => this.closeOnOutsideClick = !this.closeOnOutsideClick
      }),

      m(Switch, {
        checked: this.inline,
        label: 'Render inline',
        onchange: () => this.inline = !this.inline
      }),

      m(Switch, {
        checked: this.hasBackdrop,
        label: 'Has backdrop',
        onchange: () => this.hasBackdrop = !this.hasBackdrop
      })
    ];
  }
}
