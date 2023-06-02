import m from 'mithril';
import { getObjectKeys, ISelectAttrs, Select, Size } from '../../';

export interface ISizeSelectAttrs extends ISelectAttrs {
  onSelect: (size?: Size) => void;
}

export class SizeSelect implements m.Component<ISizeSelectAttrs> {
  private selected: Size = 'default';

  public view({ attrs }: m.Vnode<ISizeSelectAttrs>) {
    const { onSelect, ...otherAttrs } = attrs;

    return m(Select, {
      ...otherAttrs,
      fluid: true,
      options: getObjectKeys(Size).map(key => Size[key]),
      onchange: (e: Event) => {
        const target = (e.target as HTMLSelectElement);
        const size = target.options[target.selectedIndex].value as Size;
        this.selected = size;
        onSelect(size === 'default' ? undefined : size);
      },
      size: 'xs',
      value: this.selected
    });
  }
}
