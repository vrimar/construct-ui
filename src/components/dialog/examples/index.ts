import m from 'mithril';
import { Classes, Button, Dialog, Input, Switch } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/dialog/examples/index.ts';

export class DialogExample {
  private autofocus = true;
  private basic = false;
  private closeOnEscapeKey = true;
  private closeOnOutsideClick = true;
  private hasBackdrop = true;
  private inline = false;
  private isOpen = false;
  private transition = true;

  private isSubmitting = false;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Button, {
        label: 'Show dialog',
        intent: 'primary',
        onclick: () => this.isOpen = !this.isOpen
      }),

      m(Dialog, {
        autofocus: this.autofocus,
        basic: this.basic,
        closeOnEscapeKey: this.closeOnEscapeKey,
        closeOnOutsideClick: this.closeOnOutsideClick,
        content: m(Input, { autofocus: true, fluid: true }),
        hasBackdrop: this.hasBackdrop,
        isOpen: this.isOpen,
        inline: this.inline,
        onClose: this.close,
        title: 'Dialog title',
        transitionDuration: this.transition ? 200 : 0,
        footer: m(`.${Classes.ALIGN_RIGHT}`, [
          m(Button, {
            label: 'Close',
            onclick: this.close
          }),
          m(Button, {
            loading: this.isSubmitting,
            label: 'Submit',
            intent: 'primary',
            onclick: this.submit
          })
        ])
      })
    ]);
  }

  private close = () => {
    this.isOpen = false;
    this.isSubmitting = false;
  }

  private submit = () => {
    this.isSubmitting = true;

    setTimeout(() => {
      this.close();
      m.redraw();
    }, 1000);
  }

  private renderOptions() {
    return [
      m(Switch, {
        checked: this.autofocus,
        label: 'Auto focus',
        onchange: () => this.autofocus = !this.autofocus
      }),
      m(Switch, {
        checked: this.closeOnEscapeKey,
        label: 'Close on ESC key',
        onchange: () => this.closeOnEscapeKey = !this.closeOnEscapeKey
      }),
      m(Switch, {
        checked: this.closeOnOutsideClick,
        label: 'Close on outside click',
        onchange: () => this.closeOnOutsideClick = !this.closeOnOutsideClick
      }),

      m(Switch, {
        checked: this.inline,
        label: 'Render inline',
        onchange: () => this.inline = !this.inline
      }),

      m(Switch, {
        checked: this.hasBackdrop,
        label: 'Backdrop',
        onchange: () => this.hasBackdrop = !this.hasBackdrop
      }),

      m(Switch, {
        checked: this.transition,
        label: 'Transition',
        onchange: () => this.transition = !this.transition
      }),

      m(Switch, {
        checked: this.basic,
        label: 'Basic',
        onchange: () => this.basic = !this.basic
      })
    ];
  }
}
