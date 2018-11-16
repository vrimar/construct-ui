import m from 'mithril';
import classnames from 'classnames';
import PopperJS, { Boundary } from 'popper.js';
import { Classes, IAttrs, safeCall, getClosest, elementIsOrContains } from '../../_shared';
import { AbstractComponent } from '../abstract-component';
import { IOverlayableAttrs, Overlay } from '../overlay';
import { PopoverInteraction, PopoverPosition } from './popoverTypes';

export interface IPopoverAttrs extends IOverlayableAttrs, IAttrs {
  /**
   * Set the bounding box.
   * see <a href="https://popper.js.org/popper-documentation.html#modifiers..preventOverflow">Here</a> for more details
   */
  boundariesEl?: Boundary | Element;

  /** Close the popover on inner content click */
  closeOnContentClick?: boolean;

  /** Inner content */
  content?: m.Children;

  /** Initial open when in uncontrolled mode */
  defaultIsOpen?: boolean;

  /** Trigger interaction to toggle visiblity */
  interactionType?: PopoverInteraction;

  /** Toggles visibility */
  isOpen?: boolean;

  /**
   * Options to pass to the PopperJS instance;
   * see <a href="https://popper.js.org/popper-documentation.html#modifiers">HERE</a> for more details
   */
  modifiers?: PopperJS.Modifiers;

  /** Position relative to trigger element */
  position?: PopoverPosition;

  /** Trigger element */
  trigger?: m.Vnode;

  /** Toggles arrow visiblity */
  hasArrow?: boolean;

  /** Callback invoked in controlled mode when a popover action will modify the open state */
  onInteraction?: (nextOpenState: boolean, e: Event) => void;

  /** Toggles visibilty when trigger is keyboard focused */
  openOnTriggerFocus?: boolean;

  /** Duration of close delay on hover interaction */
  hoverCloseDelay?: number;

  /** Duration of open delay on hover interaction */
  hoverOpenDelay?: number;
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
  private popper: PopperJS & { options?: PopperJS.PopperOptions };
  private popover: m.VnodeDOM<IPopoverAttrs, Popover>;
  private trigger: m.VnodeDOM<IPopoverTriggerAttrs, any>;

  public getDefaultAttrs() {
    return {
      boundariesEl: 'window',
      hasBackdrop: false,
      hoverCloseDelay: 100,
      hoverOpenDelay: 0,
      interactionType: 'click',
      position: 'bottom',
      hasArrow: true
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
    this.updatePopper();
  }

  public onremove() {
    this.destroy();
  }

  public view() {
    const {
      content,
      hasArrow,
      trigger,
      interactionType,
      inline,
      backdropClass
    } = this.attrs;

    this.trigger = trigger as m.VnodeDOM;
    this.setTriggerAttrs();

    const innertContent = [
      hasArrow && m(`.${Classes.POPOVER_ARROW}`),
      m(`.${Classes.POPOVER_CONTENT}`, content)
    ];

    this.popover = m('', {
      class: classnames(
        Classes.POPOVER,
        this.popper && Classes.POPOVER_OPEN
      ),
      onclick: this.handlePopoverClick,
      onmouseenter: this.handleTriggerMouseEnter,
      onmouseleave: this.handleTriggerMouseLeave
    }, innertContent) as m.VnodeDOM<IPopoverAttrs, Popover>;

    return m.fragment({}, [
      this.trigger,

      m(Overlay, {
        ...this.attrs as IOverlayableAttrs,
        backdropClass: classnames(Classes.POPOVER_BACKDROP, backdropClass),
        closeOnOutsideClick: interactionType !== 'click-trigger',
        content: this.popover,
        inline,
        isOpen: this.isOpen,
        onClose: this.handleOverlayClose,
        onOpened: () => this.handleOpened(),
        onClosed: () => this.handleClosed()
      })
    ]);
  }

  private handleOpened() {
    if (this.popover.dom) {
      this.createPopper();
      safeCall(this.attrs.onOpened);
    }
  }

  private handleClosed() {
    this.destroy();
    safeCall(this.attrs.onClosed);
  }

  private handleOverlayClose = (e: Event) => {
    const target = e.target as HTMLElement;
    const isTriggerClick = elementIsOrContains(this.trigger.dom as HTMLElement, target);

    if (!isTriggerClick || e instanceof KeyboardEvent) {
      this.isControlled ? this.handleInteraction(e) : this.isOpen = false;
    }
  }

  private destroy() {
    this.destroyPopper();
  }

  private createPopper() {
    const { position, hasArrow, boundariesEl } = this.attrs;

    const options = {
      placement: position,
      modifiers: {
        arrow: {
          enabled: hasArrow,
          element: `.${Classes.POPOVER_ARROW}`
        },
        offset: {
          enabled: hasArrow,
          fn: this.getContentOffset
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: boundariesEl,
          padding: 0
        },
        ...this.attrs.modifiers
      }
    } as PopperJS.PopperOptions;

    this.popper = new PopperJS(
      this.trigger.dom,
      this.popover.dom,
      options
    );

    this.updatePopper();
    m.redraw();
  }

  private updatePopper() {
    if (this.popper) {
      this.popper.options.placement = this.attrs.position as PopperJS.Placement;
      this.popper.scheduleUpdate();
    }
  }

  private destroyPopper() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
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
        Classes.ACTIVE,
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
    const hasDimiss = getClosest(target, `.${Classes.POPOVER_DISSMISS}`) != null;

    if (this.attrs.closeOnContentClick || hasDimiss) {
      this.isControlled ? this.handleInteraction(e) : this.isOpen = false;
    } else (e as any).redraw = false;
  }

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
      if (hoverOpenDelay > 0) {
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
  }

  private handleTriggerMouseLeave = (e: MouseEvent) => {
    const { hoverCloseDelay } = this.attrs;

    this.clearTimeouts();

    if (this.isOpen && this.isHoverInteraction()) {
      if (hoverCloseDelay > 0) {
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
  }

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

  private getContentOffset = (data: PopperJS.Data) => {
    if (!this.attrs.hasArrow) {
      return data;
    }

    const placement = data.placement;
    const isHorizontal = placement.includes('left') || placement.includes('right');
    const position = isHorizontal ? 'left' : 'top';
    const arrowSize = this.popover.dom && (this.popover.dom.childNodes[0] as HTMLElement).clientHeight + 1;

    const offset = placement.includes('top') || placement.includes('left') ? -arrowSize : arrowSize;

    data.offsets.popper[position] += offset;

    return data;
  }
}
