import classnames from 'classnames';
import m from 'mithril';
import { Classes, IAttrs, safeCall, Keys, getScrollbarWidth } from '../../_shared';
import { AbstractComponent } from '../abstract-component';
import { Portal, IPortalAttrs } from '../portal';

export interface IOverlayableAttrs {
  /** Class added to backdrop element */
  backdropClass?: string;

  /** Whether component can be closed on outer click */
  closeOnOutsideClick?: boolean;

  /** Whether component can be closed on Escape key */
  closeOnEscapeKey?: boolean;

  /** Whether to show backdrop element */
  hasBackdrop?: boolean;

  /** Renders component relative to parent container */
  inline?: boolean;

  /** Callback invoked on initial close */
  onClose?: (e: Event) => void;

  /** Callback invoked after transition is complete and component is unmounted */
  onClosed?: () => void;

  /** Callback invoked when component mounts and transition is complete */
  onOpened?: () => void;

  /** Sets focus to first element that has a `autofocus` or `tabindex` attribute */
  autofocus?: boolean;

  /** Wether last active element should be focused on close  */
  restoreFocus?: boolean;

  /**
   * Wether overlay should be added to the "open" stack.
   * When <code>true</code>, overlays will be stacked on top of one another
   * and will close in sequence.
   */
  addToStack?: boolean;

  /** Attrs passed through to the Portal component */
  portalAttrs?: IPortalAttrs;

  /**
   * Name of transition. The name is used to apply CSS transition classes on open and close.
   * On open, ${name}-enter and ${name}-enter-active are added. On close, ${name}-exit
   * and ${name}-exit-active are added.
   */
  transitionName?: string;

  /**
   * Duration of the animation. Note: the CSS transition duration must match the
   * custom duration passed to this component
   */
  transitionDuration?: number;
}

export interface IOverlayAttrs extends IOverlayableAttrs, IAttrs {
  /** Inner content */
  content?: m.Children;

  /** Toggles overlay visibility */
  isOpen?: boolean;
}

let instanceCounter = 0;

export class Overlay extends AbstractComponent<IOverlayAttrs> {
  private id: number = instanceCounter++;
  private shouldRender: boolean = false;
  private contentEl: HTMLElement;
  private lastActiveElement: HTMLElement;
  private scrollbarWidth: number;

  private static openStack: number[] = [];
  private static getLastOpened = () => Overlay.openStack[Overlay.openStack.length - 1];

  public getDefaultAttrs() {
    return {
      closeOnEscapeKey: true,
      closeOnOutsideClick: true,
      hasBackdrop: true,
      addToStack: true,
      restoreFocus: true,
      transitionName: 'fade',
      transitionDuration: 200
    };
  }

  public oninit(vnode: m.Vnode<IOverlayAttrs>) {
    super.oninit(vnode);
    this.shouldRender = vnode.attrs.isOpen;
  }

  public oncreate() {
    this.scrollbarWidth = getScrollbarWidth();
  }

  public onbeforeupdate(vnode: m.Vnode<IOverlayAttrs>, old: m.VnodeDOM<IOverlayAttrs>) {
    super.onbeforeupdate(vnode, old);
    const { isOpen, transitionDuration } = vnode.attrs;
    const wasOpen = old.attrs.isOpen;

    if (isOpen && !wasOpen) {
      this.clearTimeouts();
      this.shouldRender = true;
    } else if (!isOpen && wasOpen) {
      if (transitionDuration > 0) {
        this.handleClose();
        this.setTimeout(() => {
          this.shouldRender = false;
          m.redraw();
          this.handleClosed();
        }, transitionDuration);
      } else {
        this.shouldRender = false;
        this.handleClose();
        this.handleClosed();
      }
    }
  }

  public onremove() {
    this.handleClose();
    this.handleClosed();
  }

  public view() {
    const {
      backdropClass,
      hasBackdrop,
      content,
      inline,
      class: className,
      style,
      portalAttrs
    } = this.attrs;

    if (!this.shouldRender) {
      return null;
    }

    const innerContent = [
      hasBackdrop && m('', {
        class: classnames(Classes.OVERLAY_BACKDROP, backdropClass),
        onmousedown: this.handleBackdropMouseDown,
        tabindex: 0
      }),
      content
    ];

    const classes = classnames(
      Classes.OVERLAY,
      inline && Classes.OVERLAY_INLINE,
      className
    );

    const container = m('', {
      class: classes,
      style,
      oncreate: this.onContainerCreate,
      onupdate: this.onContainerUpdate
    }, innerContent);

    return inline ? container : m(Portal, { ...portalAttrs }, container);
  }

  private onContainerCreate = ({ dom }: m.VnodeDOM) => {
    if (this.shouldRender) {
      this.handleOpen(dom as HTMLElement);
    }
  }

