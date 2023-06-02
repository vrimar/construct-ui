import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, safeCall, isFunction } from '../../_shared';

export interface IListItemAttrs extends IAttrs {
  /** Toggles active state */
  active?: boolean;

  /** Allow onclick event to be processed for contentLeft/contentRight */
  allowOnContentClick?: boolean;

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
      onclick: (e: Event) => this.handleClick(e, attrs)
    }, content);
  }

  private handleClick(e: Event, attrs: IListItemAttrs) {
    const { allowOnContentClick, onclick } = attrs;
    const el = e.target as HTMLElement;
    const isLeftContentClick = el.closest(`.${Classes.LIST_ITEM_CONTENT_LEFT}`);
    const isRightContentClick = el.closest(`.${Classes.LIST_ITEM_CONTENT_RIGHT}`);
    const allowContentClick = allowOnContentClick || (!isLeftContentClick && !isRightContentClick);

    if (isFunction(onclick) && allowContentClick) {
      safeCall(onclick, e);
    } else (e as any).redraw = false;
  }
}
