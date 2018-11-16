import m from 'mithril';
import { RadioGroup } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/radio/examples/radio-group.ts';

export class RadioGroupExample {
  private options = ['First', 'Second', 'Third'];
  private selected = 'Second';

  public view() {
    return m(Example, { src: EXAMPLE_SRC }, [
      m(RadioGroup, {
        options: this.options,
        value: this.selected,
        onchange: (e: Event) => this.selected = (e.currentTarget as HTMLInputElement).value
      })
    ]);
  }
}
