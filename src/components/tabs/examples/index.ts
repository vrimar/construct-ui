import m from 'mithril';
import { Size, Switch, Select, Align, Icon, Icons } from '@/';
import { Example, SizeSelect } from '@shared/examples';
import { Tabs } from '../Tabs';
import { TabItem } from '../TabsItem';

const EXAMPLE_SRC = 'components/tabs/examples/index.ts';

const items = [
  'Accounts',
  'Projects',
  'Settings'
];

export class TabsExample {
  private align: Align = 'center';
  private size: Size;
  private active: string = 'Projects';
  private bordered: boolean = false;
  private fluid: boolean = false;
  private isLoading: boolean = false;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Tabs, {
        align: this.align,
        bordered: this.bordered,
        fluid: this.fluid,
        size: this.size
      }, [
          items.map(item => m(TabItem, {
            label: [
              item === 'Settings' && m(Icon, {
                name: Icons.SETTINGS,
                style: 'margin-right: 5px'
              }),
              item
            ],
            active: this.active === item,
            loading: item === 'Projects' && this.isLoading,
            onclick: () => this.active = item
          }))
        ])
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m('h5', 'Align'),
      m(Select, {
        fluid: true,
        defaultValue: 'center',
        options: Object.keys(Align).map(key => Align[key]),
        onchange: (e: Event) => this.align = (e.target as HTMLInputElement).value as Align,
        size: 'xs'
      }),
      m(Switch, {
        checked: this.fluid,
        label: 'Fluid',
        onchange: () => this.fluid = !this.fluid
      }),
      m(Switch, {
        checked: this.bordered,
        label: 'Bordered',
        onchange: () => this.bordered = !this.bordered
      }),
      m(Switch, {
        checked: this.isLoading,
        label: 'Loading',
        onchange: () => this.isLoading = !this.isLoading
      })
    ];
  }
}
