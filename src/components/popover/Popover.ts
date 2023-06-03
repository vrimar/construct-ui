import m from 'mithril';
import classnames from 'classnames';
import { createPopper, StrictModifiers, Instance, Placement } from '@popperjs/core';
import { Classes, IAttrs, Style, safeCall, elementIsOrContains } from '../../_shared';
import { AbstractComponent } from '../abstract-component';
import { IOverlayableAttrs, Overlay } from '../overlay';
import { PopoverInteraction, PopoverPosition } from './popoverTypes';

export interface IPopoverAttrs extends IOverlayableAttrs, IAttrs {
  /**
   * Set the bounding box.
   * @default 'window'
   */
  boundariesEl?: 'window' | 'scrollParent' | Element;

  /** Close the popover on inner content click */
  closeOnContentClick?: boolean;

  /** Inner content */
  content: m.Children;

  /** Initial open when in uncontrolled mode */
  defaultIsOpen?: boolean;

  /**
   * Toggles arrow visiblity
   * @default true
   */
  hasArrow?: boolean;

  /**
   * Duration of close delay on hover interaction
   * @default 100
   */
  hoverCloseDelay?: number;

  /**
   * Duration of open delay on hover interaction
   * @default 0
   */
  hoverOpenDelay?: number;

  /**
   * Trigger interaction to toggle visiblity
   * @default 'click'
   */
  interactionType?: PopoverInteraction;

  /**
   * Toggles visibility;
   * Specifying this attr will place the Popover in controlled mode
   * and will invoke the `onInteraction` callback for each open/close state change
   */

  isOpen?: boolean;

  /**
   * Options to pass to the PopperJS instance;
   * see <a href="https://popper.js.org/docs/v2/modifiers/">HERE</a> for more details
   */
  modifiers?: StrictModifiers[];

  /**
   * Position relative to trigger element
   * @default 'bottom'
   */
  position?: PopoverPosition;

  /** Callback invoked in controlled mode when a popover action will modify the open state */
  onInteraction?: (nextOpenState: boolean, e: Event) => void;

  /**
   * Toggles visibilty when trigger is keyboard focused;
   * Only works when interactionType is hover or hover-trigger
   */
  openOnTriggerFocus?: boolean;

  /** Overlay HTML container class */
  overlayClass?: string;

  /** Overlay HTML container styles */
  overlayStyle?: Style;

  /** Trigger element */
  trigger: m.Vnode<any, any>;

  /**
   * Class added to trigger element on interaction
   * @default 'cui-active'
   */
  triggerActiveClass?: string;
}

export interface IPopoverTriggerAttrs extends IAttrs {
  onclick?(e: Event): void;
  onmouseenter?(e: MouseEvent): void;
  onmouseleave?(e: MouseEvent): void;
  onfocus?(e: Event): void;
  onblur?(e: Event): void;
  [htmlAttrs: string]: any;
}

export class Popover extends AbstractComponent<IPopoverAttrs> {
  private isOpen: boolean;
  private popper?: Instance;
  private trigger: m.VnodeDOM<IPopoverTriggerAttrs>;

  public getDefaultAttrs() {
    return {
      boundariesEl: 'window',
      restoreFocus: false,
      hasBackdrop: false,
      hoverCloseDelay: 100,
      hoverOpenDelay: 0,
      interactionType: 'click',
      position: 'bottom',
      hasArrow: true,
      triggerActiveClass: Classes.ACTIVE
    } as IPopoverAttrs;
  }

  public oninit(vnode: m.Vnode<IPopoverAttrs>) {
    super.oninit(vnode);
    const { isOpen, defaultIsOpen } = this.attrs;

    this.isOpen = isOpen != null ? isOpen : defaultIsOpen != null ? defaultIsOpen : false;
  }

  public onbeforeupdate(vnode: m.Vnode<IPopoverAttrs>, old: m.VnodeDOM<IPopoverAttrs>) {
    super.onbeforeupdate(vnode, old);
    const isOpen = vnode.attrs.isOpen;
    const wasOpen = old.attrs.isOpen;

    if (isOpen && !wasOpen) {
      this.isOpen = true;
    } else if (!isOpen && wasOpen) {
      this.isOpen = false;
    }
  }

