import m from 'mithril';
import assert from 'assert';
import { Menu, MenuItem, IMenuAttrs, IMenuItemAttrs, Classes, IPopoverAttrs, Icons } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

window.document.createRange = () => new Range();

describe('menu', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const menuItem = () => el().firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      basic: true,
      class: Classes.POSITIVE,
      size: 'xs',
      style: 'margin:0'
    });

    assert(hasClass(el(), Classes.MENU));
    assert(hasClass(el(), Classes.BASIC));
    assert(hasClass(el(), Classes.XS));
    assert(el().hasAttribute('style'));
  });

  it('Renders children', () => {
    mount({});

    assert.equal(el().children.length, 1);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  describe('menu-item', () => {
    // Menu composes Button, no need to re-test

    it('Renders right icon when submenu specified', () => {
      const submenu = m(Menu, m(MenuItem));

      mount({}, { submenu });

      assert(hasChildClass(menuItem(), `${Classes.ICON}-${Icons.CHEVRON_RIGHT}`));
    });

    it.skip('Renders submenu on mouse hover', (done) => {
      const submenu = m(Menu, m(MenuItem));

      mount({}, { submenu });

      m.redraw();

      // TODO: setup submenu

      // menuItem().dispatchEvent(new MouseEvent('mouseenter'));

      // setTimeout(() => {

      //   m.redraw();
      // }, 200);

      setTimeout(done, 500);
    });
  });

  function mount(attrs: IMenuAttrs, itemAttrs: IMenuItemAttrs = {}) {
    // Set transitionDuration to 0 to prevent setting timeouts in tests
    // Transition duration is tested in the overlay component
    const popoverAttrs = {
      transitionDuration: 0,
      ...itemAttrs.popoverAttrs
    } as IPopoverAttrs;

    const component = {
      view: () => m(Menu, { ...attrs }, [
        m(MenuItem, {
          ...itemAttrs,
          popoverAttrs
        })
      ])
    };

    m.mount(document.body, component);
  }
});