  private onContainerUpdate = ({ dom }: m.VnodeDOM) => {
    const isOpen = this.attrs.isOpen;
    const wasOpen = this.prevAttrs.isOpen;

    if (isOpen && !wasOpen) {
      this.handleOpen(dom as HTMLElement);
    } else if (!isOpen && wasOpen) {
      this.handleClose();
    }
  }

  private handleOpen(contentEl: HTMLElement) {
    const {
      addToStack,
      closeOnOutsideClick,
      closeOnEscapeKey,
      hasBackdrop,
      onOpened,
      inline
    } = this.attrs;

    this.contentEl = contentEl;

    if (addToStack) {
      Overlay.openStack.push(this.id);
    }

    if (closeOnOutsideClick && !hasBackdrop) {
      document.addEventListener('mousedown', this.handleDocumentMouseDown);
    }

    if (closeOnEscapeKey) {
      document.addEventListener('keydown', this.handleKeyDown);
    }

    if (hasBackdrop && !inline) {
      document.body.classList.add(Classes.OVERLAY_OPEN);
      document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    }

    this.handleEnterTransition();
    safeCall(onOpened);
    this.handleFocus();
  }

  private handleClose() {
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    document.removeEventListener('keydown', this.handleKeyDown);

    this.handleExitTransition();
  }

  private handleClosed() {
    const { restoreFocus, onClosed, hasBackdrop, inline } = this.attrs;

    if (this.attrs.addToStack) {
      Overlay.openStack = Overlay.openStack.filter(id => id !== this.id);
    }

    if (this.lastActiveElement && restoreFocus) {
      window.requestAnimationFrame(() => this.lastActiveElement.focus());
    }

    if (hasBackdrop && !inline) {
      document.body.classList.remove(Classes.OVERLAY_OPEN);
      document.body.style.paddingRight = null;
    }

    safeCall(onClosed);
  }

  private handleEnterTransition() {
    const { transitionName, transitionDuration } = this.attrs;
    const el = this.contentEl;

    if (el == null || transitionDuration === 0) return;

    el.classList.remove(`${transitionName}-exit`);
    el.classList.remove(`${transitionName}-exit-active`);
    el.classList.add(`${transitionName}-enter`);

    // tslint:disable-next-line:no-unused-expression
    el.scrollTop;

    el.classList.add(`${transitionName}-enter-active`);
  }

  private handleExitTransition() {
    const { transitionDuration, transitionName } = this.attrs;
    const el = this.contentEl;

    if (el == null || transitionDuration === 0) return;

    el.classList.remove(`${transitionName}-enter`);
    el.classList.remove(`${transitionName}-enter-active`);
    el.classList.add(`${transitionName}-exit`);

    // tslint:disable-next-line:no-unused-expression
    el.scrollTop;

    el.classList.add(`${transitionName}-exit-active`);
  }

  private handleFocus() {
    this.lastActiveElement = document.activeElement as HTMLElement;
    const contentEl = this.contentEl;
    const { isOpen, autofocus } = this.attrs;

    if (!contentEl || !document.activeElement || !isOpen || !autofocus) {
      return;
    }

    window.requestAnimationFrame(() => {
      const isFocusOutsideOverlay = !contentEl.contains(document.activeElement);

      if (isFocusOutsideOverlay) {
        const autofocusEl = contentEl.querySelector('[autofocus]') as HTMLElement;
        const tabIndexEl = contentEl.querySelector('[tabindex]') as HTMLElement;

        if (autofocusEl) {
          autofocusEl.focus();
        } else if (tabIndexEl) {
          tabIndexEl.focus();
        }
      }
    });
  }

  private handleBackdropMouseDown = (e: Event) => {
    const { closeOnOutsideClick, onClose } = this.attrs;

    if (closeOnOutsideClick) {
      safeCall(onClose, e);
    } else (e as any).redraw = false;
  }

  private handleDocumentMouseDown = (e: MouseEvent) => {
    const { isOpen, onClose, closeOnOutsideClick } = this.attrs;
    const contentEl = this.contentEl;
    const isClickOnOverlay = contentEl && contentEl.contains(e.target as HTMLElement);

    if (isOpen && closeOnOutsideClick && !isClickOnOverlay && this.lastOpened) {
      safeCall(onClose, e);
      m.redraw();
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const { closeOnEscapeKey, onClose } = this.attrs;

    if (e.which === Keys.ESCAPE && closeOnEscapeKey && this.lastOpened) {
      safeCall(onClose, e);
      e.preventDefault();
      m.redraw();
    }
  }

  private get lastOpened() {
    return this.attrs.addToStack ? Overlay.getLastOpened() === this.id : true;
  }
}
