import m from 'mithril';
import { Table, Switch } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/table/examples/index.ts';

export class TableExample {
  private bordered = true;
  private interactive = true;
  private striped = false;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Table, {
        bordered: this.bordered,
        interactive: this.interactive,
        striped: this.striped
      }, [
          m('tr', [
            m('th', 'Heading 1'),
            m('th', 'Heading 2')
          ]),
          m('tr', [
            m('td', 'Cell 1'),
            m('td', 'Cell 2')
          ]),
          m('tr', [
            m('td', 'Cell 1'),
            m('td', 'Cell 2')
          ]),
          m('tr', [
            m('td', 'Cell 1'),
            m('td', 'Cell 2')
          ])
        ])
    ]);
  }

  private renderOptions() {
    return [
      m(Switch, {
        checked: this.bordered,
        label: 'Bordered',
        onchange: () => this.bordered = !this.bordered
      }),
      m(Switch, {
        checked: this.striped,
        label: 'Striped',
        onchange: () => this.striped = !this.striped
      }),
      m(Switch, {
        checked: this.interactive,
        label: 'Interactive',
        onchange: () => this.interactive = !this.interactive
      })
    ];
  }
}
