import m from 'mithril';
import { ListItem, InputSelect, Switch } from '@/';
import { Example, countries, ICountryModel } from '@shared/examples';

const EXAMPLE_SRC = 'components/input-select/examples/index.ts';
const countryInputSelect = InputSelect.ofType<ICountryModel>();

export class InputSelectExample {
  private selectedItem: ICountryModel = countries[0];
  private closeOnSelect = true;
  private openOnDownKey = true;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(countryInputSelect, {
        closeOnSelect: this.closeOnSelect,
        items: countries,
        itemRender: this.renderItem,
        itemPredicate: this.itemPredicate,
        onSelect: this.handleSelect,
        popoverAttrs: { hasArrow: false },
        value: this.selectedItem && this.selectedItem.name,
        openOnDownKey: this.openOnDownKey
      })
    ]);
  }

  private renderItem = (item: ICountryModel) => m(ListItem, {
    label: item.name,
    selected: this.selectedItem && this.selectedItem.name === item.name
  });

  private itemPredicate(query: string, item: ICountryModel) {
    return item.name.toLowerCase().includes(query.toLowerCase());
  }

  private handleSelect = (item: ICountryModel) => this.selectedItem = item;

  private renderOptions() {
    return [
      m(Switch, {
        checked: this.closeOnSelect,
        label: 'Close on select',
        onchange: () => this.closeOnSelect = !this.closeOnSelect
      }),

      m(Switch, {
        checked: this.openOnDownKey,
        label: 'Open on down key',
        onchange: () => this.openOnDownKey = !this.openOnDownKey
      })
    ];
  }
}
