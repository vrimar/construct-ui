import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Table, ITableAttrs, Classes } from '@/';
import { hasClass } from '@test-utils';

describe('table', () => {
  const el = () => document.body.firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      bordered: true,
      interactive: true,
      striped: true,
      style: 'color: red'
    });

    expect(hasClass(el(), Classes.TABLE)).toBeTruthy();
    expect(hasClass(el(), Classes.TABLE_BORDERED)).toBeTruthy();
    expect(hasClass(el(), Classes.TABLE_INTERACTIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.TABLE_STRIPED)).toBeTruthy();

    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  function mount(attrs: ITableAttrs, children?: m.Children) {
    const component = {
      view: () => m(Table, { ...attrs }, children)
    };
    m.mount(document.body, component);
  }
});
