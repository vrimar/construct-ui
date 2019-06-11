import m from 'mithril';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import { AbstractComponent } from '../abstract-component';
import { QueryList, IQueryableAttrs, IQueryListEvents } from '../query-list';
import { Popover, IPopoverAttrs } from '../popover';
import { Input, IInputAttrs } from '../input';
import { Spinner } from '../spinner';
import { safeCall, Classes, getClosest, Keys } from '../../_shared';

export interface IInputSelectAttrs<T> extends IQueryableAttrs<T> {
  /**
   * Closes popover on item select
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Attrs passed through to Popover component
   * @default {}
   */
  popoverAttrs?: Partial<IPopoverAttrs>;

  /** Header content */
  header?: m.Children;

  /** Footer content */
  footer?: m.Children;

  /** Toggles loading state of inner list */
  loading?: boolean;

  /** Input value;  */
  value?: number | string;

  /**
   * Opens popover on input down key
   * @default true
   */
  openOnDownKey?: boolean;
}

export class InputSelect<T> extends AbstractComponent<IInputSelectAttrs<T>>  {
  private queryList = QueryList.ofType<T>();
  private isOpen: boolean;
  private query: string = '';
  private input: m.VnodeDOM<IInputAttrs>;
  private activeIndex: number = 0;
  private handleQueryListKeyDown: (e: KeyboardEvent) => void;

  public getDefaultAttrs() {
    return {
      closeOnSelect: true,
      popoverAttrs: {},
      inputAttrs: {},
      openOnDownKey: true
    } as IInputSelectAttrs<T>;
  }

  public static ofType<T>() {
    return InputSelect as new () => InputSelect<T>;
  }

  public oninit(vnode: m.Vnode<IInputSelectAttrs<T>>) {
    super.oninit(vnode);
    const { isOpen, defaultIsOpen } = vnode.attrs.popoverAttrs!;

    this.isOpen = isOpen != null ? isOpen : defaultIsOpen != null ? defaultIsOpen : false;
  }

  public onbeforeupdate(vnode: m.Vnode<IInputSelectAttrs<T>>, old: m.VnodeDOM<IInputSelectAttrs<T>>) {
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
      popoverAttrs,
      header,
      footer,
      closeOnSelect,
      loading,
      inputAttrs,
      value,
      openOnDownKey,
      ...queryListAttrs
    } = this.attrs;

    const queryList = m(this.queryList, {
      ...queryListAttrs,
      activeIndex: this.activeIndex,
      onActiveItemChange: this.handleActiveItemChange,
      eventCallbacks: (events: IQueryListEvents) =>
        this.handleQueryListKeyDown = events.handleKeyDown,
      filterable: false,
      query: this.query,
      onSelect: this.handleSelect
    });

    this.input = m(Input, {
      ...inputAttrs,
      oninput: this.handleInput,
      onkeydown: this.handleInputKeyDown,
      value: this.isOpen ? this.query : value,
      onfocus: this.handleInputFocus,
      placeholder: this.isOpen ? value : ''
    }) as m.VnodeDOM;

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
      position: 'bottom-start',
      closeOnEscapeKey: false,
      ...popoverAttrs,
      autofocus: false,
      restoreFocus: false,
      closeOnOutsideClick: false,
      class: classnames(Classes.INPUT_SELECT, className),
      isOpen: this.isOpen,
      content,
      onClosed: this.handlePopoverClosed,
      onInteraction: this.handlePopoverInteraction,
      trigger: this.input
    });
  }

  private handleInput = (e: Event) => {
    this.handleSearchDebounce(e);
    (e as any).redraw = false;
  }

  private handleInputFocus = (e: Event) => {
    this.isOpen = true;
    safeCall(this.attrs.inputAttrs!.onfocus, e);
  }

  private handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.which === Keys.ARROW_DOWN && this.attrs.openOnDownKey) {
      this.isOpen = true;
      m.redraw();
    } else if (e.which === Keys.TAB || e.which === Keys.ESCAPE) {
      this.isOpen = false;
      m.redraw();
    }

    if (this.isOpen) {
      this.handleQueryListKeyDown(e);
    }

    safeCall(this.attrs.inputAttrs!.onkeydown, e);
    (e as any).redraw = false;
  }

  private handleSearchDebounce = debounce((e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    this.query = value;
    this.activeIndex = 0;
    safeCall(this.attrs.inputAttrs!.oninput, e);
    m.redraw();
  }, 200);

  private handleActiveItemChange = (activeItem: T, index: number) => {
    this.activeIndex = index;
    safeCall(this.attrs.onActiveItemChange, activeItem, index);
  }

  private handleSelect = (item: T, e: Event) => {
    const { onSelect, closeOnSelect } = this.attrs;

    if (closeOnSelect) {
      this.isOpen = false;
      this.inputEl.blur();
    } else {
      this.inputEl.focus();
    }

    safeCall(onSelect, item, e);
  }

  private handlePopoverInteraction = (nextOpenState: boolean, e: Event) => {
    const isClickOnInput = getClosest(e.target, `.${Classes.INPUT}`);

    if (!isClickOnInput) {
      this.isOpen = false;
    }

    safeCall(this.attrs.popoverAttrs!, nextOpenState, e);
  }

  private handlePopoverClosed = () => {
    this.query = '';
    safeCall(this.attrs.popoverAttrs!.onClosed);
  }

  private get inputEl() {
    return this.input.dom &&
      this.input.dom.querySelector('input') as HTMLInputElement;
  }
}
