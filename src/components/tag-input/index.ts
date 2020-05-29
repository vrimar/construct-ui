import m from 'mithril';
import classnames from 'classnames';
import { IAttrs, ISizeAttrs, IIntentAttrs, Classes, safeCall, Keys } from '../../_shared';
import { ITagAttrs } from '../tag';
import { AbstractComponent } from '../abstract-component';
import { IInputAttrs } from '../input';

export interface ITagInputAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Triggers onAdd when input loses focus  */
  addOnBlur?: boolean;

  /**
   * Array of Tag components
   * @default []
   */
  tags: m.Vnode<ITagAttrs, any>[];

  /** Left-justified content */
  contentLeft?: m.Child;

  /** Right-justified content */
  contentRight?: m.Child;

  /** Disables interaction */
  disabled?: boolean;

  /** Fills width of parent container */
  fluid?: boolean;

  /**
   * Attrs passed through to input
   * @default {}
   */
  inputAttrs?: IInputAttrs;

  /** Function invoked when new tag is added (via enter key or addOnBlur) */
  onAdd?: (value: string, e: Event) => void;

  [htmlAttrs: string]: any;
}

export class TagInput extends AbstractComponent<ITagInputAttrs> {
  private isActive: boolean;
  private inputEl: HTMLInputElement;

  public getDefaultAttrs() {
    return {
      tags: [],
      inputAttrs: {}
    } as ITagInputAttrs;
  }

  public oncreate({ dom }: m.VnodeDOM<ITagInputAttrs>) {
    this.inputEl = dom.querySelector('input')!;
  }

  public view() {
    const {
      class: className,
      contentLeft,
      contentRight,
      disabled,
      fluid,
      intent,
      inputAttrs,
      size,
      tags,
      ...htmlAttrs
    } = this.attrs;

    const classes = classnames(
      Classes.TAG_INPUT,
      this.isActive && Classes.ACTIVE,
      disabled && Classes.DISABLED,
      fluid && Classes.FLUID,
      intent && `cui-${intent}`,
      size && `cui-${size}`,
      className
    );

    const input = m('input', {
      disabled,
      ...inputAttrs,
      onfocus: this.handleInputFocus,
      onblur: this.handleInputBlur,
      onkeydown: this.handleInputKeyDown
    });

    const content = [
      contentLeft,
      m(`.${Classes.TAG_INPUT_VALUES}`, tags, input),
      contentRight
    ];

    return m('', {
      ...htmlAttrs,
      class: classes,
      onclick: this.handleContentClick
    }, content);
  }

  private handleContentClick = (e: Event) => {
    const { disabled } = this.attrs;

    if (disabled) {
      return;
    }

    if (this.inputEl) {
      this.inputEl.focus();
    }

    safeCall(this.attrs.onclick, e);
  }

  private handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.which === Keys.ENTER) {
      this.handleOnAdd(e);
    }

    safeCall(this.attrs.inputAttrs!.onkeydown, e);
  }

  private handleInputFocus = (e: FocusEvent) => {
    this.isActive = true;
    safeCall(this.attrs.inputAttrs!.onfocus, e);
  }

  private handleInputBlur = (e: FocusEvent) => {
    const { addOnBlur, inputAttrs } = this.attrs;

    this.isActive = false;

    if (addOnBlur) {
      this.handleOnAdd(e);
    }

    safeCall(inputAttrs!.onblur, e);
  }

  private handleOnAdd(e: Event) {
    const value = this.inputEl.value;

    if (value) {
      safeCall(this.attrs.onAdd, this.inputEl.value, e);
      this.inputEl.value = '';
    }
  }
}
