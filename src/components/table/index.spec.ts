import m from 'mithril';
import assert from 'assert';
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

    assert(hasClass(el(), Classes.TABLE));
    assert(hasClass(el(), Classes.TABLE_BORDERED));
    assert(hasClass(el(), Classes.TABLE_INTERACTIVE));
    assert(hasClass(el(), Classes.TABLE_STRIPED));

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

  function mount(attrs: ITableAttrs, children?: m.Children) {
    const component = {
      view: () => m(Table, { ...attrs }, children)
    };
    m.mount(document.body, component);
  }
});
