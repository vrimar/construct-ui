import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Classes, InputSelect, IInputSelectAttrs } from '@/';
import { hasClass, sleep, TIMEOUT } from '@test-utils';

const items = ['1', '2', '3'];
const value = '1';

describe('input-select', () => {
  const el = () => document.body.querySelector(`.${Classes.INPUT_SELECT}`) as HTMLElement;
  const inputContainer = () => document.body.querySelector(`.${Classes.INPUT}`) as HTMLElement;
  const input = () => inputContainer().querySelector('input') as HTMLInputElement;

  afterEach(() => {
    document.body.innerHTML = '';
    m.mount(document.body, null);
  });

  it('Renders correctly', () => {
    mount();

    expect(input()).toBeTruthy();
    expect(hasClass(el(), Classes.INPUT_SELECT)).toBeTruthy();
  });

  it('Input value is set when closed', () => {
    mount({
      popoverAttrs: {
        defaultIsOpen: false,
        transitionDuration: 0
      },
      value
    });

    expect(input().value).toBe(value);
  });

  it('Placeholder is set to value when open', () => {
    mount({ value });

    expect(input().value).not.toBe(value);
    expect(input().placeholder).toBe(value);
  });

  it('Focus opens list', async () => {
    mount({
      popoverAttrs: {
        defaultIsOpen: false,
        transitionDuration: 0
      }
    });

    input().focus();

    await sleep(TIMEOUT);

    expect(el()).toBeTruthy();
  });

  it('Passes through inputAttrs', () => {
    mount({
      inputAttrs: { class: Classes.POSITIVE }
    });

    expect(hasClass(inputContainer(), Classes.POSITIVE)).toBeTruthy();
  });

  function mount(attrs?: Partial<IInputSelectAttrs<string>>) {
    const component = {
      view: () => m(InputSelect, {
        items,
        itemRender: (item: string) => m('', item),
        popoverAttrs: {
          transitionDuration: 0,
          defaultIsOpen: true
        },
        ...attrs
      })
    };

    m.mount(document.body, component);
    return component;
  }
});
