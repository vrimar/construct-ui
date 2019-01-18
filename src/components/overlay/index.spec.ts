import m from 'mithril';
import assert from 'assert';
import { Overlay, IOverlayAttrs, Classes, Input, Keys } from '@/';
import { hasClass, TIMEOUT, triggerEvent, timeoutRedraw } from '@test-utils';

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

    assert(hasClass(overlay(), Classes.POSITIVE));
    assert.equal(overlay().style.color, 'red');
  });

  it('Renders portal correctly', () => {
    mount({});

    assert(hasClass(portal(), Classes.PORTAL));
  });

  it('Passes through attrs to portal', () => {
    mount({
      portalAttrs: {
        class: Classes.POSITIVE,
        style: 'color: red'
      }
    });

    assert(hasClass(portal(), Classes.POSITIVE));
    assert.equal(portal().style.color, 'red');
  });

  it('Renders content', () => {
    mount({ content: 'content' });

    assert(overlay().innerHTML.includes('content'));
  });

  it('Renders inline', () => {
    mount({ inline: true });

    assert(!portal());
  });

  it('Has backdrop by default', () => {
    mount({});

    assert(backdrop());
  });

  it('Sets backdrop class', () => {
    mount({
      backdropClass: Classes.POSITIVE
    });

    assert(hasClass(backdrop(), Classes.POSITIVE));
  });

  it('hasBackdrop=false hides backdrop', () => {
    mount({ hasBackdrop: false });
    assert(!backdrop());
  });

  it('Sets autofocus', () => {
    mount({
      content: m(Input, { autofocus: true })
    });

    const input = overlay().querySelector('input');

    assert(input.autofocus);
  });

  it('closeOnOutsideClick=true invokes onClose', (done) => {
    let count = 0;

    mount({
      closeOnOutsideClick: true,
      onClose: () => count++
    });

    triggerEvent(backdrop(), 'mousedown', () => {
      assert.equal(count, 1);
      done();
    });
  });

  it('Handles closeOnEscapeKey', () => {
    let count = 0;

    mount({
      onClose: () => count++,
      closeOnEscapeKey: true
    });

    document.dispatchEvent(new KeyboardEvent('keydown', { which: Keys.ESCAPE } as any));

    assert.equal(count, 1);
  });

  it('Handles lifecycle callbacks', done => {
    let count = 0;

    const component = mount({
      onOpened: () => count++,
      onClosed: () => count++
    });

    timeoutRedraw(
      () => component.isOpen = false,
      () => {
        assert.equal(count, 2);
        done();
      }
    );
  });

  it('onClosed called when transitionDuration finishes', done => {
    let count = 0;
    const transitionDuration = 50;

    const component = mount({
      onClosed: () => count++,
      transitionDuration
    });

    setTimeout(() => {
      component.isOpen = false;
      m.redraw();

      setTimeout(() => {
        assert.equal(count, 1);
        done();
      }, transitionDuration);

    }, TIMEOUT);
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
