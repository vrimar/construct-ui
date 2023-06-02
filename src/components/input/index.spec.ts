import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Input, IInputAttrs, Classes, Tag } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('input', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const input = () => el().querySelector('input') as HTMLInputElement;
  const tag = () => el().querySelector(`.${Classes.TAG}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      basic: true,
      class: Classes.POSITIVE,
      style: 'margin:0',
      intent: 'primary',
      size: 'xs',
      fluid: true
    });

    expect(hasClass(el(), Classes.INPUT)).toBeTruthy();
    expect(hasClass(el(), Classes.BASIC)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(hasClass(el(), Classes.FLUID)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders left content', () => {
    mount({ contentLeft: m(Tag) });

    expect(hasChildClass(el(), Classes.TAG)).toBeTruthy();
    expect(el().firstChild).toBe(tag());
  });

  it('Renders right content', () => {
    mount({ contentRight: m(Tag) });

    expect(hasChildClass(el(), Classes.TAG));
    expect(el().lastChild).toBe(tag());
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name',
      defaultValue: 'defaultValue'
    });

    expect(input().hasAttribute('id')).toBeTruthy();
    expect(input().hasAttribute('name')).toBeTruthy();
    expect(input().value).toBe('defaultValue');
  });

  function mount(attrs: IInputAttrs) {
    const component = {
      view: () => m(Input, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
