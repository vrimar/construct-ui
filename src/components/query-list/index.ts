// Credits go to Blueprintjs for API structure
// https://github.com/palantir/blueprint/blob/develop/packages/select/src/components/query-list/queryList.tsx

import m from 'mithril';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import { Classes, isFunction, Keys, safeCall, IAttrs, getClosest } from '../../_shared';
import { AbstractComponent } from '../abstract-component';
import { Icon, Icons } from '../icon';
import { List, IListAttrs, IListItemAttrs } from '../list';
import { Input, IInputAttrs } from '../input';
import { ControlGroup, IControlGroupAttrs } from '../control-group';

type Direction = 'up' | 'down';

export interface IQueryListEvents {
  handleKeyDown: (e: KeyboardEvent) => void;
}

export interface IFilterableAttrs {
  /** Attrs passed through to the ControlGroup component  */
  controlGroupAttrs?: IControlGroupAttrs;

  /** Right-justified content in relation to Input component  */
  contentRight?: m.Children;

  /** Left-justified content in relation to Input component  */
  contentLeft?: m.Children;

  /** Initial query value (uncontrolled mode) */
  defaultQuery?: string;

  /** Toggles search input */
  filterable?: boolean;

  /** Callback invoked on input query change; only called when `query` is defined */
  onQueryChange?: (query: string) => void;

  /** Input query value (controlled mode) */
  query?: string;
}

export interface IQueryableAttrs<T> extends IAttrs {
  /** Current index position (controlled mode)  */
  activeIndex?: number;

  // TODO: explain chached items

  /**
   * When true, mutating the `items` array (i.e. via Array.push())
   * If false, items will be filtered on every redraw
   * via itemPredicate or itemListPredicate is specified. If true, items will be "cached"
   * on query change
   */
  cacheItems?: boolean;

  /** Wether to show a checkmark for selected item(s) */
  checkmark?: boolean;

  /** Initial active index (uncontrolled mode)  */
  defaultActiveIndex?: number;

  /**
   * Content rendered when input query is empty. If defined, items will only be rendered
   * when a search query is provided.
   */
  initialContent?: m.Children;

  /** Attrs passed through to Input component. */
  inputAttrs?: IInputAttrs;

  /**
   * Custom render function for the entire list. If undefined, returns a List
   * component that calls `itemRender` for each item.
   */

  itemListRender?: (items: T[]) => m.Vnode;

  /** Predicate function used to filter all items. */
  itemListPredicate?: (query: string, items: T[]) => T[];

  /** Render function applied to each item  */
  itemRender: (item: T, index: number) => m.Vnode;

  /** Predicate function applied to filter individual items  */
  itemPredicate?: (query: string, item: T, index: number) => boolean;

  /** Array of T items */
  items: T[];

  /** Element(s) shown when input query returns empty */
  emptyContent?: m.Children;

  /** Callback invoked on active item change; only called when `activeIndex` is defined */
  onActiveItemChange?: (activeItem: T, index: number) => void;

  /** Callback invoked when child item is clicked */
  onSelect?: (item: T, e: Event, index: number) => void;

  /** Attrs passed through to List component */
  listAttrs?: IListAttrs;

  eventCallbacks?: (events: IQueryListEvents) => void;
}

export interface IQueryListAttrs<T> extends IQueryableAttrs<T>, IFilterableAttrs { }

export class QueryList<T> extends AbstractComponent<IQueryListAttrs<T>> {
  public filteredItems?: T[] = [];
  private activeIndex: number;
  private itemNodes: Array<m.Vnode<IListItemAttrs>>;
  private inputEl: HTMLElement;
  private query: string;
  private listEl: HTMLElement;

  public static ofType<T>() {
    return QueryList as new () => QueryList<T>;
  }

  public getDefaultAttrs() {
    return {
      cacheItems: true,
      checkmark: true,
      inputAttrs: {},
      listAttrs: {},
      filterable: true,
      controlGroupAttrs: {},
      emptyContent: 'No items available.'
    } as IQueryListAttrs<T>;
  }

  public oninit(vnode: m.Vnode<IQueryListAttrs<T>>) {
    super.oninit(vnode);

    this.query = this.attrs.defaultQuery || '';
    this.activeIndex = this.attrs.defaultActiveIndex || 0;
    this.setControlledAttrs();

    this.filteredItems = this.getFilteredItems();
  }

