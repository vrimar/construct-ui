import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
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

    expect(hasClass(el(), Classes.FORM)).toBeTruthy();
    expect(el().tagName).toBe('FORM');
    expect(el().style.color).toBe('red');
  });

  function mount(attrs: IFormAttrs) {
    const component = {
      view: () => m(Form, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
