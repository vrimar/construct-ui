import m from 'mithril';
import { Col, Grid, Icon, Icons, Card, Input } from '@/';

const iconNames = Object.keys(Icons).slice(1);

export class IconsExample {
  private searchQuery: string = '';

  public view() {
    const icons = this.getFilteredIcons();

    const searchInput = m(Input, {
      autofocus: true,
      contentLeft: m(Icon, { name: Icons.SEARCH }),
      contentRight: this.searchQuery ? m(Icon, {
        name: Icons.X,
        onclick: () => this.searchQuery = ''
      }) : undefined,
      fluid: true,
      placeholder: 'Search icons...',
      oninput: (e: Event) => this.searchQuery = (e.target as HTMLInputElement).value,
      style: 'margin-bottom: 30px',
      value: this.searchQuery
    });

    const cols = icons.map(iconName => m(Col, { span: 4 }, [
      m(Card, { class: 'cui-example-icon-card', interactive: true }, [
        m(Icon, {
          name: Icons[iconName],
          size: 'xl'
        }),
        m('span', Icons[iconName])
      ])
    ]));

    return [
      searchInput,
      m(Grid, { gutter: 10 }, cols)
    ];
  }

  private getFilteredIcons() {
    if (!this.searchQuery) {
      return iconNames;
    }

    const query = this.searchQuery.toLowerCase();

    return iconNames.filter(iconName => iconName.toLowerCase().includes(query));
  }
}
