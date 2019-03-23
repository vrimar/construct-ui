import m from 'mithril';
import assert from 'assert';
import { InputFile, IInputFileAttrs, Classes, Tag, Icon, Icons } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('input-file', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const input = () => el().querySelector('input') as HTMLInputElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'margin:0',
      intent: 'primary',
      size: 'xs',
      fluid: true
    });

    assert(hasClass(el(), Classes.INPUT_FILE));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.XS));
    assert(hasClass(el(), Classes.FLUID));
    assert(el().hasAttribute('style'));
  });

  it('Renders browse button', () => {
    mount({});

    assert(hasChildClass(el(), Classes.INPUT_FILE_BUTTON));
  });

  it('Renders file text container', () => {
    mount({});

    assert(hasChildClass(el(), Classes.INPUT_FILE_CONTENT));
  });

  it('Renders left content', () => {
    mount({
      contentLeft: m(Tag)
    });

    const tag = el().querySelector(`.${Classes.TAG}`) as HTMLElement;

    assert(hasChildClass(el(), Classes.TAG));
    assert(el().firstChild === tag);
  });

  it('Renders right content', () => {
    mount({
      contentRight: m(Icon, { name: Icons.ACTIVITY })
    });

    const icon = el().querySelector(`.${Classes.ICON}`) as HTMLElement;

    assert(hasChildClass(el(), Classes.ICON));
    assert(el().lastChild === icon);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(input().hasAttribute('id'));
    assert(input().hasAttribute('name'));
  });

  function mount(attrs: IInputFileAttrs) {
    const component = {
      view: () => m(InputFile, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
