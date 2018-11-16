import m from 'mithril';
import { Col, Grid } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/grid/examples/order.ts';

export class GridOrderExample {
  public view() {
    return m(Example, { center: false, src: EXAMPLE_SRC }, [
      m(Grid, [
        m(Col, { span: 4, order: 3 }, m('.cui-example-grid-col', 'first')),
        m(Col, { span: 4, order: 1 }, m('.cui-example-grid-col', 'second')),
        m(Col, { span: 4, order: 2 }, m('.cui-example-grid-col', 'third'))
      ])
    ]);
  }
}
