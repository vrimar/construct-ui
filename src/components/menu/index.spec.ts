import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Menu, MenuItem, IMenuAttrs, IMenuItemAttrs, Classes, IPopoverAttrs, Icons } from '@/';
import { hasClass, hasChildClass, TIMEOUT, sleep } from '@test-utils';

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

    expect(hasClass(el(), Classes.MENU)).toBeTruthy();
    expect(hasClass(el(), Classes.BASIC)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders children', () => {
    mount({});

    expect(el().children.length).toBe(1);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  describe('menu-item', () => {
    // Menu composes Button, no need to re-test

    it('Renders right icon when submenu specified', () => {
      const submenu = m(Menu, m(MenuItem));

      mount({}, { submenu });

      expect(hasChildClass(menuItem(), `${Classes.ICON}-${Icons.CHEVRON_RIGHT}`)).toBeTruthy();
    });

    it('Passes through Popover attrs to submenu', async () => {
      const submenu = m(Menu, m(MenuItem));

      mount({}, {
        submenu,
        popoverMenuAttrs: {
          class: Classes.POSITIVE,
          style: 'color:red'
        }
      });

      menuItem().dispatchEvent(new MouseEvent('mouseenter'));

      await sleep(TIMEOUT);

      const popover = document.body.querySelector(`.${Classes.POPOVER}`) as HTMLElement;
      expect(hasClass(popover, Classes.POSITIVE)).toBeTruthy();
      expect(popover.style.color).toBe('red');
    });

    it('Triggers submenu popover on mouse hover', async () => {
      let count = 0;
      const submenu = m(Menu, m(MenuItem));

      mount({}, {
        submenu,
        popoverMenuAttrs: {
          onOpened: () => count++
        }
      });

      menuItem().dispatchEvent(new MouseEvent('mouseenter'));

      await sleep(TIMEOUT);

      expect(count).toBe(1);
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
