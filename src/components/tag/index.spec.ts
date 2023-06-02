import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
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

    expect(hasClass(el(), Classes.TAG)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.ROUNDED)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();

    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders label', () => {
    mount({
      label: 'label'
    });

    expect(el().textContent?.includes('label')).toBeTruthy();
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  it('Remove icon visible when onRemove specified', () => {
    mount({ onRemove: () => null });
    expect(hasChildClass(el(), `${Classes.ICON}-${Icons.X}`)).toBeTruthy();
  });

  it('onRemove called when remove icon clicked', () => {
    let count = 0;
    mount({ onRemove: () => count++ });

    const icon = el().querySelector(`.${Classes.ICON}`);
    icon!.dispatchEvent(new Event('click'));

    expect(count).toBe(1);
  });

  function mount(attrs: ITagAttrs) {
    const component = {
      view: () => m(Tag, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
