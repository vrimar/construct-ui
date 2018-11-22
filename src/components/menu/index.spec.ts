import m from 'mithril';
import assert from 'assert';
import { Menu, MenuItem, IMenuAttrs, IMenuItemAttrs, Classes, IPopoverAttrs, Icons } from '@/';
import { hasClass, hasChildClass, TIMEOUT } from '@test-utils';

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

    // TODO: fix test
    it.skip('Passes through Popover attrs to submenu popover', done => {
      const submenu = m(Menu, m(MenuItem));

      mount({}, {
        submenu,
        popoverMenuAttrs: {
          class: Classes.POSITIVE,
          style: 'color:red'
        }
      });

      setTimeout(() => {
        menuItem().dispatchEvent(new MouseEvent('mouseenter'));
        // const popover: HTMLElement = document.body.querySelector(`.${Classes.POPOVER}`);
        // assert(hasClass(popover, Classes.POSITIVE));
        done();
      }, TIMEOUT);
    });

    it('Triggers submenu popover on mouse hover', (done) => {
      let count = 0;
      const submenu = m(Menu, m(MenuItem));

      mount({}, {
        submenu,
        popoverMenuAttrs: {
          onOpened: () => count++
        }
      });

      setTimeout(() => {
        menuItem().dispatchEvent(new MouseEvent('mouseenter'));
        assert.equal(count, 1);
        done();
      }, TIMEOUT);
    });
  });

  function mount(attrs: IMenuAttrs, itemAttrs: IMenuItemAttrs = {}) {
    // Set transitionDuration to 0 to prevent setting timeouts in tests
    // Transition duration is tested in the overlay component
    const popoverAttrs = {
      transitionDuration: 0,
      addToStack: false,
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

    return component;
  }
});
