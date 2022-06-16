import m from 'mithril';
import { Popover, Switch, Button } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/popover/examples/nested.ts';

export class PopoverNestedExample {
  private addToStack = true;

  public view() {
    const nestedPopover = m(Popover, {
      closeOnContentClick: true,
      content: 'Content',
      trigger: m(Button, { label: 'Nested trigger' }),
      position: 'left',
      inline: true,
      addToStack: this.addToStack
    });

    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Popover, {
        content: nestedPopover,
        trigger: m(Button, {
          label: 'Popover trigger',
          intent: 'primary'
        })
      })
    ]);
  }

  private renderOptions() {
    return [
      m(Switch, {
        label: 'Add to stack',
        checked: this.addToStack,
        onchange: () => this.addToStack = !this.addToStack
      })
    ];
  }
}
