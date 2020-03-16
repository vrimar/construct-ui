import m from 'mithril';
import assert from 'assert';
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

    assert(hasClass(el(), Classes.BUTTON));
    assert(hasClass(el(), `${Classes.ALIGN}-${align}`));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.BASIC));
    assert(hasClass(el(), Classes.ROUNDED));
    assert(hasClass(el(), Classes.FLUID));
    assert(hasClass(el(), Classes.COMPACT));
    assert(hasClass(el(), Classes.OUTLINED));
    assert(el().textContent!.includes('label'));
    assert(el().textContent!.includes('sublabel'));
  });

  it('Renders anchor', () => {
    mount({
      href: 'https://google.com'
    });

    assert.equal(el().tagName, 'A');
    assert(el().hasAttribute('href'));
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'test',
      style: 'margin: 10px'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
    assert(el().hasAttribute('style'));
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

    assert.equal(count, 2);
  });

  it('Has left icon', () => {
    mount({ iconLeft: Icons.ACTIVITY });

    assert(hasChildClass(el(), `${Classes.ICON}-${Icons.ACTIVITY}`));
  });

  it('Has right icon', () => {
    mount({ iconLeft: Icons.ACTIVITY });

    assert(el().querySelector(`.${Classes.ICON}-${Icons.ACTIVITY}`));
  });

  it('Sets loading class', () => {
    mount({ loading: true });

    assert(hasClass(el(), Classes.LOADING));
  });

  it('Sets disabled class', () => {
    mount({ disabled: true });

    assert(hasClass(el(), Classes.DISABLED));
  });

  it('Sets active class', () => {
    mount({ active: true });

    assert(hasClass(el(), Classes.ACTIVE));
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

    assert.equal(count, 3);
  });

  it('Correctly handle 0/empty/false/null label/sublabel values', () => {
    mount({
      label: 0,
      sublabel: 0
    });

    assert(el().querySelector(`.${Classes.BUTTON_LABEL}`));
    assert(el().querySelector(`.${Classes.BUTTON_SUBLABEL}`));

    mount({
      label: '',
      sublabel: ''
    });

    assert(!el().querySelector(`.${Classes.BUTTON_LABEL}`));
    assert(!el().querySelector(`.${Classes.BUTTON_SUBLABEL}`));

    mount({
      label: false,
      sublabel: false
    });

    assert(!el().querySelector(`.${Classes.BUTTON_LABEL}`));
    assert(!el().querySelector(`.${Classes.BUTTON_SUBLABEL}`));

    mount({
      label: undefined,
      sublabel: undefined
    });

    assert(!el().querySelector(`.${Classes.BUTTON_LABEL}`));
    assert(!el().querySelector(`.${Classes.BUTTON_SUBLABEL}`));
  });

  function mount(attrs: IButtonAttrs) {
    const component = {
      view: () => m(Button, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
