import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs, IIntentAttrs } from '../../_shared';
import { IconContents, Icons } from './generated';

export type IconName = (typeof Icons)[keyof typeof Icons];

export interface IIconAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Icon name */
  name: IconName;

  /** Callback invoked on click; Passing this attr will apply hover styles to the icon */
  onclick?: (e: Event) => void;

  [htmlAttrs: string]: any;
}

export class Icon implements m.Component<IIconAttrs> {
  public view({ attrs }: m.Vnode<IIconAttrs>) {
    const { class: className, intent, name, onclick, size, ...htmlAttrs } = attrs;

    const classes = classnames(
      Classes.ICON,
      `${Classes.ICON}-${name}`,
      intent && `cui-${intent}`,
      size && `cui-${size}`,
      onclick && Classes.ICON_ACTION,
      className
    );

    const svg = m.trust(`<svg viewBox='0 0 24 24'>${IconContents[name]}</svg>`);

    return m('', {
      ...htmlAttrs,
      class: classes,
      onclick
    }, svg);
  }
}
