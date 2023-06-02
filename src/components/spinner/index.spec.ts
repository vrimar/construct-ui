import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Spinner, ISpinnerAttrs, Classes } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('spinner', () => {
  const el = () => document.body.firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      active: true,
      background: true,
      fill: true,
      class: Classes.POSITIVE,
      intent: 'primary',
      size: 'xs',
      style: 'color: red'
    });

    expect(hasClass(el(), Classes.SPINNER_ACTIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.SPINNER_BG)).toBeTruthy();
    expect(hasClass(el(), Classes.SPINNER_FILL)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();

    expect(hasChildClass(el(), Classes.SPINNER_CONTENT)).toBeTruthy();
    expect(hasChildClass(el(), Classes.SPINNER_ICON)).toBeTruthy();
  });

  it('Renders message', () => {
    const message = 'Uploading files';
    mount({ message });

    expect(hasChildClass(el(), Classes.SPINNER_MESSAGE)).toBeTruthy();

    const messageEl = el().querySelector(`.${Classes.SPINNER_MESSAGE}`) as HTMLElement;
    expect(messageEl.innerHTML).toBe(message);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  function mount(attrs?: ISpinnerAttrs) {
    const component = {
      view: () => m(Spinner, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
