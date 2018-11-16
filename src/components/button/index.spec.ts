import m from 'mithril';
import assert from 'assert';
import { Button, Classes, Icons, IButtonAttrs } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('button', () => {
  const el = () => document.body.firstChild as HTMLElement;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      basic: true,
      class: Classes.POSITIVE,
      fluid: true,
      intent: 'primary',
      rounded: true,
      label: 'test'
    });

    assert(hasClass(el(), Classes.BUTTON));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.BASIC));
    assert(hasClass(el(), Classes.ROUNDED));
    assert(hasClass(el(), Classes.FLUID));
    assert.equal(el().textContent, 'test');
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

  function mount(attrs: IButtonAttrs) {
    const component = {
      view: () => m(Button, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