  public onupdate() {
    if (this.popper) {
      this.popper.setOptions({
        placement: this.attrs.position as Placement
      });
    }
  }

  public onremove() {
    this.destroyPopper();
  }

  public view() {
    const {
      class: className,
      style,
      content,
      hasArrow,
      trigger,
      interactionType,
      inline,
      backdropClass,
      overlayClass,
      overlayStyle
    } = this.attrs;

    this.trigger = trigger as m.VnodeDOM;
    this.setTriggerAttrs();

    const innerContent = m('', {
      class: classnames(Classes.POPOVER, className),
      onclick: this.handlePopoverClick,
      onmouseenter: this.handleTriggerMouseEnter,
      onmouseleave: this.handleTriggerMouseLeave,
      style
    }, [
      hasArrow && m(`.${Classes.POPOVER_ARROW}`),
      m(`.${Classes.POPOVER_CONTENT}`, content)
    ]);

    return m.fragment({}, [
      this.trigger,

      m(Overlay, {
        restoreFocus: this.isClickInteraction(),
        ...this.attrs as IOverlayableAttrs,
        backdropClass: classnames(Classes.POPOVER_BACKDROP, backdropClass),
        class: overlayClass,
        closeOnOutsideClick: interactionType !== 'click-trigger',
        content: innerContent,
        inline,
        isOpen: this.isOpen,
        onClose: this.handleOverlayClose,
        onOpened: this.handleOpened,
        onClosed: this.handleClosed,
        style: overlayStyle
      })
    ]);
  }

  private handleOpened = (contentEl: HTMLElement) => {
    if (!this.popper && contentEl) {
      const popoverEl = contentEl.querySelector(`.${Classes.POPOVER}`)!;
      this.createPopper(popoverEl as HTMLElement);
      safeCall(this.attrs.onOpened, contentEl);
    }
  };

  private handleClosed = () => {
    this.destroyPopper();
    safeCall(this.attrs.onClosed);
  };

  private handleOverlayClose = (e: Event) => {
    const target = e.target as HTMLElement;
    const isTriggerClick = elementIsOrContains(this.trigger.dom as HTMLElement, target);

    if (!isTriggerClick || e instanceof KeyboardEvent) {
      this.isControlled ? this.handleInteraction(e) : this.isOpen = false;
    }
  };

  private createPopper(el: HTMLElement) {
    const { position, hasArrow, boundariesEl, modifiers = [] } = this.attrs;

    const defaultModifiers: StrictModifiers[] = [{
      name: 'arrow',
      enabled: hasArrow,
      options: {
        element: `.${Classes.POPOVER_ARROW}`,
        padding: 0
      }
    }, {
      name: 'offset',
      options: {
        offset: ({ placement }) => this.getContentOffset(placement, el)
      }
    }, {
      name: 'preventOverflow',
      enabled: true,
      options: {
        padding: 0,
        boundary: typeof boundariesEl === 'string' ? 'clippingParents' : boundariesEl,
        altBoundary: boundariesEl == 'scrollParent'
      }
    }];

    const combinedModifiers =
      defaultModifiers
        //.filter(cm => modifiers.some(m => m.name !== cm.name))
        .concat(modifiers);

    this.popper = createPopper<StrictModifiers>(
      this.trigger.dom,
      el, {
      placement: position,
      modifiers: combinedModifiers
    });
  }

