import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Classes, SelectList, ISelectListAttrs, Button } from '@/';
import { hasClass, hasChildClass, TIMEOUT, sleep } from '@test-utils';

const items = ['1', '2', '3'];

describe('select-list', () => {
  const el = () => document.body.querySelector(`.${Classes.SELECT_LIST}`) as HTMLElement;
  const popover = () => document.body.querySelector(`.${Classes.POPOVER}`) as HTMLElement;

  afterEach(() => {
    document.body.innerHTML = '';
    m.mount(document.body, null);
  });

  it('Renders correctly', () => {
    mount();

    expect(hasClass(el(), Classes.SELECT_LIST)).toBeTruthy();
  });

  it('Renders header', () => {
    const header = 'header';
    mount({ header });

    expect(el().innerHTML.includes(header)).toBeTruthy();
  });

  it('Renders footer', () => {
    const footer = 'footer';
    mount({ footer });

    expect(el().innerHTML.includes(footer)).toBeTruthy();
  });

  it('Sets loading class', () => {
    mount({ loading: true });

    expect(hasChildClass(el(), Classes.SPINNER_ACTIVE)).toBeTruthy();
  });

  it('closeOnSelect=true closes popover on item click', async () => {
    mount({ closeOnSelect: true });

    const item = el().querySelector(`.${Classes.LIST}`)!.firstChild!;
    item.dispatchEvent(new Event('click'));

    await sleep(TIMEOUT);
    expect(el()).toBeFalsy();
  });

  it('Passes through popoverAttrs', () => {
    mount({
      popoverAttrs: {
        class: Classes.POSITIVE,
        defaultIsOpen: true,
        transitionDuration: 0
      }
    });

    expect(hasClass(popover(), Classes.POSITIVE)).toBeTruthy();
  });

  function mount(attrs?: Partial<ISelectListAttrs<any>>) {
    const component = {
      view: () => m(SelectList, {
        items,
        itemRender: (item: string) => m('', item),
        trigger: m(Button),
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
