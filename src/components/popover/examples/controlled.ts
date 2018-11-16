import m from 'mithril';
import { Switch, Popover, Button } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/popover/examples/controlled.ts';

export class PopoverControlledExample {
  private isOpen = false;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Popover, {
        closeOnContentClick: true,
        closeOnEscapeKey: true,
        content: m('', 'Popover content'),
        trigger: m(Button, {
          label: 'Popover Trigger',
          intent: 'primary'
        }),
        position: 'bottom',
        isOpen: this.isOpen,
        onInteraction: (nextOpenState: boolean) => this.isOpen = nextOpenState
      })
    ]);
  }

  private renderOptions() {
    return [
      m(Switch, {
        label: 'Is open',
        checked: this.isOpen,
        onchange: () => this.isOpen = !this.isOpen
      })
    ];
  }
}
