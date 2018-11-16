import m from 'mithril';
import { PopoverPosition, ISelectAttrs, Select } from '../../';

export interface IPopoverPositionSelectAttrs extends ISelectAttrs {
  onSelect: (e: PopoverPosition) => void;
}

export class PopoverPositionSelect implements m.Component<IPopoverPositionSelectAttrs> {
  public view({ attrs: { onSelect, ...otherAttrs } }: m.Vnode<IPopoverPositionSelectAttrs>) {
    return m(Select, {
      ...otherAttrs,
      fluid: true,
      options: Object.keys(PopoverPosition).map(key => PopoverPosition[key]),
      onchange: (e: Event) => {
        const target = (e.target as HTMLSelectElement);
        const position = target.options[target.options.selectedIndex].value as PopoverPosition;
        onSelect(position);
      },
      size: 'xs'
    });
  }
}
