import m from 'mithril';

export abstract class AbstractComponent<A> implements m.Component<A> {
  protected timeoutStack: number[] = [];
  protected attrs: A = {} as A;
  protected prevAttrs: A;

  public abstract view(vnode: m.Vnode<A>): m.Children | null | void;
  public abstract getDefaultAttrs(): A;

  public oninit(vnode: m.Vnode<A>) {
    vnode.attrs = vnode.attrs || {} as A;
    this.setAttrs(vnode);
  }

  public onbeforeupdate(vnode: m.Vnode<A>, prev: m.VnodeDOM<A>) {
    this.setAttrs(vnode);
    this.prevAttrs = prev.attrs;
  }

  private setAttrs(vnode: m.Vnode<A>) {
    vnode.attrs = this.getAttrs(vnode.attrs);
    this.attrs = vnode.attrs;
  }

  private getAttrs(attrs: A): A {
    return {
      ...this.getDefaultAttrs() as Object,
      ...attrs as Object
    } as A;
  }

  protected setTimeout = (callback: () => void, timeout?: number) => {
    const handle = window.setTimeout(callback, timeout);
    this.timeoutStack.push(handle);
    return () => window.clearTimeout(handle);
  };

  protected clearTimeouts = () => {
    if (this.timeoutStack.length) {
      this.timeoutStack.map((timeout) => clearTimeout(timeout));
      this.timeoutStack = [];
    }
  };
}
