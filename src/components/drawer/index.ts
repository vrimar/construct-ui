import m from 'mithril';
import classnames from 'classnames';
import { Classes } from '../../_shared';
import { IOverlayAttrs, Overlay } from '../overlay';

export const DrawerPosition = {
  TOP: 'top' as 'top',
  BOTTOM: 'bottom' as 'bottom',
  RIGHT: 'right' as 'right',
  LEFT: 'left' as 'left'
};

export type DrawerPosition = typeof DrawerPosition[keyof typeof DrawerPosition];

export interface IDrawerAttrs extends IOverlayAttrs {
  /** Position of drawer */
  position?: DrawerPosition;
}

export class Drawer implements m.Component<IDrawerAttrs> {
  public view({ attrs }: m.Vnode<IDrawerAttrs>) {
    const { position, content, class: className, style, ...otherAttrs } = attrs;

    const innerContent = m(`.${Classes.DRAWER_CONTENT}`, content);

    const classes = classnames(
      Classes.DRAWER,
      `${Classes.DRAWER}-${position}`,
      className
    );

    const container = m('', { class: classes, style }, innerContent);

    return m(Overlay, {
      ...otherAttrs as IOverlayAttrs,
      content: container
    });
  }
}
