import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
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

    expect(hasClass(el(), Classes.EMPTY_STATE)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.EMPTY_STATE_FILL)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders children', () => {
    mount({
      content: 'content',
      header: 'header',
      icon: Icons.ACTIVITY
    });

    expect(hasChildClass(el(), Classes.EMPTY_STATE_CONTENT)).toBeTruthy();
    expect(hasChildClass(el(), Classes.EMPTY_STATE_HEADER)).toBeTruthy();
    expect(hasChildClass(el(), Classes.ICON)).toBeTruthy();
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  function mount(attrs: IEmptyStateAttrs) {
    const component = {
      view: () => m(EmptyState, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
