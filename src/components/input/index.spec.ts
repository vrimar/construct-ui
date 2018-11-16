import m from 'mithril';
import assert from 'assert';
import { Input, ITextAreaAttrs, Classes, Tag, Icon, Icons } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('input', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const input = () => el().querySelector('input');

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'margin:0',
      intent: 'primary',
      size: 'xs',
      fluid: true
    });

    assert(hasClass(el(), Classes.INPUT));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.XS));
    assert(hasClass(el(), Classes.FLUID));
    assert(el().hasAttribute('style'));
  });

  it('Renders left content', () => {
    mount({
      contentLeft: m(Tag)
    });

    const tag = el().querySelector(`.${Classes.TAG}`) as HTMLElement;

    assert(hasChildClass(el(), Classes.TAG));
    assert(el().firstChild === tag);
  });

  it('Renders right content', () => {
    mount({
      contentRight: m(Icon, { name: Icons.ACTIVITY })
    });

    const icon = el().querySelector(`.${Classes.ICON}`) as HTMLElement;

    assert(hasChildClass(el(), Classes.ICON));
    assert(el().lastChild === icon);
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

  function mount(attrs: ITextAreaAttrs) {
    const component = {
      view: () => m(Input, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
