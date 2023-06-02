import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { TextArea, ITextAreaAttrs, Classes } from '@/';
import { hasClass } from '@test-utils';

describe('textarea', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const textarea = () => el().querySelector('textarea') as HTMLTextAreaElement;

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

    expect(hasClass(el(), Classes.INPUT)).toBeTruthy();
    expect(hasClass(el(), Classes.BASIC)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(hasClass(el(), Classes.FLUID)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name',
      defaultValue: 'defaultValue'
    });

    expect(textarea().hasAttribute('id')).toBeTruthy();
    expect(textarea().hasAttribute('name')).toBeTruthy();
    expect(textarea().value).toBe('defaultValue');
  });

  function mount(attrs: ITextAreaAttrs) {
    const component = {
      view: () => m(TextArea, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
