import m from 'mithril';
import assert from 'assert';
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

    assert(hasClass(popover(), Classes.POPOVER_MENU));
    assert(hasChildClass(popover(), Classes.MENU));
  });

  function mount(attrs: IPopoverMenuAttrs) {
    const component = {
      view: () => m(PopoverMenu, {
        transitionDuration: 0,
        trigger: m(``),
        ...attrs
      })
    };

    m.mount(document.body, component);
    return component;
  }
});
