import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Drawer, IDrawerAttrs, Classes } from '@/';
import { hasChildClass, hasClass } from '@test-utils';

describe('drawer', () => {
  const drawer = () => document.body.querySelector(`.${Classes.DRAWER}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'color: red',
      position: 'right'
    });

    expect(hasClass(drawer(), Classes.DRAWER)).toBeTruthy();
    expect(hasClass(drawer(), `${Classes.DRAWER}-right`)).toBeTruthy();
  });

  it('Renders children', () => {
    mount({ content: 'content' });

    expect(hasChildClass(drawer(), Classes.DRAWER_CONTENT)).toBeTruthy();
  });

  it('Sets correct position class', () => {
    const position = 'top';
    mount({ position });

    expect(hasClass(drawer(), `${Classes.DRAWER}-${position}`)).toBeTruthy();
  });

  function mount(attrs: IDrawerAttrs) {
    const component = {
      view: () => m(Drawer, {
        isOpen: true,
        transitionDuration: 0,
        ...attrs
      })
    };

    m.mount(document.body, component);
  }
});
