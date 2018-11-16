import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs } from '../../_shared';

export interface ICardAttrs extends IAttrs, ISizeAttrs {
  /** Degree of card shadow */
  elevation?: number;

  /** Adds interactive hover/active styling */
  interactive?: boolean;

  [htmlAttrs: string]: any;
}

export class Card implements m.Component<ICardAttrs> {
  public view({ attrs, children }: m.Vnode<ICardAttrs>) {
    const { class: className, elevation, interactive, size, ...htmlAttrs } = attrs;

    return m('', {
      ...htmlAttrs,
      class: classnames(
        Classes.CARD,
        elevation && `cui-elevation-${elevation || 1}`,
        interactive && Classes.CARD_INTERACTIVE,
        size && `cui-${size}`,
        className
      )
    }, children);
  }
}
