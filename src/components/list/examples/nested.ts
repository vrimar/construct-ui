import m from 'mithril';
import { List, ListItem } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/list/examples/nested.ts';

interface IDataType {
  label: string;
  children: string[];
}

const data = [
  {
    label: 'Header 1',
    children: [
      'List item 1',
      'List item 2',
      'List item 3'
    ]
  },
  {
    label: 'Header 2',
    children: [
      'List item 4',
      'List item 5',
      'List item 6'
    ]
  },
  {
    label: 'Header 3',
    children: [
      'List item 7',
      'List item 8',
      'List item 9'
    ]
  }
] as IDataType[];

export class ListNestedExample {
  public view() {
    return m(Example, { src: EXAMPLE_SRC }, [
      m(List, data.map(item => m('', [
        m('h4', {
          style: {
            margin: 0,
            padding: '20px 0 10px 10px'
          }
        }, item.label),

        m(List, item.children.map(nestedItem => m(ListItem, { label: nestedItem })))
      ])))
    ]);
  }
}