  public oncreate({ dom }: m.VnodeDOM<IQueryListAttrs<T>>) {
    this.listEl = dom.querySelector(`.${Classes.LIST}`);
    this.inputEl = dom.querySelector(`.${Classes.INPUT}`);

    this.scrollToActiveItem();
  }

  public onbeforeupdate(vnode: m.Vnode<IQueryListAttrs<T>>, old: m.VnodeDOM<IQueryListAttrs<T>>) {
    super.onbeforeupdate(vnode, old);
    this.setControlledAttrs();

    if (vnode.attrs.items !== old.attrs.items ||
      vnode.attrs.query !== old.attrs.query ||
      vnode.attrs.activeIndex !== old.attrs.activeIndex ||
      !vnode.attrs.cacheItems
    ) {
      this.filteredItems = this.getFilteredItems();
      this.scrollToActiveItem();
    }
  }

  public view() {
    const {
      activeIndex,
      cacheItems,
      checkmark,
      class: className,
      controlGroupAttrs,
      contentLeft,
      contentRight,
      emptyContent,
      eventCallbacks,
      filterable,
      initialContent,
      inputAttrs,
      itemPredicate,
      itemRender,
      items,
      listAttrs,
      onActiveItemChange,
      onSelect,
      query,
      onQueryChange,
      ...htmlAttrs
    } = this.attrs;

    const classes = classnames(
      Classes.QUERY_LIST,
      checkmark && Classes.QUERY_LIST_CHECKMARK,
      className
    );

    safeCall(eventCallbacks, { handleKeyDown: this.handleKeyDown });

    const innerContent = [
      filterable && this.renderControlGroup(),
      this.renderList()
    ];

    return m('', {
      ...htmlAttrs,
      class: classes,
      onkeydown: this.handleKeyDown,
      tabindex: 0
    }, innerContent);
  }

  private renderControlGroup() {
    const {
      inputAttrs,
      controlGroupAttrs,
      contentLeft,
      contentRight
    } = this.attrs;

    return m(ControlGroup, {
      ...this.attrs.controlGroupAttrs,
      class: classnames(Classes.FLUID, controlGroupAttrs.class)
    }, [
        contentLeft,

        m(Input, {
          placeholder: 'Search items...',
          ...inputAttrs,
          oninput: this.handleInput,
          contentRight: (this.query.length !== 0)
            ? m(Icon, {
              name: Icons.X,
              onclick: this.handleInputClear
            })
            : inputAttrs.contentRight,
          value: this.query
        }),

        contentRight
      ]);
  }

  private renderList() {
    const { listAttrs, emptyContent, initialContent } = this.attrs;
    this.itemNodes = this.filteredItems.map(this.renderItem);
    const isEmpty = this.filteredItems.length === 0;
    const hasInitialContent = initialContent && this.query === '';

    const classes = classnames(
      isEmpty && Classes.QUERY_LIST_EMPTY,
      hasInitialContent && Classes.QUERY_LIST_INITIAL,
      listAttrs.class
    );

    const emptyOrInitialContent = m(`.${Classes.QUERY_LIST_MESSAGE}`,
      (hasInitialContent && !isEmpty) && initialContent,
      isEmpty && emptyContent
    );

    const content = (hasInitialContent || isEmpty)
      ? emptyOrInitialContent
      : this.itemNodes;

    return m(List, {
      ...listAttrs,
      class: classes,
      onclick: this.handleSelect
    }, content);
  }

  private renderItem = (item: T, index: number) => {
    const { itemRender, checkmark, listAttrs } = this.attrs;
    const listItem = itemRender(item, index) as m.Vnode<IListItemAttrs>;

    listItem.attrs = listItem.attrs || {};

    if (this.activeIndex === index) {
      listItem.attrs.class = classnames(
        listItem.attrs.className,
        listItem.attrs.class,
        Classes.ACTIVE
      );
    }

    if (listItem.attrs.selected && checkmark) {
      listItem.attrs.contentLeft = m(Icon, {
        name: Icons.CHECK,
        size: listAttrs.size
      });
    }

    return listItem;
  }

  private setControlledAttrs() {
    if (this.attrs.query != null) {
      this.query = this.attrs.query;
    }

    if (this.attrs.activeIndex != null) {
      this.activeIndex = this.attrs.activeIndex;
    }
  }

