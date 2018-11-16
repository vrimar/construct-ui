import m from 'mithril';
import { Col, Grid } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/grid/examples/offset.ts';

export class GridOffsetExample {
  public view() {
    return m(Example, { class: 'cui-example-grid', center: false, src: EXAMPLE_SRC }, [
      m(Grid, m(Col, { span: 2, offset: 10 }, m('.cui-example-grid-col', 'offset-10'))),
      m(Grid, m(Col, { span: 3, offset: 9 }, m('.cui-example-grid-col', 'offset-9'))),
      m(Grid, m(Col, { span: 4, offset: 8 }, m('.cui-example-grid-col', 'offset-8'))),
      m(Grid, m(Col, { span: 5, offset: 7 }, m('.cui-example-grid-col', 'offset-7'))),
      m(Grid, m(Col, { span: 6, offset: 6 }, m('.cui-example-grid-col', 'offset-6')))
    ]);
  }
}
