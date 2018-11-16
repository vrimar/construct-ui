import m from 'mithril';
import { Example } from '@shared/examples';
import { CustomSelect } from '@/';

const EXAMPLE_SRC = 'components/custom-select/examples/index.ts';
const options = [
  {
    label: 'First',
    value: '1'
  },
  {
    label: 'Second',
    value: '2',
    disabled: true
  },
  {
    label: 'Third',
    value: '3'
  },
  {
    label: 'Fourth',
    value: '4'
  }
];

export class CustomSelectExample {
  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(CustomSelect, {
        defaultValue: '3',
        options
      })
    ]);
  }

  private renderOptions() {
    return [
      m('')
    ];
  }
}