  private destroyPopper() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = undefined;
    }
  }

  private setTriggerAttrs() {
    const isControlled = this.isControlled;

    if (!this.trigger.attrs) {
      this.trigger.attrs = {};
    }

    const triggerAttrs = this.trigger.attrs;

    if (this.isOpen) {
      triggerAttrs.class = classnames(
        triggerAttrs.className || triggerAttrs.class,
        this.attrs.triggerActiveClass,
        Classes.POPOVER_TRIGGER_ACTIVE
      );
    } else triggerAttrs.class = triggerAttrs.className || triggerAttrs.class || '';

    const triggerEvents = {
      onmouseenter: triggerAttrs.onmouseenter,
      onmouseleave: triggerAttrs.onmouseleave,
      onfocus: triggerAttrs.onfocus,
      onblur: triggerAttrs.onblur,
      onclick: triggerAttrs.onclick
    };

    if (this.isClickInteraction()) {
      triggerAttrs.onclick = (e: Event) => {
        isControlled ? this.handleInteraction(e) : this.handleTriggerClick();

        safeCall(triggerEvents.onclick);
      };
    } else {
      triggerAttrs.onmouseenter = (e: MouseEvent) => {
        isControlled ? this.handleInteraction(e) : this.handleTriggerMouseEnter(e);

        safeCall(triggerEvents.onmouseenter);
      };

      triggerAttrs.onmouseleave = (e: MouseEvent) => {
        isControlled ? this.handleInteraction(e) : this.handleTriggerMouseLeave(e);

        safeCall(triggerEvents.onmouseleave);
      };

      triggerAttrs.onfocus = (e: FocusEvent) => {
        isControlled ? this.handleInteraction(e) : this.handleTriggerFocus(e);

        safeCall(triggerEvents.onfocus);
      };

      triggerAttrs.onblur = (e: FocusEvent) => {
        isControlled ? this.handleInteraction(e) : this.handleTriggerBlur(e);

        safeCall(triggerEvents.onblur);
      };
    }
  }

  private handleInteraction(e: Event) {
    safeCall(this.attrs.onInteraction, !this.isOpen, e);
  }

  private handlePopoverClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const hasDimiss = target.closest(`.${Classes.POPOVER_DISSMISS}`) != null;

    if (this.attrs.closeOnContentClick || hasDimiss) {
      this.isControlled ? this.handleInteraction(e) : this.isOpen = false;
    } else (e as any).redraw = false;
  };

  private handleTriggerClick() {
    this.isOpen = !this.isOpen;
  }

  private handleTriggerFocus(e: FocusEvent) {
    if (this.attrs.openOnTriggerFocus) {
      this.handleTriggerMouseEnter(e as any);
    } else (e as any).redraw = false;
  }

  private handleTriggerBlur(e: FocusEvent) {
    if (this.attrs.openOnTriggerFocus) {
      this.handleTriggerMouseLeave(e as any);
    } else (e as any).redraw = false;
  }

  private handleTriggerMouseEnter = (e: MouseEvent) => {
    const { hoverOpenDelay, interactionType } = this.attrs;

    if (interactionType !== 'hover-trigger') {
      this.clearTimeouts();
    }

    if (!this.isOpen && this.isHoverInteraction()) {
      if (hoverOpenDelay! > 0) {
        this.setTimeout(() => {
          this.isOpen = true;
          m.redraw();
        }, hoverOpenDelay);
      } else {
        this.isOpen = true;
        m.redraw();
      }
    }

    (e as any).redraw = false;
  };

  private handleTriggerMouseLeave = (e: MouseEvent) => {
    const { hoverCloseDelay } = this.attrs;

    this.clearTimeouts();

    if (this.isOpen && this.isHoverInteraction()) {
      if (hoverCloseDelay! > 0) {
        this.setTimeout(() => {
          this.isOpen = false;
          m.redraw();
        }, hoverCloseDelay);
      } else {
        this.isOpen = false;
        m.redraw();
      }
    }

    (e as any).redraw = false;
  };

  private isHoverInteraction() {
    const interactionType = this.attrs.interactionType;
    return interactionType === 'hover' || interactionType === 'hover-trigger';
  }

  private isClickInteraction() {
    const interactionType = this.attrs.interactionType;
    return interactionType === 'click' || interactionType === 'click-trigger';
  }

  private get isControlled() {
    return this.attrs.isOpen != null;
  }

  private getContentOffset = (placement: Placement, containerEl: HTMLElement) => {
    if (!this.attrs.hasArrow || this.popper?.state.placement != placement)
      return [0, 0] as [number, number];

    const arrowSize = (containerEl.children[0] as HTMLElement).clientWidth;
    return [0, arrowSize] as [number, number];
  };
}