  public scrollToActiveItem() {
    const activeEl = this.activeEl;

    if (this.listEl && activeEl) {
      const { offsetTop: activeTop, offsetHeight: activeHeight } = activeEl;

      const { scrollTop: listScrollTop, clientHeight: listHeight } = this.listEl;
      const activeBottomEdge = activeTop + activeHeight;
      const activeTopEdge = activeTop;

      if (activeBottomEdge >= listScrollTop + listHeight) {
        this.listEl.scrollTop = activeBottomEdge + activeHeight - listHeight;
      } else if (activeTopEdge <= listScrollTop) {
        this.listEl.scrollTop = activeTopEdge - activeHeight;
      }
    }
  }

  private get activeEl() {
    return this.listEl.children[this.activeIndex] as HTMLElement;
  }

  private get activeItem() {
    return this.filteredItems[this.activeIndex];
  }

  private updateQuery(text: string) {
    const { query, onQueryChange } = this.attrs;

    if (query != null) {
      safeCall(onQueryChange, text);
    } else this.query = text;
  }

  private handleInput = (e: Event) => {
    this.handleSearchDebounce(e);
    (e as any).redraw = false;
  }

  private handleSearchDebounce = debounce((e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    this.updateQuery(value);
    this.filteredItems = this.getFilteredItems();
    this.updateActiveIndex(0);
    m.redraw();
  }, 200);

  private handleInputClear = () => {
    this.updateQuery('');
    this.updateActiveIndex(0);
    this.filteredItems = this.getFilteredItems();
    this.scrollToActiveItem();

    if (this.inputEl) {
      this.inputEl.focus();
    }
  }

  private handleSelect = (e: Event) => {
    const { onSelect } = this.attrs;
    const target = e.target as HTMLElement;
    const listItemEl = getClosest(target, `.${Classes.LIST_ITEM}`);
    const actionsEl = getClosest(target, `.${Classes.LIST_ITEM_CONTENT_RIGHT}`);
    const isDisabled = listItemEl.classList.contains(Classes.DISABLED);

    if (listItemEl && !actionsEl && !isDisabled) {
      const index = Array.prototype.indexOf.call(this.listEl.children, listItemEl);
      const selectedItem = this.filteredItems[index];

      this.updateActiveIndex(index);

      if (selectedItem != null) {
        safeCall(onSelect, this.filteredItems[index], e, index);
      }
    } else (e as any).redraw = false;
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const key = e.keyCode;

    switch (key) {
      case Keys.ARROW_UP:
      case Keys.ARROW_DOWN:
        e.preventDefault();
        e.preventDefault();
        this.moveActiveIndex(key === Keys.ARROW_UP ? 'up' : 'down');
        m.redraw();
        break;
      case Keys.ESCAPE:
        if (this.query) {
          this.handleInputClear();
          m.redraw();
        }
        break;
      case Keys.ENTER:
        this.handleEnterKey(e);
        m.redraw();
        break;
      default:
        break;
    }

    (e as any).redraw = false;
  }

  private moveActiveIndex(direction: Direction) {
    const { activeIndex } = this;
    const index = getNextIndex(activeIndex, this.itemNodes, direction);

    this.updateActiveIndex(index);
    this.scrollToActiveItem();
  }

  private updateActiveIndex(index: number) {
    const { activeIndex, onActiveItemChange } = this.attrs;
    const currentIndex = index > this.filteredItems.length ? 0 : index;

    if (activeIndex != null) {
      safeCall(onActiveItemChange, this.activeItem, currentIndex);
    } else this.activeIndex = currentIndex;
  }

  private handleEnterKey(e: KeyboardEvent) {
    const item = this.activeItem;

    if (item) {
      safeCall(this.attrs.onSelect, item, e);
    }
  }

  private getFilteredItems() {
    const { items, itemPredicate, itemListPredicate } = this.attrs;

    if (isFunction(itemListPredicate)) {
      return itemListPredicate(this.query, items);
    }

    if (isFunction(itemPredicate)) {
      return items.filter((item, index) => itemPredicate(this.query, item, index));
    }

    return items;
  }
}

export function getNextIndex(currentIndex: number, vnodes: Array<m.Vnode<IListItemAttrs>>, direction: Direction) {
  const maxIndex = vnodes.length - 1;
  let index = currentIndex;
  let flag = true;

  while (flag) {
    index = direction === 'up'
      ? index === 0 ? maxIndex : index - 1
      : index === maxIndex ? 0 : index + 1;

    const attrs = vnodes[index].attrs;

    if (attrs && !attrs.disabled) {
      flag = false;
    }
  }

  return index;
}
