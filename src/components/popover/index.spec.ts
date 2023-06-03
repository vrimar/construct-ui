import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Popover, Classes, IPopoverAttrs, Button, IButtonAttrs } from '@/';
import { hasClass, hasChildClass, triggerEvent, sleep, TIMEOUT } from '@test-utils';

const triggerClass = 'TRIGGER';
const content = 'popover-test-content';

describe('popover', () => {
  const overlay = () => document.body.querySelector(`.${Classes.OVERLAY}`) as HTMLElement;
  const popover = () => document.body.querySelector(`.${Classes.POPOVER}`) as HTMLElement;
  const trigger = () => document.body.querySelector(`.${triggerClass}`) as HTMLElement;

  afterEach(() => {
    document.body.innerHTML = '';
    m.mount(document.body, null);
  });

  it('Renders correctly when closed', () => {
    mount({});
    expect(trigger()).toBeTruthy();
    expect(popover()).toBeFalsy();
  });

  it('Renders correctly when open', () => {
    mount({
      defaultIsOpen: true,
      class: Classes.POSITIVE,
      style: 'color: red'
    });

    expect(hasChildClass(popover(), Classes.POPOVER_ARROW)).toBeTruthy();
    expect(hasChildClass(popover(), Classes.POPOVER_CONTENT)).toBeTruthy();
    expect(hasClass(popover(), Classes.POSITIVE)).toBeTruthy();
    expect(popover().style.color).toBe('red');
  });

  it('Renders content', () => {
    mount({
      defaultIsOpen: true,
      content
    });
    expect(popover().innerHTML.includes(content)).toBeTruthy();
  });

  it('Initially open when defaultIsOpen=true', () => {
    mount({ defaultIsOpen: true });

    expect(popover()).toBeTruthy();
  });

  describe('interactionType=click', () => {
    it('trigger click opens popover', async () => {
      mount({});

      await triggerEvent(trigger(), 'click');
      expect(popover()).toBeTruthy();
    });

    it('trigger click closes popover when open', async () => {
      mount({
        defaultIsOpen: true
      });

      await triggerEvent(trigger(), 'click');
      expect(!popover()).toBeTruthy();
    });

    it('outside click closes popover when open', async () => {
      mount({
        defaultIsOpen: true
      });

      await triggerEvent(document.body, 'mousedown');
      expect(popover()).toBeFalsy();
    });

    it('trigger onclick is called', () => {
      let count = 0;

      mount({}, {
        onclick: () => count++
      });

      trigger().dispatchEvent(new Event('click'));
      expect(count).toBe(1);
    });
  });

  describe('interactionType=click-trigger', () => {
    it('trigger click opens popover', async () => {
      mount({ interactionType: 'click-trigger' });

      await triggerEvent(trigger(), 'click');
      expect(popover()).toBeTruthy();
    });

    it('trigger click closes popover when open', async () => {
      mount({
        defaultIsOpen: true,
        interactionType: 'click-trigger'
      });

      await triggerEvent(trigger(), 'click');
      expect(popover()).toBeFalsy();
    });

    it('outside click does not close popover when open', async () => {
      mount({
        defaultIsOpen: true,
        interactionType: 'click-trigger'
      });

      await triggerEvent(document.body, 'mousedown');
      expect(popover()).toBeTruthy();
    });
  });

  describe('interactionType=hover', () => {
    it('trigger hover opens popover', async () => {
      mount({
        interactionType: 'hover'
      });

      await triggerEvent(trigger(), 'mouseenter');
      expect(popover()).toBeTruthy();
    });

    // TODO: Add mouseleave tests

    it('trigger onmouseenter is called', () => {
      let count = 0;

      mount({ interactionType: 'hover' }, {
        onmouseenter: () => count++
      });

      trigger().dispatchEvent(new Event('mouseenter'));
      expect(count).toBe(1);
    });
  });

  it('closeOnContentClick=true triggers close', async () => {
    mount({
      defaultIsOpen: true,
      closeOnContentClick: true
    });

    await triggerEvent(popover(), 'click');
    expect(popover()).toBeFalsy();
  });

  it('Clicking on element with class=Classes.POPOVER_DISMISS triggers close', async () => {
    mount({
      defaultIsOpen: true,
      content: m(Button, {
        class: Classes.POPOVER_DISSMISS
      })
    });

    const button = popover().querySelector(`.${Classes.POPOVER_DISSMISS}`)!;

    await triggerEvent(button, 'click');
    expect(popover()).toBeFalsy();
  });

  it('Handles openOnTriggerFocus=true', async () => {
    mount({
      interactionType: 'hover',
      openOnTriggerFocus: true
    });

    await triggerEvent(trigger(), 'focus');
    expect(popover()).toBeTruthy();
  });

  it('hasArrow=false hides arrow', () => {
    mount({
      defaultIsOpen: true,
      hasArrow: false
    });

    expect(hasChildClass(popover(), Classes.POPOVER_ARROW)).toBeFalsy();
  });

  it('Passes through attrs to Overlay', () => {
    mount({
      defaultIsOpen: true,
      overlayClass: Classes.POSITIVE,
      overlayStyle: 'color: red'
    });

    expect(hasClass(overlay(), Classes.POSITIVE)).toBeTruthy();
    expect(overlay().style.color).toBe('red');
  });

  it('Correctly sets position', async () => {
    mount({
      defaultIsOpen: true,
      position: 'right'
    });

    await sleep(TIMEOUT);

    expect(popover().getAttribute('data-popper-placement')).toBe('right');
  });

  it('Correctly sets triggerActiveClass', () => {
    const triggerActiveClass = 'trigger-active';

    mount({
      defaultIsOpen: true,
      triggerActiveClass
    });

    expect(hasClass(trigger(), triggerActiveClass)).toBeTruthy();
  });

  // TODO: add controlled mode tests

  function mount(attrs: Partial<IPopoverAttrs>, triggerAttrs?: IButtonAttrs) {
    const component = {
      view: () => m(Popover, {
        content: m('', 'Test'),
        transitionDuration: 0,
        trigger: m(`.${triggerClass}`, triggerAttrs || {}),
        ...attrs
      })
    };

    m.mount(document.body, component);
    return component;
  }
});
