import m from 'mithril';
import classnames from 'classnames';
import { AbstractComponent } from '../abstract-component';
import { IOption, IAttrs, ISizeAttrs, Classes, safeCall, Keys, Option } from '../../_shared';
import { SelectList } from '../select-list';
import { ListItem } from '../list';
import { Button, IButtonAttrs } from '../button';
import { Icons } from '../icon';

export interface ICustomSelectAttrs extends IAttrs, ISizeAttrs {
  /** Initially selected value (uncontrolled mode) */
  defaultValue?: string | number;

  /**
   * Array of list options
   * @default []
   */
  options: Option[];

  /** Value of the selected option */
  value?: string | number;

  /** Callback invoked when selection changes */
  onSelect?: (option: Option) => void;

  /**
   * Attrs passed through to trigger
   * @default {}
   */
  triggerAttrs?: IButtonAttrs;

  /** Name attr of hidden input (useful for HTML forms) */
  name?: string;
}

export class CustomSelect extends AbstractComponent<ICustomSelectAttrs> {
  private activeIndex: number = 0;
  private selected: Option;
  private isOpen: boolean = false;

  public getDefaultAttrs() {
    return {
      options: [],
      triggerAttrs: {}
    } as ICustomSelectAttrs;
  }

  public oninit(vnode: m.Vnode<ICustomSelectAttrs>) {
    super.oninit(vnode);

    this.setSelected();
  }

  public onbeforeupdate(vnode: m.Vnode<ICustomSelectAttrs>, old: m.VnodeDOM<ICustomSelectAttrs>) {
    super.onbeforeupdate(vnode, old);

    if (vnode.attrs.value !== old.attrs.value) {
      this.setSelected();
    }
  }

  public view() {
    const { options, class: className, name, triggerAttrs } = this.attrs;

    const classes = classnames(
      Classes.CUSTOM_SELECT,
      className
    );

    const hiddenContainer = m(`.${Classes.CUSTOM_SELECT_HIDDEN}`, [
      m('input', {
        class: Classes.CUSTOM_SELECT_INPUT,
        value: this.selectedValue,
        name
      })
    ]);

    const trigger = m(Button, {
      class: Classes.CUSTOM_SELECT_TRIGGER,
      compact: true,
      label: [
        hiddenContainer,
        this.selectedLabel
      ],
      iconRight: Icons.CHEVRON_DOWN,
      ...triggerAttrs,
      onkeydown: this.handleTriggerKeyDown
    });

    const selectList = m(SelectList, {
      filterable: false,
      items: options,
      checkmark: false,
      itemRender: this.renderItem,
      activeIndex: this.activeIndex,
      closeOnSelect: false,
      onActiveItemChange: this.handleActiveItemChange,
      popoverAttrs: {
        isOpen: this.isOpen,
        hasArrow: false,
        position: 'bottom',
        inline: true,
        boundariesEl: 'scrollParent',
        transitionDuration: 0,
        closeOnEscapeKey: true,
        onInteraction: this.handlePopoverInteraction
      },
      onSelect: this.handleSelect,
      trigger
    });

    return m('', { class: classes }, selectList);
  }

  private renderItem = (item: Option) => {
    const label = typeof (item) === 'object' ? item.label : item;
    const value = typeof (item) === 'object' ? item.value : item;
    const attrs = typeof (item) === 'object' ? item : {};

    return m(ListItem, {
      ...attrs,
      selected: this.selectedValue === value,
      label
    });
  }

  private handleSelect = (item: Option) => {
    if ('value' in this.attrs) {
      safeCall(this.attrs.onSelect, item);
    } else this.selected = item;

    this.isOpen = false;
  }

  private handleActiveItemChange = (_activeItem: Option, index: number) => {
    this.activeIndex = index;
  }

  private handleTriggerKeyDown = (e: KeyboardEvent) => {
    const key = e.which;

    if (key === Keys.ARROW_UP || key === Keys.ARROW_DOWN) {
      e.preventDefault();
      const { options } = this.attrs;
      const index = this.attrs.options.indexOf(this.selected);
      const direction = key === Keys.ARROW_UP ? 'up' : 'down';
      const nextIndex = getNextIndex(index, options, direction);
      this.selected = options[nextIndex];
      this.activeIndex = nextIndex;
    }

    if (key === Keys.SPACE) {
      this.isOpen = true;
    }

    safeCall(this.attrs.triggerAttrs.onkeydown, e);
  }

  private handlePopoverInteraction = (nextOpenState: boolean) => {
    this.isOpen = nextOpenState;
  }

  private get selectedValue() {
    const selected = this.selected;
    return selected != null ? typeof selected === 'object' ? selected.value : selected : '';
  }

  private get selectedLabel() {
    const selected = this.selected;
    return selected != null ? typeof selected === 'object' ? selected.label : selected : undefined;
  }

  private setSelected() {
    const { options, value, defaultValue } = this.attrs;

    if (options.length) {
      const firstOption = options[0];
      const selectedValue = value || defaultValue || undefined;

      this.selected = typeof firstOption === 'object'
        ? (options as IOption[]).find(x => x.value === selectedValue)
        : selectedValue;

      const index = options.indexOf(this.selected);
      this.activeIndex = index;
    }
  }
}

type Direction = 'up' | 'down';

// TODO: Combine with QueryList getNextIndex
function getNextIndex(currentIndex: number, options: Option[], direction: Direction) {
  const maxIndex = options.length - 1;
  let index = currentIndex;
  let flag = true;

  while (flag) {
    index = direction === 'up'
      ? index === 0 ? maxIndex : index - 1
      : index === maxIndex ? 0 : index + 1;

    const option = options[index];

    if (typeof option === 'object' && !option.disabled) {
      flag = false;
    }
  }

  return index;
}
