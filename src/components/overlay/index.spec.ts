import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Overlay, IOverlayAttrs, Classes, Input, Keys } from '@/';
import { hasClass, sleep, TIMEOUT, triggerEvent } from '@test-utils';

describe('overlay', () => {
  const portal = () => document.body.querySelector(`.${Classes.PORTAL}`) as HTMLElement;
  const overlay = () => document.body.querySelector(`.${Classes.OVERLAY}`) as HTMLElement;
  const backdrop = () => overlay().querySelector(`.${Classes.OVERLAY_BACKDROP}`) as HTMLElement;

  afterEach(() => {
    document.body.innerHTML = '';
    m.mount(document.body, null);
  });

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'color: red'
    });

    expect(hasClass(overlay(), Classes.POSITIVE)).toBeTruthy();
    expect(overlay().style.color).toBe('red');
  });

  it('Renders portal correctly', () => {
    mount({});

    expect(hasClass(portal(), Classes.PORTAL)).toBeTruthy();
  });

  it('Passes through attrs to portal', () => {
    mount({
      portalAttrs: {
        class: Classes.POSITIVE,
        style: 'color: red'
      }
    });

    expect(hasClass(portal(), Classes.POSITIVE)).toBeTruthy();
    expect(portal().style.color).toBe('red');
  });

  it('Renders content', () => {
    mount({ content: 'content' });

    expect(overlay().innerHTML.includes('content')).toBeTruthy();
  });

  it('Renders inline', () => {
    mount({ inline: true });

    expect(portal()).toBeFalsy();
  });

  it('Has backdrop by default', () => {
    mount({});

    expect(backdrop()).toBeTruthy();
  });

  it('Sets backdrop class', () => {
    mount({
      backdropClass: Classes.POSITIVE
    });

    expect(hasClass(backdrop(), Classes.POSITIVE)).toBeTruthy();
  });

  it('hasBackdrop=false hides backdrop', () => {
    mount({ hasBackdrop: false });
    expect(backdrop()).toBeFalsy();
  });

  it('Sets autofocus', () => {
    mount({
      content: m(Input, { autofocus: true })
    });

    const input = overlay().querySelector('input') as HTMLInputElement;

    expect((input as any).autofocus).toBeTruthy();
  });

  it('closeOnOutsideClick=true invokes onClose', async () => {
    let count = 0;

    mount({
      closeOnOutsideClick: true,
      onClose: () => count++
    });

    await triggerEvent(backdrop(), 'mousedown');
    expect(count).toBe(1);
  });

  it('Handles closeOnEscapeKey', () => {
    let count = 0;

    mount({
      onClose: () => count++,
      closeOnEscapeKey: true
    });

    document.dispatchEvent(new KeyboardEvent('keydown', { which: Keys.ESCAPE } as any));

    expect(count).toBe(1);
  });

  it('Handles lifecycle callbacks', async () => {
    let count = 0;

    const component = mount({
      onOpened: () => count++,
      onClosed: () => count++
    });

    component.isOpen = false;
    m.redraw();

    await sleep(TIMEOUT);

    expect(count).toBe(2);
  });

  it('onClosed called when transitionDuration finishes', async () => {
    let count = 0;
    const transitionDuration = 100;

    const component = mount({
      onClosed: () => count++,
      transitionDuration
    });

    component.isOpen = false;
    m.redraw();

    await sleep(transitionDuration + TIMEOUT);
    expect(count).toBe(1);
  });

  function mount(attrs: IOverlayAttrs) {
    const component = {
      isOpen: true,
      view: (vnode: any) => m(Overlay, {
        addToStack: false,
        isOpen: vnode.state.isOpen,
        transitionDuration: 0,
        ...attrs
      })
    };

    m.mount(document.body, component);
    return component;
  }
});
