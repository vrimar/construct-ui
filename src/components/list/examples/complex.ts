import m from 'mithril';
import { Button, Icon, Icons, List, ListItem, PopoverMenu, MenuItem } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/list/examples/complex.ts';

const data = [
  'List item 1',
  'List item 2',
  'List item 3',
  'List item 4'
];

export class ListComplexExample {
  public view() {
    return m(Example, { src: EXAMPLE_SRC }, [
      m(List, data.map(item => m(ListItem, {
        contentLeft: m(Icon, { name: Icons.LINK }),
        contentRight: m(PopoverMenu, {
          closeOnContentClick: true,
          content: [
            m(MenuItem, {
              iconLeft: Icons.EDIT,
              label: 'Edit'
            }),
            m(MenuItem, {
              iconLeft: Icons.TRASH_2,
              label: 'Delete',
              intent: 'negative'
            })
          ],
          trigger: m(Button, {
            iconLeft: Icons.MORE_HORIZONTAL,
            size: 'xs'
          }),
          position: 'bottom-end'
        }),
        label: item
      })))
    ]);
  }
}
