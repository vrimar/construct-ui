import m from 'mithril';
import assert from 'assert';
import { Overlay, IOverlayAttrs, Classes, Input, Keys } from '@/';
import { hasClass, hasChildClass } from '@test-utils';
import { setTimeout } from 'timers';

// TODO: look into race conditions
describe.skip('overlay', () => {
  const el = () => document.body.children[1] as HTMLElement;
  const overlay = () => document.body.querySelector(`.${Classes.OVERLAY}`) as HTMLElement;
  let container: HTMLElement;

  afterEach(() => {
    m.mount(container, null);
    document.body.innerHTML = '';
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

    assert(hasClass(el(), Classes.PORTAL));
  });

  it('Passes through attrs to portal', () => {
    mount({
      portalAttrs: {
        class: Classes.POSITIVE,
        style: 'color: red'
      }
    });

    assert(hasClass(el(), Classes.POSITIVE));
    assert.equal(el().style.color, 'red');
  });

  it('Renders children', () => {
    mount({ content: 'content' });

    assert(overlay().innerHTML.includes('content'));
  });

  it.skip('Renders inline', () => {
    mount({ inline: true });

    assert(!hasClass(el(), Classes.PORTAL));
  });

  it('Has backdrop by default', () => {
    mount({});

    assert(hasChildClass(overlay(), Classes.OVERLAY_BACKDROP));
  });

  it('Sets backdrop class', () => {
    mount({
      backdropClass: Classes.POSITIVE
    });

    const backdrop = el().querySelector(`.${Classes.OVERLAY_BACKDROP}`) as HTMLElement;

    assert(hasClass(backdrop, Classes.POSITIVE));
  });

  it('Sets autofocus', () => {
    mount({
      content: m(Input, { autofocus: true })
    });

    const input = overlay().querySelector('input');

    assert(input.autofocus);
  });

  it('hasBackdrop=false hides backdrop', () => {
    mount({ hasBackdrop: false });

    const backdrop = el().querySelector(`.${Classes.OVERLAY_BACKDROP}`);
    assert.equal(backdrop, null);
  });

  it('closeOnOutsideClick=true invokes onClose', done => {
    let count = 0;

    mount({
      closeOnOutsideClick: true,
      onClose: () => count++
    });

    const backdrop = el().querySelector(`.${Classes.OVERLAY_BACKDROP}`);
    backdrop.dispatchEvent(new Event('mousedown'));

    assert.equal(count, 1);

    setTimeout(done, 65);
  });

  it('Handles closeOnEscapeKey', done => {
    let count = 0;

    mount({
      onClose: () => count++,
      closeOnEscapeKey: true
    });

    document.dispatchEvent(new KeyboardEvent('keydown', {
      which: Keys.ESCAPE
    } as any));

    setTimeout(done, 65);
  });

  it('Handles lifecycle callbacks', done => {
    let count = 0;

    const component = mount({
      onOpened: () => count++,
      onClosed: () => count++
    });

    setTimeout(() => {
      component.isOpen = false;
      m.redraw();

      setTimeout(() => {
        assert.equal(count, 2);
        done();
      }, 10);
    }, 65);
  });

  function mount(attrs: IOverlayAttrs) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    container = div;

    const component = {
      isOpen: true,
      view: (vnode: any) => m(Overlay, {
        isOpen: vnode.state.isOpen,
        transitionDuration: 0,
        ...attrs
      })
    };

    m.mount(div, component);

    return component;
  }
});
