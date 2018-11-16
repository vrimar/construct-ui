import m from 'mithril';
import { Button, Card, Overlay, Switch } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/overlay/examples/index.ts';

export class OverlayExample {
  private closeOnEscapeKey = true;
  private closeOnOutsideClick = true;
  private inline = false;
  private hasBackdrop = true;
  private isOpen = false;

  public view() {
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100
    };

    const cardStyles = {
      margin: '40px auto'
    };

    const content = m('', { style }, [
      m(Card, { style: cardStyles }, [
        m('h3', 'Title'),
        m(Button, {
          label: 'Close',
          onclick: () => this.isOpen = false
        })
      ])
    ]);

    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Button, {
        label: 'Show Overlay',
        intent: 'primary',
        onclick: () => this.isOpen = true
      }),

      m(Overlay, {
        closeOnEscapeKey: this.closeOnEscapeKey,
        closeOnOutsideClick: this.closeOnOutsideClick,
        hasBackdrop: this.hasBackdrop,
        inline: this.inline,
        content,
        isOpen: this.isOpen,
        onClose: () => this.isOpen = false,
        transitionDuration: 0
      })
    ]);
  }

  private renderOptions() {
    return [
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
        label: 'Has backdrop',
        onchange: () => this.hasBackdrop = !this.hasBackdrop
      })
    ];
  }
}
