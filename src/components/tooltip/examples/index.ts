import m from 'mithril';
import { Tooltip, PopoverPosition, Size, Switch, Button } from '@/';
import { Example, PopoverPositionSelect, SizeSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/tooltip/examples/index.ts';

export class TooltipExample {
  private hasArrow: boolean = true;
  private position: PopoverPosition = 'bottom';
  private size: Size;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Tooltip, {
        content: 'Tooltip content',
        position: this.position,
        hasArrow: this.hasArrow,
        size: this.size,
        trigger: m(Button, {
          label: 'Hover me'
        })
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Position'),
      m(PopoverPositionSelect, { onSelect: (position: PopoverPosition) => this.position = position }),
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m(Switch, {
        label: 'Has arrow',
        checked: this.hasArrow,
        onchange: () => this.hasArrow = !this.hasArrow
      })
    ];
  }
}
