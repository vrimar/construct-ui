export const TIMEOUT = 70;

export function hasClass(el: HTMLElement, className: string) {
  return el.classList.contains(className);
}

export function hasChildClass(el: HTMLElement, className: string) {
  return el.querySelector(`.${className}`);
}

export async function triggerEvent(el: Element, type: string) {
  await sleep(TIMEOUT);
  el.dispatchEvent(new Event(type, { bubbles: true }));
  await sleep(TIMEOUT);
}

export async function keyboardEvent(el: HTMLElement, key: number) {
  el.dispatchEvent(new KeyboardEvent('keydown', { which: key, bubbles: true } as any));
  await sleep(TIMEOUT);
}

export const sleep = (milliseconds: number = 0) => new Promise(r => setTimeout(r, milliseconds));
