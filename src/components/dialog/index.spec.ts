import m from 'mithril';
import assert from 'assert';
import { Dialog, IDialogAttrs, Classes } from '@/';
import { hasChildClass } from '@test-utils';

describe('dialog', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const dialog = () => el().querySelector(`.${Classes.DIALOG}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  // TODO: dialog doesn't pass class/style correctly
  it.skip('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'color: red'
    });
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

  it('Header hidden when no title attrs', () => {
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
