import m from 'mithril';
import { Intent, ISelectAttrs, Select } from '../../';

export interface IIntentSelectAttrs extends ISelectAttrs {
  onSelect: (intent?: Intent) => void;
}

export class IntentSelect implements m.Component<IIntentSelectAttrs> {
  public view({ attrs: { onSelect, ...otherAttrs } }: m.Vnode<IIntentSelectAttrs>) {
    return m(Select, {
      ...otherAttrs,
      options: Object.keys(Intent).map(key => Intent[key]),
      onchange: (e: Event) => {
        const target = (e.target as HTMLSelectElement);
        const intent = target.options[target.options.selectedIndex].value as Intent;
        onSelect(intent === 'none' ? undefined : intent);
      },
      size: 'xs',
      fluid: true
    });
  }
}
