import m from 'mithril';
import { Col, Grid, Switch, Select } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/grid/examples/basic.ts';

export class GridBasicExample {
  private gutter = false;
  private align: any;
  private justify: any;

  public view() {
    const gridAttrs = {
      gutter: this.gutter ? 20 : 0,
      align: this.align,
      justify: this.justify
    };

    const exampleAttrs = {
      class: 'cui-example-grid',
      options: this.renderOptions(),
      center: false,
      src: EXAMPLE_SRC
    };

    return m(Example, exampleAttrs, [
      m(Grid, { ...gridAttrs }, [
        m(Col, { span: 8 }, m('.cui-example-grid-col', 'col-8')),
        m(Col, { span: 4 }, m('.cui-example-grid-col', 'col-4'))
      ]),

      m(Grid, { ...gridAttrs }, [
        m(Col, { span: 4 }, m('.cui-example-grid-col', 'col-4')),
        m(Col, { span: 4 }, m('.cui-example-grid-col[style=height:100px]', 'col-4')),
        m(Col, { span: 3 }, m('.cui-example-grid-col', 'col-3'))
      ])
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Align'),
      m(Select, {
        options: ['top', 'middle', 'bottom'],
        onchange: (e: Event) => this.align = (e.target as HTMLInputElement).value,
        size: 'xs'
      }),
      m('h5', 'Justify'),
      m(Select, {
        options: ['start', 'center', 'space-around', 'space-between'],
        onchange: (e: Event) => this.justify = (e.target as HTMLInputElement).value,
        size: 'xs'
      }),
      m(Switch, {
        checked: this.gutter,
        label: 'Gutter',
        onchange: () => this.gutter = !this.gutter
      })
    ];
  }
}
