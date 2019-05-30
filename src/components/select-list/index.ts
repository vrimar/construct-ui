import m from 'mithril';
import classnames from 'classnames';
import { Classes, safeCall } from '../../_shared';
import { Popover, IPopoverAttrs } from '../popover';
import { AbstractComponent } from '../abstract-component';
import { Spinner } from '../spinner';
import { QueryList, IQueryListAttrs } from '../query-list';

export interface ISelectListAttrs<T> extends IQueryListAttrs<T> {
  /**
   * Closes popover on item select
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Attrs passed through to Popover component
   * @default {}
   */
  popoverAttrs?: IPopoverAttrs;

  /** Trigger element */
  trigger: m.Vnode<any, any>;

  /** Header content */
  header?: m.Children;

  /** Footer content */
  footer?: m.Children;

  /** Toggles loading state of inner list */
  loading?: boolean;
}

export class SelectList<T> extends AbstractComponent<ISelectListAttrs<T>> {
  public queryList = QueryList.ofType<T>();
  private isOpen: boolean;
  private activeIndex: number = 0;

  public static ofType<T>() {
    return SelectList as new () => SelectList<T>;
  }

  public getDefaultAttrs() {
    return {
      closeOnSelect: true,
      popoverAttrs: {},
      inputAttrs: {}
    } as ISelectListAttrs<T>;
  }

  public oninit(vnode: m.Vnode<ISelectListAttrs<T>>) {
    super.oninit(vnode);
    const { isOpen, defaultIsOpen } = vnode.attrs.popoverAttrs!;

    this.isOpen = isOpen != null ? isOpen : defaultIsOpen != null ? defaultIsOpen : false;
  }

  public onbeforeupdate(vnode: m.Vnode<ISelectListAttrs<T>>, old: m.VnodeDOM<ISelectListAttrs<T>>) {
    super.onbeforeupdate(vnode, old);
    const isOpen = vnode.attrs.popoverAttrs!.isOpen;
    const wasOpen = old.attrs.popoverAttrs!.isOpen;

    if (isOpen && !wasOpen) {
      this.isOpen = true;
    } else if (!isOpen && wasOpen) {
      this.isOpen = false;
    }
  }

  public view() {
    const {
      class: className,
      popoverAttrs = {},
      header,
      footer,
      trigger,
      closeOnSelect,
      loading,
      ...queryListAttrs
    } = this.attrs;

    const queryList = m(this.queryList, {
      activeIndex: this.activeIndex,
      onActiveItemChange: this.handleActiveItemChange,
      ...queryListAttrs,
      inputAttrs: {
        ...queryListAttrs.inputAttrs,
        autofocus: true
      },
      onSelect: this.handleSelect
    });

    const content = [
      header,
      m(Spinner, {
        active: loading,
        background: true,
        fill: true
      }),
      queryList,
      footer
    ];

    return m(Popover, {
      autofocus: true,
      position: 'bottom-start',
      closeOnEscapeKey: false,
      ...popoverAttrs,
      class: classnames(Classes.SELECT_LIST, className, popoverAttrs.class),
      isOpen: this.isOpen,
      content,
      onInteraction: this.handlePopoverInteraction,
      trigger
    });
  }

  private handleActiveItemChange = (activeItem: T, index: number) => {
    this.activeIndex = index;
    safeCall(this.attrs.onActiveItemChange, activeItem, index);
  }

  private handleSelect = (item: T, e: Event, index: number) => {
    const { onSelect, closeOnSelect } = this.attrs;

    if (closeOnSelect) {
      this.isOpen = false;
    }

    safeCall(onSelect, item, e, index);
  }

  private handlePopoverInteraction = (nextOpenState: boolean, e: Event) => {
    const { isOpen, onInteraction } = this.attrs.popoverAttrs!;

    if (isOpen != null) {
      safeCall(onInteraction, nextOpenState, e);
    } else this.isOpen = nextOpenState;
  }
}
