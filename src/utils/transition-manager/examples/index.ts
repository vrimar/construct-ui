import m from 'mithril';
import { TransitionManager, Switch, Button, Popover, Tooltip, Dialog, Classes, ButtonGroup } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'utils/transition-manager/examples/index.ts';

export class TransitionManagerExample {
  private isDialogOpen = false;

  public onremove() {
    TransitionManager.isEnabled = true;
  }

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(ButtonGroup, [
        m(Popover, {
          content: 'Content',
          trigger: m(Button, { label: 'Popover trigger' })
        }),

        m(Tooltip, {
          content: 'Content',
          trigger: m(Button, { label: 'Tooltip trigger' })
        }),

        m(Button, {
          label: 'Show dialog',
          onclick: () => this.isDialogOpen = !this.isDialogOpen
        })
      ]),

      m(Dialog, {
        content: 'Content',
        isOpen: this.isDialogOpen,
        onClose: this.closeDialog,
        title: 'Dialog title',
        footer: m(`.${Classes.ALIGN_RIGHT}`, [
          m(Button, {
            label: 'Close',
            onclick: this.closeDialog
          })
        ])
      })
    ]);
  }

  private closeDialog = () => this.isDialogOpen = false;

  private renderOptions() {
    return [
      m(Switch, {
        label: 'Enabled',
        checked: TransitionManager.isEnabled,
        onchange: () => {
          TransitionManager.isEnabled
            ? TransitionManager.disable()
            : TransitionManager.enable();
        }
      })
    ];
  }
}
