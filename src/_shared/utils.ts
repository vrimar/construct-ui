import m from 'mithril';
import { Classes, Style } from '.';

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export function safeCall(func: any, ...args: any[]) {
  if (isFunction(func)) {
    return func(...args);
  }
}

export function getScrollbarWidth() {
  const el = document.createElement('div');
  el.style.width = '100px';
  el.style.height = '100px';
  el.style.overflow = 'scroll';
  el.style.position = 'absolute';
  el.style.top = '-9999px';

  document.body.appendChild(el);
  const scrollbarWidth = el.offsetWidth - el.clientWidth;
  document.body.removeChild(el);

  return scrollbarWidth;
}

export function hasScrollbar(el: HTMLElement) {
  return el.scrollHeight > window.innerHeight;
}

export function elementIsOrContains(element: HTMLElement, testElement: HTMLElement) {
  return element === testElement || element.contains(testElement);
}

export function normalizeStyle(style?: Style) {
  if (typeof style === 'string') {
    const result = {} as any;
    const attributes = style.replace(/\s/g, '').split(';');

    for (let i = 0; i < attributes.length; i++) {
      const entry = attributes[i].split(':');
      result[entry.splice(0, 1)[0]] = entry.join(':');
    }
    return result;
  } else return style;
}

export function updateElementGroupPadding(
  containerEl: HTMLElement,
  contentLeft?: m.Vnode<any, any>,
  contentRight?: m.Vnode<any, any>
) {
  if (!containerEl) return;

  const containerPadding = Math.floor(containerEl.clientHeight / 1.6);

  if (contentLeft) {
    const contentLeftEl = (contentLeft as m.VnodeDOM).dom as HTMLElement;

    containerEl.style.paddingLeft = shouldAddPadding(contentLeftEl)
      ? `${contentLeftEl.clientWidth + containerPadding}px`
      : '';

  } else containerEl.style.paddingLeft = '';

  if (contentRight) {
    const contentRightEl = (contentRight as m.VnodeDOM).dom as HTMLElement;

    containerEl.style.paddingRight = shouldAddPadding(contentRightEl)
      ? `${contentRightEl.clientWidth + containerPadding}px`
      : '';

  } else containerEl.style.paddingRight = '';
}

function shouldAddPadding(element: HTMLElement) {
  return element &&
    !element.classList.contains(Classes.ICON) &&
    !element.classList.contains(Classes.SPINNER) &&
    !element.classList.contains(Classes.BUTTON_ICON);
}

export function isNullOrEmpty(item: any) {
  return item == null || item === '' || item === false;
}

type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;
export const getObjectKeys = Object.keys as <Type extends object>(value: Type) => Array<ObjectKeys<Type>>;
