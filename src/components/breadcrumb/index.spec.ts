import m from 'mithril';
import { describe, beforeEach, expect, it } from 'vitest';
import { Classes, Breadcrumb, BreadcrumbItem, IBreadcrumbAttrs, Icon, Icons } from '@/';
import { hasChildClass, hasClass } from '@test-utils';

describe('breadcrumb', () => {
  const el = () => document.body.firstChild as HTMLElement;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      size: 'xs'
    });

    expect(hasClass(el(), Classes.BREADCRUMB)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
  });

  it('Renders children', () => {
    mount({});

    const childrenLength = el().querySelectorAll(`.${Classes.BREADCRUMB_ITEM}`).length;
    const seperatorLength = el().querySelectorAll(`.${Classes.BREADCRUMB_SEPERATOR}`).length;

    expect(childrenLength).toBe(2);
    expect(seperatorLength).toBe(2);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  it('Renders custom seperator', () => {
    mount({
      seperator: m(Icon, { name: Icons.ACTIVITY })
    });

    expect(hasChildClass(el(), `${Classes.ICON}-${Icons.ACTIVITY}`)).toBeTruthy();
  });

  function mount(attrs: IBreadcrumbAttrs) {
    const component = {
      view: () => m(Breadcrumb, { ...attrs }, [
        m(BreadcrumbItem, 'label'),
        m(BreadcrumbItem, 'label')
      ])
    };
    m.mount(document.body, component);
  }
});
