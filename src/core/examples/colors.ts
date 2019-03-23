import m from 'mithril';
import tinycolor from 'tinycolor2';
import { Colors, Grid, Col } from '@/';

const colors = Object.keys(Colors);

const colorGroups = colors
  .filter(color => !color.includes('WHITE'))
  .reduce((colorGroup, color, index) => {
    const groupIndex = Math.floor(index / 10);

    if (!colorGroup[groupIndex]) {
      colorGroup[groupIndex] = [];
    }

    colorGroup[groupIndex].push(color);

    return colorGroup;
  }, [] as any);

const greyScaleColors = colorGroups.slice(0, 2);
const coreColors = colorGroups.slice(2, colorGroups.length);

export class ColorsExample {
  public view() {
    return m('.cui-example-colors', [
      m('h2', 'Greyscale Colors'),
      this.renderColorGrid(greyScaleColors),

      m('h2', 'Core colors'),
      this.renderColorGrid(coreColors)
    ]);
  }

  private renderColorGrid(groups: string[][]) {
    const colSpan = {
      xs: 12,
      md: 6,
      sm: 6,
      lg: 4
    };

    return m(Grid, { gutter: 20 }, groups.map(colorGroup => [
      m(Col, { span: colSpan }, [
        m('.cui-example-colors-group', colorGroup.map(color => this.renderColorbar(color)))
      ])
    ]));
  }

  private renderColorbar(color: string) {
    const style = {
      background: Colors[color],
      color: tinycolor(Colors[color]).isLight() ? 'black' : 'white'
    };

    return m('.cui-example-colors-bar', { style }, [
      m('', color),
      m('', Colors[color])
    ]);
  }
}
