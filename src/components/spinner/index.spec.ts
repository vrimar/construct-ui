import m from 'mithril';
import assert from 'assert';
import { Spinner, ISpinnerAttrs, Classes } from '@/';
import { hasClass } from '@test-utils';

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

    assert(hasClass(el(), Classes.SPINNER_ACTIVE));
    assert(hasClass(el(), Classes.SPINNER_BG));
    assert(hasClass(el(), Classes.SPINNER_FILL));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.XS));
    assert(el().hasAttribute('style'));
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  function mount(attrs?: ISpinnerAttrs) {
    const component = {
      view: () => m(Spinner, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
