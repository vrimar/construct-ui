import m from 'mithril';
import assert from 'assert';
import { Icon, IIconAttrs, Classes, Icons } from '@/';
import { hasClass } from '@test-utils';

describe('icon', () => {
  const el = () => document.body.firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      name: Icons.ACTIVITY,
      class: Classes.POSITIVE,
      intent: 'primary',
      style: 'color: red'
    });

    assert(hasClass(el(), Classes.ICON));
    assert(hasClass(el(), `${Classes.ICON}-${Icons.ACTIVITY}`));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(el().hasAttribute('style'));
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: Icons.ACTIVITY
    });

    assert(el().hasAttribute('id'));
  });

  it('Passing onclick sets interactive class', () => {
    mount({
      onclick: () => null,
      name: Icons.ACTIVITY
    });

    assert(hasClass(el(), Classes.ICON_ACTION));
  });

  function mount(attrs: IIconAttrs) {
    const component = {
      view: () => m(Icon, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
