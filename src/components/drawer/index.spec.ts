import m from 'mithril';
import assert from 'assert';
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

    assert(hasClass(drawer(), Classes.DRAWER));
    assert(hasClass(drawer(), `${Classes.DRAWER}-right`));
  });

  it('Renders children', () => {
    mount({ content: 'content' });

    assert(hasChildClass(drawer(), Classes.DRAWER_CONTENT));
  });

  it('Sets correct position class', () => {
    const position = 'top';
    mount({ position });

    assert(hasClass(drawer(), `${Classes.DRAWER}-${position}`));
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
