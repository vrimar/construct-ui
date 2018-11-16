import m from 'mithril';
import assert from 'assert';
import { Form, IFormAttrs, Classes, Icons } from '@/';
import { hasChildClass, hasClass } from '@test-utils';

describe.skip('form', () => {
  const el = () => document.body.firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'color: red',
      fill: true
    });

    assert(hasClass(el(), Classes.EMPTY_STATE));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.EMPTY_STATE_FILL));
    assert(el().hasAttribute('style'));
  });

  it('Renders children', () => {
    mount({
      content: 'content',
      header: 'header',
      icon: Icons.ACTIVITY
    });

    assert(hasChildClass(el(), Classes.EMPTY_STATE_CONTENT));
    assert(hasChildClass(el(), Classes.EMPTY_STATE_HEADER));
    assert(hasChildClass(el(), Classes.ICON));
  });

  function mount(attrs: IFormAttrs) {
    const component = {
      view: () => m(Form, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
