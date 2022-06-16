import m from 'mithril';
import { Icon, Icons, ListItem, QueryList, Switch, Size } from '@/';
import { Example, countries, ICountryModel, SizeSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/query-list/examples/default.ts';
const countryQueryList = QueryList.ofType<ICountryModel>();

export class QueryListExample {
  private checkmark = true;
  private filterable = true;
  private initialContent = false;
  private selectedItem: ICountryModel;
  private size: Size;
  private disableArrowKeys: boolean = false;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(countryQueryList, {
        disableArrowKeys: this.disableArrowKeys,
        checkmark: this.checkmark,
        initialContent: this.initialContent ? 'Search...' : undefined,
        items: countries,
        itemPredicate: this.itemPredicate,
        itemRender: this.renderItem,
        inputAttrs: {
          contentLeft: m(Icon, { name: Icons.SEARCH }),
          placeholder: 'Search countries...'
        },
        filterable: this.filterable,
        onSelect: this.handleSelect,
        listAttrs: {
          style: 'height:300px; width:300px',
          size: this.size
        }
      })
    ]);
  }

  private renderItem = (item: ICountryModel, index: number) => {
    return m(ListItem, {
      label: item.name,
      selected: this.selectedItem === item,
      disabled: index === 3 || index === 4,
      key: item.code
    });
  };

  private itemPredicate(query: string, item: ICountryModel) {
    return item.name.toLowerCase().includes(query.toLowerCase());
  }

  private handleSelect = (item: ICountryModel) => {
    this.selectedItem = item;
  };

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),

      m(Switch, {
        checked: this.filterable,
        label: 'Filterable',
        onchange: () => this.filterable = !this.filterable
      }),

      m(Switch, {
        checked: this.checkmark,
        label: 'Item checkmark',
        onchange: () => this.checkmark = !this.checkmark
      }),

      m(Switch, {
        checked: this.initialContent,
        label: 'Has initial content',
        onchange: () => this.initialContent = !this.initialContent
      }),

      m(Switch, {
        checked: this.disableArrowKeys,
        label: 'Disable arrow keys',
        onchange: () => this.disableArrowKeys = !this.disableArrowKeys
      })
    ];
  }
}
