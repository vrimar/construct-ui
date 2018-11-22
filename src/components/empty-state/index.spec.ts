import m from 'mithril';
import assert from 'assert';
import { EmptyState, IEmptyStateAttrs, Classes, Icons } from '@/';
import { hasChildClass, hasClass } from '@test-utils';

describe('empty-state', () => {
  const el = () => document.body.firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      fill: true,
      style: 'color: red'
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

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  function mount(attrs: IEmptyStateAttrs) {
    const component = {
      view: () => m(EmptyState, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
