import m from 'mithril';
import { Button, Icon, Icons, ListItem, QueryList, Tooltip } from '@/';
import { Example, countries, ICountryModel } from '@shared/examples';

const EXAMPLE_SRC = 'components/query-list/examples/controlled.ts';
const countryQueryList = QueryList.ofType<ICountryModel>();

export class QueryListControlledExample {
  private selectedItem?: ICountryModel;
  private activeIndex: number = 5;
  private query: string = 'Al';

  public view() {
    const resetButton = m(Tooltip, {
      content: 'Reset',
      trigger: m(Button, {
        iconLeft: Icons.REFRESH_CW,
        onclick: this.resetAll
      }),
      size: 'xs'
    });

    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(countryQueryList, {
        activeIndex: this.activeIndex,
        contentRight: resetButton,
        items: countries,
        itemPredicate: this.itemPredicate,
        itemRender: (item: ICountryModel) => m(ListItem, {
          label: item.name,
          selected: this.selectedItem === item,
          key: item.code
        }),
        inputAttrs: {
          contentLeft: m(Icon, { name: Icons.SEARCH }),
          autofocus: true,
          index: 0,
          placeholder: 'Search countries...'
        },
        onActiveItemChange: this.handleActiveItemChange,
        onQueryChange: this.handleQueryChange,
        onSelect: this.handleSelect,
        listAttrs: { style: 'height:300px; width:300px' },
        query: this.query
      })
    ]);
  }

  private itemPredicate(query: string, item: ICountryModel) {
    return item.name.toLowerCase().includes(query.toLowerCase());
  }

  private handleSelect = (item: ICountryModel) => {
    this.selectedItem = item;
  }

  private handleActiveItemChange = (_item: ICountryModel, index: number) => {
    this.activeIndex = index;
  }

  private handleQueryChange = (query: string) => {
    this.query = query;
  }

  private resetAll = () => {
    this.activeIndex = 0;
    this.selectedItem = undefined;
    this.query = '';
  }

  private renderOptions() {
    return [
      m(Button, {
        label: 'Query = "Canada"',
        onclick: () => this.query = 'Canada',
        size: 'xs',
        style: 'margin-bottom: 5px'
      }),

      m(Button, {
        label: 'Index to "10"',
        onclick: () => this.activeIndex = 10,
        size: 'xs'
      })
    ];
  }
}
