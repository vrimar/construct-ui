import m from 'mithril';
import assert from 'assert';
import { Toaster, IToasterAttrs, Classes } from '@/';
import { TIMEOUT, hasClass, hasChildClass } from '@shared/test/utils';
import { Icons } from '../icon';

describe('toaster', () => {
  const el = () => document.body.querySelector(`.${Classes.TOASTER}`) as HTMLElement;
  const toast = () => el() && el().querySelector(`.${Classes.TOAST}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', done => {
    const position = 'bottom';
    const message = 'toast';

    const toaster = mountImperative({
      class: Classes.POSITIVE,
      style: 'color: red',
      inline: true,
      position
    });

    toaster.show({ message });

    setTimeout(() => {
      assert(hasClass(el(), Classes.TOASTER));
      assert(hasClass(el(), Classes.POSITIVE));
      assert(hasClass(el(), Classes.TOASTER_INLINE));
      assert(hasClass(el(), `${Classes.TOASTER}-${position}`));

      assert(toast().innerHTML.includes(message));
      assert.equal(el().style.color, 'red');
      done();
    }, TIMEOUT);
  });

  describe('Toast', () => {
    it('Renders correctly', done => {
      const message = 'toast';

      const toaster = mountImperative();

      toaster.show({
        message,
        icon: Icons.ACTIVITY,
        class: Classes.POSITIVE,
        style: 'color: red',
        id: 'id'
      });

      setTimeout(() => {
        assert(hasClass(toast(), Classes.TOAST));
        assert(hasClass(toast(), Classes.POSITIVE));

        assert(hasChildClass(toast(), Classes.TOAST_MESSAGE));
        assert(hasChildClass(toast(), `${Classes.ICON}-${Icons.ACTIVITY}`));

        // Check if dismiss icon present
        assert(hasChildClass(toast(), `${Classes.ICON}-${Icons.X}`));

        assert(toast().innerHTML.includes(message));
        assert.equal(toast().style.color, 'red');
        assert(toast().hasAttribute('id'));
        done();
      }, TIMEOUT);
    });

    it('Dismiss icon click calls onDismiss', done => {
      let count = 0;
      const toaster = mountImperative();

      toaster.show({
        onDismiss: () => count++
      });

      setTimeout(() => {
        const dismissIcon = toast().querySelector(`.${Classes.ICON}-${Icons.X}`)!;
        dismissIcon.dispatchEvent(new Event('click'));
        assert.equal(count, 1);
        done();
      }, TIMEOUT);
    });
  });

  describe('imperative', () => {
    it('show() toggles visiblity', done => {
      const toaster = mountImperative();

      toaster.show({ message: 'toast' });

      setTimeout(() => {
        assert(toast());
        done();
      }, TIMEOUT);
    });

    it('dismiss(key) hides toast', done => {
      const toaster = mountImperative();

      const key = toaster.show({ timeout: 1000 });

      setTimeout(() => {
        assert(el());
        toaster.dismiss(key);
        m.redraw.sync();
        assert(!el());
        done();
      }, TIMEOUT);
    });

    it('update(key) updates toast', done => {
      const toaster = mountImperative();
      const message = 'updated-message';

      const key = toaster.show({});

      setTimeout(() => {
        toaster.update(key, { message });
        m.redraw.sync();
        assert(toast().innerHTML.includes(message));
        done();
      }, TIMEOUT);
    });

    it('clear() dismisses all toasts', done => {
      const toaster = mountImperative();

      toaster.show({});

      setTimeout(() => {
        toaster.clear();
        m.redraw.sync();
        assert(!el());
        done();
      }, TIMEOUT);
    });
  });

  it('Correctly handles timeout', done => {
    const toaster = mountImperative();
    const timeout = 100;

    toaster.show({ timeout });

    setTimeout(() => {
      m.redraw.sync();
      assert(toast());

      setTimeout(() => {
        assert(!el());
        done();
      }, timeout);
    }, TIMEOUT);
  });

  function mountImperative(attrs?: Partial<IToasterAttrs>) {
    const toaster = new Toaster();
    const component = {
      view: () => m(toaster, {
        position: 'top',
        ...attrs
      })
    };

    m.mount(document.body, component);
    return toaster;
  }
});
