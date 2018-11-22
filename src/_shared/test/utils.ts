export function hasClass(el: HTMLElement, className: string) {
  return el.classList.contains(className);
}

export function hasChildClass(el: HTMLElement, className: string) {
  return el.querySelector(`.${className}`);
}

export const TIMEOUT = 70;
