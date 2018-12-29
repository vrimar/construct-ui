import m from 'mithril';
import assert from 'assert';
import { Dialog, IDialogAttrs, Classes } from '@/';
import { hasChildClass, hasClass } from '@test-utils';

describe('dialog', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const dialog = () => el().querySelector(`.${Classes.DIALOG}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'color: red'
    });

    assert(hasClass(dialog(), Classes.POSITIVE));
    assert.equal(dialog().style.color, 'red');
  });

  it('Renders children', () => {
    mount({
      content: 'content',
      footer: 'footer',
      title: 'title'
    });

    assert(hasChildClass(dialog(), Classes.DIALOG_BODY));
    assert(hasChildClass(dialog(), Classes.DIALOG_HEADER));
    assert(hasChildClass(dialog(), Classes.DIALOG_FOOTER));
  });

  it('hasCloseButton=false hides close button', () => {
    mount({
      title: 'Title',
      hasCloseButton: false
    });

    assert(!hasChildClass(dialog(), Classes.DIALOG_CLOSE_BUTTON));
  });

  it('Close button click calls onClose', () => {
    let count = 0;

    mount({
      title: 'Title',
      onClose: () => count++
    });

    const backdrop = dialog().querySelector(`.${Classes.DIALOG_CLOSE_BUTTON}`);
    backdrop.dispatchEvent(new Event('click'));

    assert.equal(count, 1);
  });

  it('Header hidden when no title attr', () => {
    mount({
      content: 'content',
      footer: 'footer'
    });

    assert(!hasChildClass(dialog(), Classes.DIALOG_HEADER));
  });

  it('Footer hidden when no footer attr', () => {
    mount({ content: 'content' });

    assert(!hasChildClass(dialog(), Classes.DIALOG_FOOTER));
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
