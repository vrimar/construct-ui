import m from 'mithril';
export const TIMEOUT = 70;

export function hasClass(el: HTMLElement, className: string) {
  return el.classList.contains(className);
}

export function hasChildClass(el: HTMLElement, className: string) {
  return el.querySelector(`.${className}`);
}

export function triggerEvent(el: Element, type: string, callback: Function) {
  setTimeout(() => {
    el.dispatchEvent(new Event(type, { bubbles: true }));

    setTimeout(callback, TIMEOUT);
  }, TIMEOUT);
}

export function timeoutRedraw(initial: Function, done: Function) {
  setTimeout(() => {
    initial();
    m.redraw();
    setTimeout(done, TIMEOUT);
  }, TIMEOUT);
}

export function keyboardEvent(el: HTMLElement, key: number) {
  el.dispatchEvent(new KeyboardEvent('keydown', { which: key, bubbles: true } as any));
}
