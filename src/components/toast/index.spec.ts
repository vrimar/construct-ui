import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Toaster, IToasterAttrs, Classes } from '@/';
import { TIMEOUT, hasClass, hasChildClass, sleep } from '@shared/test/utils';
import { Icons } from '../icon';

describe('toaster', () => {
  const el = () => document.body.querySelector(`.${Classes.TOASTER}`) as HTMLElement;
  const toast = () => el() && el().querySelector(`.${Classes.TOAST}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', async () => {
    const position = 'bottom';
    const message = 'toast';

    const toaster = mountImperative({
      class: Classes.POSITIVE,
      style: 'color: red',
      inline: true,
      position
    });

    toaster.show({ message });
    await sleep(TIMEOUT);

    expect(hasClass(el(), Classes.TOASTER)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.TOASTER_INLINE)).toBeTruthy();
    expect(hasClass(el(), `${Classes.TOASTER}-${position}`)).toBeTruthy();

    expect(toast().innerHTML.includes(message)).toBeTruthy();
    expect(el().style.color).toBe('red');
  });

  describe('Toast', () => {
    it('Renders correctly', async () => {
      const message = 'toast';

      const toaster = mountImperative();

      toaster.show({
        message,
        icon: Icons.ACTIVITY,
        class: Classes.POSITIVE,
        style: 'color: red',
        id: 'id'
      });

      await sleep(TIMEOUT);

      expect(hasClass(toast(), Classes.TOAST)).toBeTruthy();
      expect(hasClass(toast(), Classes.POSITIVE)).toBeTruthy();

      expect(hasChildClass(toast(), Classes.TOAST_MESSAGE)).toBeTruthy();
      expect(hasChildClass(toast(), `${Classes.ICON}-${Icons.ACTIVITY}`)).toBeTruthy();

      // Check if dismiss icon present
      expect(hasChildClass(toast(), `${Classes.ICON}-${Icons.X}`)).toBeTruthy();

      expect(toast().innerHTML.includes(message)).toBeTruthy();
      expect(toast().style.color).toBe('red');
      expect(toast().hasAttribute('id')).toBeTruthy();
    });

    it('Dismiss icon click calls onDismiss', async () => {
      let count = 0;
      const toaster = mountImperative();

      toaster.show({
        onDismiss: () => count++
      });

      await sleep(TIMEOUT);

      const dismissIcon = toast().querySelector(`.${Classes.ICON}-${Icons.X}`)!;
      dismissIcon.dispatchEvent(new Event('click'));
      expect(count).toBe(1);
    });
  });

  describe('imperative', () => {
    it('show() toggles visiblity', async () => {
      const toaster = mountImperative();

      toaster.show({ message: 'toast' });

      await sleep(TIMEOUT);
      expect(toast()).toBeTruthy();
    });

    it('dismiss(key) hides toast', async () => {
      const toaster = mountImperative();

      const key = toaster.show({ timeout: 1000 });

      await sleep(TIMEOUT);

      expect(el()).toBeTruthy();
      toaster.dismiss(key);
      m.redraw.sync();
      expect(el()).toBeFalsy();
    });

    it('update(key) updates toast', async () => {
      const toaster = mountImperative();
      const message = 'updated-message';

      const key = toaster.show({});
      await sleep(TIMEOUT);

      toaster.update(key, { message });
      m.redraw.sync();
      expect(toast().innerHTML.includes(message)).toBeTruthy();
    });

    it('clear() dismisses all toasts', async () => {
      const toaster = mountImperative();

      toaster.show({});
      await sleep(TIMEOUT);

      toaster.clear();
      m.redraw.sync();
      expect(el()).toBeFalsy();
    });
  });

  it('Correctly handles timeout', async () => {
    const toaster = mountImperative();
    const timeout = 100;

    toaster.show({ timeout });

    await sleep(TIMEOUT);

    m.redraw.sync();
    expect(toast()).toBeTruthy();

    await sleep(timeout);

    expect(el()).toBeFalsy();
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
