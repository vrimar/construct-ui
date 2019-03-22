import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, safeCall, normalizeStyle } from '../../_shared';

export interface IPortalAttrs extends IAttrs {
  /** Callback invoked when the component is mounted */
  onContentMount?: (rootElement: HTMLElement) => void;

  /** Optional HTML element to mount to */
  container?: HTMLElement;
}

export class Portal implements m.Component<IPortalAttrs> {
  private rootElement: HTMLElement;
  private content: m.Component;

  public oncreate({ attrs, children }: m.Vnode<IPortalAttrs>) {
    const rootElement = document.createElement('div');
    const container = attrs.container || document.body;
    container.appendChild(rootElement);
    this.rootElement = rootElement;

    this.setStyles(attrs);

    this.content = { view: () => children };
    m.mount(this.rootElement, this.content);
    safeCall(attrs.onContentMount, rootElement);
  }

  public onupdate({ attrs }: m.Vnode<IPortalAttrs>) {
    this.setStyles(attrs);
  }

  public onbeforeupdate({ children }: m.Vnode<IPortalAttrs>) {
    if (!this.content) return false;
    this.content.view = () => children;
  }

  public onremove({ attrs }: m.Vnode<IPortalAttrs>) {
    const container = attrs.container || document.body;

    if (container.contains(this.rootElement)) {
      m.mount(this.rootElement, null);
      container.removeChild(this.rootElement);
    }
  }

  public view() {
    return m.fragment({}, '');
  }

  private setStyles(attrs: IPortalAttrs) {
    this.rootElement.className = classnames(Classes.PORTAL, attrs.class);
    this.rootElement.style.cssText = '';
    Object.assign(this.rootElement.style, normalizeStyle(attrs.style));
  }
}
