import m from 'mithril';
import assert from 'assert';
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

    assert(hasClass(el(), Classes.BREADCRUMB));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.XS));
  });

  it('Renders children', () => {
    mount({});

    const childrenLength = el().querySelectorAll(`.${Classes.BREADCRUMB_ITEM}`).length;
    const seperatorLength = el().querySelectorAll(`.${Classes.BREADCRUMB_SEPERATOR}`).length;

    assert.equal(childrenLength, 2);
    assert.equal(seperatorLength, 2);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  it('Renders custom seperator', () => {
    mount({
      seperator: m(Icon, { name: Icons.ACTIVITY })
    });

    assert(hasChildClass(el(), `${Classes.ICON}-${Icons.ACTIVITY}`));
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
