import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, getClosest, safeCall } from '../../_shared';
import { isFunction } from 'util';

export interface IListItemAttrs extends IAttrs {
  /** Toggles active state */
  active?: boolean;

  /** Left-justified content */
  contentLeft?: m.Children;

  /** Right-justified content */
  contentRight?: m.Children;

  /** Toggles disabled state */
  disabled?: boolean;

  /** Toggles selected state */
  selected?: boolean;

  /** Inner text or content */
  label?: m.Children;

  /** Callback invoked on click */
  onclick?: (e: Event) => void;

  [htmlAttrs: string]: any;
}

export class ListItem implements m.Component<IListItemAttrs> {
  public view({ attrs }: m.Vnode<IListItemAttrs>) {
    const {
      active,
      class: className,
      contentLeft,
      contentRight,
      disabled,
      selected,
      label,
      onclick,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.LIST_ITEM,
      active && Classes.ACTIVE,
      disabled && Classes.DISABLED,
      selected && Classes.SELECTED,
      className
    );

    const content = [
      contentLeft && m(`.${Classes.LIST_ITEM_CONTENT_LEFT}`, contentLeft),
      label,
      contentRight && m(`.${Classes.LIST_ITEM_CONTENT_RIGHT}`, contentRight)
    ];

    return m('', {
      ...htmlAttrs,
      class: classes,
      onclick: (e: Event) => this.handleClick(e, onclick)
    }, content);
  }

  private handleClick(e: Event, onclick?: (e: Event) => void) {
    const el = e.target as HTMLElement;
    const isClickOnLeftContent = getClosest(el, `.${Classes.LIST_ITEM_CONTENT_LEFT}`);
    const isClickOnRightContent = getClosest(el, `.${Classes.LIST_ITEM_CONTENT_RIGHT}`);

    if (isFunction(onclick) && !isClickOnLeftContent && !isClickOnRightContent) {
      safeCall(onclick, e);
    } else (e as any).redraw = false;
  }
}
