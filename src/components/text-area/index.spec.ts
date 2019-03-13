import m from 'mithril';
import assert from 'assert';
import { TextArea, ITextAreaAttrs, Classes } from '@/';
import { hasClass } from '@test-utils';

describe('textarea', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const textarea = () => el().querySelector('textarea');

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      basic: true,
      class: Classes.POSITIVE,
      style: 'color:red',
      intent: 'primary',
      size: 'xs',
      fluid: true
    });

    assert(hasClass(el(), Classes.INPUT));
    assert(hasClass(el(), Classes.BASIC));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.XS));
    assert(hasClass(el(), Classes.FLUID));
    assert(el().hasAttribute('style'));
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name',
      defaultValue: 'defaultValue'
    });

    assert(textarea().hasAttribute('id'));
    assert(textarea().hasAttribute('name'));
    assert.equal(textarea().value, 'defaultValue');
  });

  function mount(attrs: ITextAreaAttrs) {
    const component = {
      view: () => m(TextArea, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
