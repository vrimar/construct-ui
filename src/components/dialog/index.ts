import m from 'mithril';
import classnames from 'classnames';
import { AbstractComponent } from '../abstract-component';
import { IAttrs, Classes, safeCall, getClosest } from '../../_shared';
import { Overlay, IOverlayableAttrs } from '../overlay';
import { Button } from '../button';
import { Icons } from '../icon';

export interface IDialogAttrs extends IOverlayableAttrs, IAttrs {
  /** Wether closed button is present in header */
  hasCloseButton?: boolean;

  /** Toggles visibility */
  isOpen?: boolean;

  /** Title of dialog */
  title?: string;

  /** Inner content */
  content?: m.Children;

  /** Footer content */
  footer?: m.Children;
}

export class Dialog extends AbstractComponent<IDialogAttrs> {
  public getDefaultAttrs() {
    return {
      hasCloseButton: true,
      closeOnOutsideClick: true
    };
  }

  public view() {
    const {
      onClose,
      hasCloseButton,
      class: className,
      footer,
      content,
      style,
      title,
      ...otherAttrs
    } = this.attrs;

    const closeButton = m(Button, {
      class: Classes.DIALOG_CLOSE_BUTTON,
      basic: true,
      iconLeft: Icons.X,
      onclick: onClose ? (e: Event) => onClose(e) : undefined
    });

    const header = m('', { class: Classes.DIALOG_HEADER }, [
      m('h4', title),
      hasCloseButton && closeButton
    ]);

    const innerContent = m('', { class: Classes.DIALOG_CONTENT }, [
      title && header,
      m('', { class: Classes.DIALOG_BODY }, content),
      footer && m('', { class: Classes.DIALOG_FOOTER }, footer)
    ]);

    const container = m('', {
      class: classnames(Classes.DIALOG, className),
      onclick: this.handleContainerClick,
      style
    }, innerContent);

    return m(Overlay, {
      ...otherAttrs,
      onClose,
      content: container
    });
  }

  private handleContainerClick = (e: Event) => {
    const { closeOnOutsideClick, onClose } = this.attrs;
    const target = e.target as HTMLElement;
    const isClickOutsideDialog = getClosest(target, `.${Classes.DIALOG_CONTENT}`) == null;

    if (isClickOutsideDialog && closeOnOutsideClick) {
      safeCall(onClose);
    } else (e as any).redraw = false;
  }
}
