import m from 'mithril';
import { describe, beforeEach, expect, it } from 'vitest';
import { Button, Classes, Icons, IButtonAttrs } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('button', () => {
  const el = () => document.body.firstChild as HTMLElement;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    const align = 'right';

    mount({
      align,
      basic: true,
      class: Classes.POSITIVE,
      fluid: true,
      intent: 'primary',
      rounded: true,
      outlined: true,
      label: 'label',
      sublabel: 'sublabel',
      compact: true
    });

    expect(hasClass(el(), Classes.BUTTON)).toBeTruthy();
    expect(hasClass(el(), `${Classes.ALIGN}-${align}`)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.BASIC)).toBeTruthy();
    expect(hasClass(el(), Classes.ROUNDED)).toBeTruthy();
    expect(hasClass(el(), Classes.FLUID)).toBeTruthy();
    expect(hasClass(el(), Classes.COMPACT)).toBeTruthy();
    expect(hasClass(el(), Classes.OUTLINED)).toBeTruthy();
    expect(el().textContent!.includes('label')).toBeTruthy();
    expect(el().textContent!.includes('sublabel')).toBeTruthy();
  });

  it('Renders anchor', () => {
    mount({
      href: 'https://google.com'
    });

    expect(el().tagName).toBe('A');
    expect(el().hasAttribute('href')).toBeTruthy();
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'test',
      style: 'margin: 10px'
    });

    expect(el().hasAttribute('id'));
    expect(el().hasAttribute('name'));
    expect(el().hasAttribute('style'));
  });

  it('Passes through iconLeft/iconRight attrs', () => {
    let count = 0;

    mount({
      iconLeft: Icons.ARROW_LEFT,
      iconLeftAttrs: {
        onclick: () => count++
      },
      iconRight: Icons.ARROW_RIGHT,
      iconRightAttrs: {
        onclick: () => count++
      }
    });

    const iconLeft = el().firstChild!;
    const iconRight = el().lastChild!;
    iconLeft.dispatchEvent(new Event('click'));
    iconRight.dispatchEvent(new Event('click'));

    expect(count).toBe(2);
  });

  it('Has left icon', () => {
    mount({ iconLeft: Icons.ACTIVITY });

    expect(hasChildClass(el(), `${Classes.ICON}-${Icons.ACTIVITY}`));
  });

  it('Has right icon', () => {
    mount({ iconLeft: Icons.ACTIVITY });

    expect(el().querySelector(`.${Classes.ICON}-${Icons.ACTIVITY}`));
  });

  it('Sets loading class', () => {
    mount({ loading: true });

    expect(hasClass(el(), Classes.LOADING));
  });

  it('Sets disabled class', () => {
    mount({ disabled: true });

    expect(hasClass(el(), Classes.DISABLED));
  });

  it('Sets active class', () => {
    mount({ active: true });

    expect(hasClass(el(), Classes.ACTIVE));
  });

  it('Handles events', () => {
    let count = 0;

    mount({
      onclick: () => count++,
      onhover: () => count++,
      onfocus: () => count++
    });

    el().dispatchEvent(new Event('click'));
    el().dispatchEvent(new Event('hover'));
    el().dispatchEvent(new Event('focus'));

    expect(count).toBe(3);
  });

  it('Correctly handle 0/empty/false/null label/sublabel values', () => {
    mount({
      label: 0,
      sublabel: 0
    });

    expect(el().querySelector(`.${Classes.BUTTON_LABEL}`));
    expect(el().querySelector(`.${Classes.BUTTON_SUBLABEL}`));

    mount({
      label: '',
      sublabel: ''
    });

    expect(!el().querySelector(`.${Classes.BUTTON_LABEL}`));
    expect(!el().querySelector(`.${Classes.BUTTON_SUBLABEL}`));

    mount({
      label: false,
      sublabel: false
    });

    expect(!el().querySelector(`.${Classes.BUTTON_LABEL}`));
    expect(!el().querySelector(`.${Classes.BUTTON_SUBLABEL}`));

    mount({
      label: undefined,
      sublabel: undefined
    });

    expect(!el().querySelector(`.${Classes.BUTTON_LABEL}`));
    expect(!el().querySelector(`.${Classes.BUTTON_SUBLABEL}`));
  });

  function mount(attrs: IButtonAttrs) {
    const component = {
      view: () => m(Button, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
