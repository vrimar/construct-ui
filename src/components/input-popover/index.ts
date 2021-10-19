import m from 'mithril';
import classnames from 'classnames';
import { AbstractComponent } from '../abstract-component';
import { IInputAttrs, Input } from '../input';
import { IButtonAttrs, Button } from '../button';
import { IPopoverAttrs, Popover } from '../popover';
import { TextArea } from '../text-area';
import { Classes, safeCall, Keys, getClosest } from '../../_shared';

export interface IInputPopoverAttrs extends Omit<IPopoverAttrs, 'content'> {
  /**
   * Attrs passed through to wrapper container
   * @default {}
   */
  contentAttrs?: any;

  /** Initial value to display */
  value?: string;

  /** Elements added before content */
  header?: m.Children;

  /** Elements added after content */
  footer?: m.Children;

  /** Whether to highlight input text on open */
  hightlightOnOpen?: boolean;

  /**
   * Attrs passed through to input/textarea element
   * @default {}
   */
  inputAttrs?: IInputAttrs;

  /**
   * Type of input to render
   * @default 'input'
   */
  type?: 'input' | 'textarea';

  /** Placeholder value for input  */
  placeholder?: string;

  /**
   * Callback invoked when submit button is clicked
   * (or if type="input", submitOnEnter="true" and ENTER key is pressed)
   */
  onSubmit: (value: string) => void;

  /**
   * Attrs passed through to submit button
   * @default {}
   */
  submitButtonAttrs?: IButtonAttrs;

  /**
   * Label for submit button
   * @default 'Submit'
   */
  submitButtonLabel?: m.Children;

  /**
   * Whether onSubmit is called on ENTER key
   * Note: only applies to type="input" element
   * @default true
   */
  submitOnEnter?: boolean;
}

export class InputPopover extends AbstractComponent<IInputPopoverAttrs> {
  private value: string;

  public getDefaultAttrs() {
    return {
      contentAttrs: {},
      inputAttrs: {},
      submitButtonAttrs: {},
      submitButtonLabel: 'Submit',
      type: 'input'
    } as IInputPopoverAttrs;
  }

  public oninit(vnode: m.Vnode<IInputPopoverAttrs>) {
    super.oninit(vnode);
    this.value = vnode.attrs.value || '';
  }

  public view() {
    const {
      class: className,
      value,
      header,
      contentAttrs,
      footer,
      inputAttrs,
      onSubmit,
      submitButtonAttrs,
      submitButtonLabel,
      placeholder,
      type,
      ...popoverAttrs
    } = this.attrs;

    return m(Popover, {
      class: classnames(
        Classes.INPUT_POPOVER,
        className
      ),
      autofocus: true,
      ...popoverAttrs,
      content: m(`.${Classes.INPUT_POPOVER_CONTENT}`, {
        ...contentAttrs,
        onkeydown: this.handleOnKeyDown
      }, [
        header,
        this.renderInput(),
        m(Button, {
          class: Classes.POPOVER_DISSMISS,
          fluid: true,
          intent: 'primary',
          label: submitButtonLabel,
          onclick: this.handleOnSubmit,
          ...submitButtonAttrs
        }),
        footer
      ]),
      onClosed: this.handleOnClosed,
      onOpened: this.handleOnOpened
    });
  }

  private renderInput() {
    const { type, inputAttrs, placeholder } = this.attrs;
    const component = type === 'textarea' ? TextArea : Input;

    console.log(this.value);

    return m(component, {
      autofocus: true,
      rows: 5,
      fluid: true,
      value: this.value,
      onkeyup: (e: Event) => this.value = (e.target as HTMLInputElement).value,
      placeholder,
      ...inputAttrs
    });
  }

  private handleOnKeyDown = (e: KeyboardEvent) => {
    const { type, submitOnEnter } = this.attrs;

    if (e.which === Keys.ENTER && type === 'input' && submitOnEnter) {
      const contentEl = getClosest(e.target, `.${Classes.INPUT_POPOVER_CONTENT}`)!;
      const submitBtnEl = contentEl.querySelector(`.${Classes.POPOVER_DISSMISS}`) as HTMLElement;
      submitBtnEl.click();

      m.redraw();
    }

    (e as any).redraw = false;
  }

  private handleOnSubmit = (e: Event) => {
    const { submitButtonAttrs } = this.attrs;
    this.attrs.onSubmit(this.value);
    safeCall(submitButtonAttrs!.onclick, e);
  }

  private handleOnOpened = (content: HTMLElement) => {
    const { type, hightlightOnOpen, onOpened } = this.attrs;
    this.value = this.attrs.value || '';

    if (hightlightOnOpen) {
      const inputEl = content.querySelector(type!) as HTMLInputElement;
      requestAnimationFrame(() => inputEl.select());
    }

    safeCall(onOpened);
  }

  private handleOnClosed = () => {
    const { onClosed } = this.attrs;

    safeCall(onClosed);
  }
}
