import m from 'mithril';
import { Checkbox } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/checkbox/examples/indeterminate.ts';

export class CheckboxIndeterminateExample {
  private options = ['First', 'Second', 'Third'];
  private checkedOptions = ['First', 'Second'];

  public view() {
    const { checkedOptions, options } = this;
    const indeterminate = checkedOptions.length > 0 && checkedOptions.length < options.length;
    const checked = checkedOptions.length === options.length;

    return m(Example, { direction: 'column', src: EXAMPLE_SRC }, [
      m('', [
        m(Checkbox, {
          checked,
          indeterminate,
          label: 'Indeterminate checkbox',
          onchange: (e: Event) => this.onCheckAll(e),
          style: 'display:block; margin-bottom: 15px'
        }),

        this.options.map((option) => m(Checkbox, {
          label: option,
          checked: checkedOptions.includes(option),
          onchange: (e: Event) => this.onChange(e, option),
          style: 'display:block; margin-bottom: 10px'
        }))
      ])
    ]);
  }

  private onCheckAll(e: Event) {
    this.checkedOptions = (e.target as HTMLInputElement).checked ? [...this.options] : [];
  }

  private onChange(e: Event, option: string) {
    if ((e.target as HTMLInputElement).checked) {
      this.checkedOptions.push(option);
    } else {
      const index = this.checkedOptions.indexOf(option);
      this.checkedOptions.splice(index, 1);
    }
  }
}
