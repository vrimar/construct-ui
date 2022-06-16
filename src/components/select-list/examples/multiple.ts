import m from 'mithril';
import { ListItem, SelectList, Button, Icons } from '@/';
import { Example, countries, ICountryModel } from '@shared/examples';

const EXAMPLE_SRC = 'components/select-list/examples/multiple.ts';
const CountryList = SelectList.ofType<ICountryModel>();

export class SelectListMultipleExample {
  private selectedItems: Map<string, ICountryModel> = new Map();

  public view() {
    return m(Example, { src: EXAMPLE_SRC }, [
      m(CountryList, {
        closeOnSelect: false,
        items: countries,
        itemRender: this.renderItem,
        itemPredicate: this.itemPredicate,
        onSelect: this.handleSelect,
        popoverAttrs: { hasArrow: false },
        trigger: m(Button, {
          align: 'left',
          compact: true,
          iconRight: Icons.CHEVRON_DOWN,
          sublabel: 'Country:',
          label: `${this.selectedItems.size} selected`,
          style: 'min-width: 300px'
        })
      })
    ]);
  }

  private renderItem = (item: ICountryModel) => m(ListItem, {
    label: item.name,
    selected: this.selectedItems.has(item.name)
  });

  private itemPredicate(query: string, item: ICountryModel) {
    return item.name.toLowerCase().includes(query.toLowerCase());
  }

  private handleSelect = (item: ICountryModel) => {
    if (this.selectedItems.has(item.name)) {
      this.selectedItems.delete(item.name);
    } else this.selectedItems.set(item.name, item);
  };
}
