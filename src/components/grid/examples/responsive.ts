import m from 'mithril';
import { Col, Grid, Table, Breakpoints } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/grid/examples/responsive.ts';
const breakpoints = Object.keys(Breakpoints);

export class GridResponsiveExample {
  public view() {
    return [
      m(Example, { class: 'cui-example-grid', center: false, src: EXAMPLE_SRC }, [
        m(Grid, { gutter: { xs: 0, sm: 10, md: 20, lg: 30, xl: 40 } }, [
          m(Col, { span: { xs: 12, md: 4 } }, m('.cui-example-grid-col', 'col')),
          m(Col, { span: { xs: 12, md: 4 } }, m('.cui-example-grid-col', 'col')),
          m(Col, { span: { xs: 12, md: 4 } }, m('.cui-example-grid-col', 'col'))
        ])
      ]),

      m(Table, [
        m('tr', [
          m('th', 'Size'),
          m('th', 'Description')
        ]),
        breakpoints.map(breakpoint => m('tr', [
          m('td', m('code', breakpoint)),
          m('td', Breakpoints[breakpoint])
        ]))
      ])
    ];
  }
}
