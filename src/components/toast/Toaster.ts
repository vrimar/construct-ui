import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, safeCall } from '../../_shared';
import { AbstractComponent } from '../abstract-component';
import { IToastAttrs, Toast } from './Toast';
import { Overlay } from '../overlay';

export type IToastOptions = IToastAttrs & { key?: string };

export const ToasterPosition = {
  TOP: 'top' as 'top',
  TOP_START: 'top-start' as 'top-start',
  TOP_END: 'top-end' as 'top-end',
  BOTTOM: 'bottom' as 'bottom',
  BOTTOM_START: 'bottom-start' as 'bottom-start',
  BOTTOM_END: 'bottom-end' as 'bottom-end'
};

export type ToasterPosition = typeof ToasterPosition[keyof typeof ToasterPosition];

export interface IToaster {
  /** Show toast */
  show(attrs: IToastAttrs): string;

  /** Update toast attrs by key */
  update(key: string, attrs: IToastAttrs): void;

  /** Dismiss toast by key */
  dismiss(key: string): void;

  /** Clear all toasts */
  clear(): void;

  /** Get array of toasts */
  getToasts(): IToastOptions[];
}

export interface IToasterAttrs extends IAttrs {
  /**
   *  Clears all toasts on ESCAPE key
   * @default true
   */
  clearOnEscapeKey?: boolean;

  /** Renders component relative to parent container */
  inline?: boolean;

  /**
   * Position of each toast item
   * @default 'top'
   */
  position?: ToasterPosition;

  /** Array of `Toast` items when used in declarative mode */
  toasts?: m.Vnode<IToastAttrs, any>[];
}

export class Toaster extends AbstractComponent<IToasterAttrs> {
  private toasts: IToastOptions[] = [];
  private toastId: number = 0;

  public getDefaultAttrs() {
    return {
      clearOnEscapeKey: true,
      position: 'top'
    } as IToasterAttrs;
  }

  public view() {
    const {
      class: className,
      position,
      inline,
      toasts,
      clearOnEscapeKey,
      style
    } = this.attrs;

    const classes = classnames(
      Classes.TOASTER,
      `${Classes.TOASTER}-${position}`,
      inline && Classes.TOASTER_INLINE,
      className
    );

    const renderedToasts = this.isControlled()
      ? toasts || []
      : this.toasts.map(toastOptions => this.renderToast(toastOptions));

    return m(Overlay, {
      closeOnEscapeKey: clearOnEscapeKey,
      closeOnOutsideClick: false,
      class: classes,
      content: renderedToasts,
      hasBackdrop: false,
      inline,
      isOpen: renderedToasts.length > 0,
      transitionDuration: 0,
      addToStack: false,
      onClose: () => this.clear(),
      style
    });
  }

  public onremove() {
    this.clear();
  }

  public show(attrs: IToastAttrs) {
    const toastOptions = { ...attrs, key: `cui-toast-${this.toastId++}` };
    this.toasts.push(toastOptions);
    m.redraw();
    return toastOptions.key;
  }

  public update(key: string | number, attrs: IToastOptions) {
    const index = this.toasts.findIndex(x => x.key === key);

    this.toasts[index] = {
      ...this.toasts[index],
      ...attrs
    };

    m.redraw();
  }

  public dismiss = (key: string | number, timedOut: boolean = false) => {
    const index = this.toasts.findIndex(x => x.key === key);
    const toast = this.toasts[index];

    if (toast) {
      safeCall(toast.onDismiss, timedOut);
      this.toasts.splice(index, 1);
    }

    m.redraw();
  };

  public clear() {
    this.toasts.map((x) => safeCall(x.onDismiss, false));
    this.toasts.length = 0;
    m.redraw();
  }

  public getToasts() {
    return this.toasts;
  }

  private renderToast(attrs: IToastOptions) {
    return m(Toast, { ...attrs, onDismiss: this.dismiss });
  }

  private isControlled() {
    return this.attrs.toasts != null;
  }
}
