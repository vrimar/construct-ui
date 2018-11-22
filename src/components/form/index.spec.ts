import m from 'mithril';
import assert from 'assert';
import { Form, IFormAttrs, Classes } from '@/';
import { hasClass } from '@test-utils';

// TODO: add FormGroup tests
describe('form', () => {
  const el = () => document.body.firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.FORM,
      style: 'color: red'
    });

    assert(hasClass(el(), Classes.FORM));
    assert.equal(el().tagName, 'FORM');
    assert.equal(el().style.color, 'red');
  });

  function mount(attrs: IFormAttrs) {
    const component = {
      view: () => m(Form, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
