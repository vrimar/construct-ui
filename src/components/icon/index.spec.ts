import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Icon, IIconAttrs, Classes, Icons } from '@/';
import { hasClass } from '@test-utils';

describe('icon', () => {
  const el = () => document.body.firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      name: Icons.ACTIVITY,
      class: Classes.POSITIVE,
      intent: 'primary',
      style: 'color: red'
    });

    expect(hasClass(el(), Classes.ICON)).toBeTruthy();
    expect(hasClass(el(), `${Classes.ICON}-${Icons.ACTIVITY}`)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: Icons.ACTIVITY
    });

    expect(el().hasAttribute('id')).toBeTruthy();
  });

  it('Passing onclick sets interactive class', () => {
    mount({
      onclick: () => null,
      name: Icons.ACTIVITY
    });

    expect(hasClass(el(), Classes.ICON_ACTION)).toBeTruthy();
  });

  function mount(attrs: IIconAttrs) {
    const component = {
      view: () => m(Icon, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
