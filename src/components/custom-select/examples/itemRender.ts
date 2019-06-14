import m from 'mithril';
import { Example } from '@shared/examples';
import { CustomSelect, ListItem, Icon, Icons, IOption } from '@/';

const EXAMPLE_SRC = 'components/custom-select/examples/itemRender.ts';
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

export class CustomSelectRenderExample {
  public view() {
    return m(Example, { src: EXAMPLE_SRC }, [
      m(CustomSelect, {
        triggerAttrs: {
          align: 'left',
          style: 'width: 300px'
        },
        defaultValue: '3',
        itemRender: (item, isSelected, index) => m(ListItem, {
          contentLeft: m(Icon, {
            name: index % 2 ? Icons.FILE_PLUS : Icons.USERS
          }),
          style: index % 2 ? 'color: red' : undefined,
          label: (item as IOption).label,
          selected: isSelected
        }),
        options
      })
    ]);
  }
}
