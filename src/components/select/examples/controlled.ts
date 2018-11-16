import m from 'mithril';
import { Select, Button } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/select/examples/controlled.ts';

export class SelectControlledExample {
  private options: string[] = ['First', 'Second', 'Third', 'Fourth'];
  private value: string = 'Third';

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Select, {
        options: this.options,
        onchange: () => null,
        value: this.value
      })
    ]);
  }

  private renderOptions() {
    return [
      m(Button, {
        label: 'Set to "Second"',
        size: 'xs',
        onclick: () => this.value = 'First',
        style: 'margin-bottom: 10px'
      }),

      m(Button, {
        label: 'Set to "Fourth"',
        size: 'xs',
        onclick: () => this.value = 'Fourth'
      })
    ];
  }
}
