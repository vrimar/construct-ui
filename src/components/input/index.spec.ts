import m from 'mithril';
import assert from 'assert';
import { Input, IInputAttrs, Classes, Tag } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('input', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const input = () => el().querySelector('input');
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

    assert(hasClass(el(), Classes.INPUT));
    assert(hasClass(el(), Classes.BASIC));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.XS));
    assert(hasClass(el(), Classes.FLUID));
    assert(el().hasAttribute('style'));
  });

  it('Renders left content', () => {
    mount({ contentLeft: m(Tag) });

    assert(hasChildClass(el(), Classes.TAG));
    assert(el().firstChild === tag());
  });

  it('Renders right content', () => {
    mount({ contentRight: m(Tag) });

    assert(hasChildClass(el(), Classes.TAG));
    assert(el().lastChild === tag());
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name',
      defaultValue: 'defaultValue'
    });

    assert(input().hasAttribute('id'));
    assert(input().hasAttribute('name'));
    assert.equal(input().value, 'defaultValue');
  });

  function mount(attrs: IInputAttrs) {
    const component = {
      view: () => m(Input, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
