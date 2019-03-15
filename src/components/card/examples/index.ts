import m from 'mithril';
import { Card, RadioGroup, Switch, Size } from '@/';
import { Example, SizeSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/card/examples/index.ts';
const elevations = ['0', '1', '2', '3', '4'];

export class CardExample {
  private elevation = 1;
  private fluid: boolean;
  private interactive = false;
  private size: Size;

  public view() {
    return m(Example, { options: this.renderOptions(), center: true, src: EXAMPLE_SRC }, [
      m(Card, {
        elevation: this.elevation,
        fluid: this.fluid,
        interactive: this.interactive,
        size: this.size,
        style: 'min-width: 300px'
      },
        m('h4', 'Card title'),
        m('', 'Card content')
      )
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, {
        value: this.size,
        onSelect: (size: Size) => this.size = size
      }),
      m(Switch, {
        label: 'Interactive',
        onchange: () => this.interactive = !this.interactive
      }),
      m(Switch, {
        label: 'Fluid',
        onchange: () => this.fluid = !this.fluid
      }),
      m('h5', 'Elevation'),
      m(RadioGroup, {
        options: elevations,
        value: this.elevation.toString(),
        onchange: (e: Event) => this.elevation = parseInt((e.currentTarget as HTMLInputElement).value)
      })
    ];
  }
}
