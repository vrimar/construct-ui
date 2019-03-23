import m from 'mithril';
import assert from 'assert';
import { Tag, ITagAttrs, Icons, Classes } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('tag', () => {
  const el = () => document.body.firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      intent: 'primary',
      rounded: true,
      size: 'xs',
      style: 'color: red'
    });

    assert(hasClass(el(), Classes.TAG));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.ROUNDED));
    assert(hasClass(el(), Classes.XS));

    assert(el().hasAttribute('style'));
  });

  it('Renders label', () => {
    mount({
      label: 'label'
    });

    assert(el().textContent!.includes('label'));
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  it('Remove icon visible when onRemove specified', () => {
    mount({ onRemove: () => null });
    assert(hasChildClass(el(), `${Classes.ICON}-${Icons.X}`));
  });

  it('onRemove called when remove icon clicked', () => {
    let count = 0;
    mount({ onRemove: () => count++ });

    const icon = el().querySelector(`.${Classes.ICON}`);
    icon!.dispatchEvent(new Event('click'));

    assert.equal(count, 1);
  });

  function mount(attrs: ITagAttrs) {
    const component = {
      view: () => m(Tag, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
