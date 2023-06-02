import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Dialog, IDialogAttrs, Classes } from '@/';
import { hasChildClass, hasClass } from '@test-utils';

describe('dialog', () => {
  const dialog = () => document.body.querySelector(`.${Classes.DIALOG}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      basic: true,
      class: Classes.POSITIVE,
      style: 'color: red'
    });

    expect(hasClass(dialog(), Classes.BASIC)).toBeTruthy();
    expect(hasClass(dialog(), Classes.POSITIVE)).toBeTruthy();
    expect(dialog().style.color).toBe('red');
  });

  it('Renders children', () => {
    mount({
      content: 'content',
      footer: 'footer',
      title: 'title'
    });

    expect(hasChildClass(dialog(), Classes.DIALOG_BODY));
    expect(hasChildClass(dialog(), Classes.DIALOG_HEADER));
    expect(hasChildClass(dialog(), Classes.DIALOG_FOOTER));
  });

  it('hasCloseButton=false hides close button', () => {
    mount({
      title: 'Title',
      hasCloseButton: false
    });

    expect(hasChildClass(dialog(), Classes.DIALOG_CLOSE_BUTTON)).toBeFalsy();
  });

  it('Close button click calls onClose', () => {
    let count = 0;

    mount({
      title: 'Title',
      onClose: () => count++
    });

    const backdrop = dialog().querySelector(`.${Classes.DIALOG_CLOSE_BUTTON}`)!;
    backdrop.dispatchEvent(new Event('click'));

    expect(count).toBe(1);
  });

  it('Header hidden when no title attr', () => {
    mount({
      content: 'content',
      footer: 'footer'
    });

    expect(!hasChildClass(dialog(), Classes.DIALOG_HEADER));
  });

  it('Footer hidden when no footer attr', () => {
    mount({ content: 'content' });

    expect(!hasChildClass(dialog(), Classes.DIALOG_FOOTER));
  });

  function mount(attrs: IDialogAttrs) {
    const component = {
      view: () => m(Dialog, {
        isOpen: true,
        ...attrs
      })
    };

    m.mount(document.body, component);
  }
});
