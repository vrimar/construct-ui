import m from 'mithril';
import { List, ListItem, Size } from '@/';
import { Example, SizeSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/list/examples/simple.ts';

const data = [
  { key: 1, name: 'List item 1' },
  { key: 2, name: 'List item 2' },
  { key: 3, name: 'List item 3' },
  { key: 4, name: 'List item 4' }
];

export class ListSimpleExample {
  private size: Size;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(List, { size: this.size }, data.map(item => m(ListItem, { label: `List item ${item.key}` })))
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size })
    ];
  }
}
