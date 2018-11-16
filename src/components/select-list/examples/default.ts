import m from 'mithril';
import { ListItem, SelectList, Icons, Switch, Colors, Button } from '@/';
import { Example, countries, ICountryModel } from '@shared/examples';

const EXAMPLE_SRC = 'components/select-list/examples/default.ts';
const CountryList = SelectList.ofType<ICountryModel>();

export class SelectListExample {
  private selectedItem: ICountryModel = countries[0];
  private closeOnSelect = true;
  private header = false;
  private footer = false;
  private loading = false;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(CountryList, {
        closeOnSelect: this.closeOnSelect,
        header: this.header ? m('h4', 'Header content') : undefined,
        footer: this.footer ? m('h4[style=margin: 15px 0 0 0]', 'Footer content') : undefined,
        items: countries,
        itemRender: this.renderItem,
        itemPredicate: this.itemPredicate,
        onSelect: this.handleSelect,
        loading: this.loading,
        popoverAttrs: {
          hasArrow: false
          // transitionDuration: 0
        },
        trigger: m(Button, {
          align: 'left',
          compact: true,
          iconRight: Icons.CHEVRON_DOWN,
          sublabel: 'Country:',
          label: this.selectedItem && this.selectedItem.name,
          style: 'min-width: 300px'
        })
      })
    ]);
  }

  private renderItem = (item: ICountryModel) => m(ListItem, {
    contentRight: m('', { style: `color:${Colors.BLUE_GREY200}` }, item.code),
    label: item.name,
    selected: this.selectedItem && this.selectedItem.name === item.name
  })

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
        checked: this.header,
        label: 'Header',
        onchange: () => this.header = !this.header
      }),

      m(Switch, {
        checked: this.footer,
        label: 'Footer',
        onchange: () => this.footer = !this.footer
      }),

      m(Switch, {
        checked: this.loading,
        label: 'Loading',
        onchange: () => this.loading = !this.loading
      })
    ];
  }
}
