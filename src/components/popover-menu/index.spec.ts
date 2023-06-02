import m from 'mithril';
import { describe, expect, it } from 'vitest';
import { Classes, IPopoverMenuAttrs } from '@/';
import { PopoverMenu } from '.';
import { MenuItem } from '../menu';
import { hasChildClass, hasClass } from '@shared/test/utils';

describe('popover-menu', () => {
  const popover = () => document.body.querySelector(`.${Classes.POPOVER}`) as HTMLElement;

  it('Renders correctly', () => {
    mount({
      defaultIsOpen: true,
      content: [
        m(MenuItem, { label: 'Test' })
      ]
    });

    expect(hasClass(popover(), Classes.POPOVER_MENU)).toBeTruthy();
    expect(hasChildClass(popover(), Classes.MENU)).toBeTruthy();
  });

  function mount(attrs: Partial<IPopoverMenuAttrs>) {
    const component = {
      view: () => m(PopoverMenu, {
        transitionDuration: 0,
        trigger: m(''),
        content: '',
        ...attrs
      })
    };

    m.mount(document.body, component);
    return component;
  }
});
