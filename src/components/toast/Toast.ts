import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs, IIntentAttrs, safeCall } from '../../_shared';
import { AbstractComponent } from '../abstract-component';
import { Icon, Icons, IconName } from '../icon';

export interface IToastAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Left-justified icon */
  icon?: IconName;

  /** Inner content message */
  message?: m.Children;

  /** Callback invoked when toast is dismissed or timeout expires */
  onDismiss?: (key: number | string, timedOut: boolean) => void;

  /**
   * Duration of dismiss timeout;
   * A value of `0` will prevent the toast from timing out
   * @default 3000
   */
  timeout?: number;

  /** Toast key; necessary when used in controlled mode */
  key?: number | string;

  [htmlAttrs: string]: any;
}

export class Toast extends AbstractComponent<IToastAttrs> {
  public getDefaultAttrs() {
    return {
      timeout: 3000
    };
  }

  public oncreate() {
    this.startTimeout();
  }

  public onbeforeupdate(vnode: m.Vnode<IToastAttrs>, prev: m.VnodeDOM<IToastAttrs>) {
    super.onbeforeupdate(vnode, prev);

    if (prev.attrs.timeout! <= 0 && vnode.attrs.timeout! > 0) {
      this.startTimeout();
    } else if (prev.attrs.timeout! > 0 && vnode.attrs.timeout! <= 0) {
      this.clearTimeouts();
    } else if (vnode.attrs.timeout! !== prev.attrs.timeout) {
      this.clearTimeouts();
      this.startTimeout();
    }
  }

  public view() {
    const { class: className, intent, size, icon, message, ...htmlAttrs } = this.attrs;

    const classes = classnames(
      Classes.TOAST,
      intent && `cui-${intent}`,
      size && `cui-${size}`,
      className
    );

    const content = [
      icon && m(Icon, { name: icon }),
      m(`.${Classes.TOAST_MESSAGE}`, message),
      m(Icon, {
        name: Icons.X,
        onclick: this.handleCloseClick
      })
    ];

    return m('', {
      class: classes,
      onblur: this.startTimeout,
      onfocus: this.clearTimeouts,
      onmouseenter: this.clearTimeouts,
      onmouseleave: this.startTimeout,
      ...htmlAttrs,
      tabindex: 0
    }, content);
  }

  public onremove() {
    this.clearTimeouts();
  }

  private handleCloseClick = () => {
    this.triggerDismiss(false);
  }

  private triggerDismiss(didTimeoutExpire: boolean) {
    safeCall(this.attrs.onDismiss, this.attrs.key, didTimeoutExpire);
    this.clearTimeouts();
    m.redraw();
  }

  private startTimeout = () => {
    const timeout = this.attrs.timeout;

    if (timeout! > 0) {
      this.setTimeout(() => this.triggerDismiss(true), timeout);
    }
  }
}
