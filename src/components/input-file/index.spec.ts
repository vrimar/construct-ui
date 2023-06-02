import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
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

    expect(hasClass(el(), Classes.INPUT_FILE)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(hasClass(el(), Classes.FLUID)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders browse button', () => {
    mount({});

    expect(hasChildClass(el(), Classes.INPUT_FILE_BUTTON)).toBeTruthy();
  });

  it('Renders file text container', () => {
    mount({});

    expect(hasChildClass(el(), Classes.INPUT_FILE_CONTENT)).toBeTruthy();
  });

  it('Renders left content', () => {
    mount({
      contentLeft: m(Tag)
    });

    const tag = el().querySelector(`.${Classes.TAG}`) as HTMLElement;

    expect(hasChildClass(el(), Classes.TAG)).toBeTruthy();
    expect(el().firstChild).toBe(tag);
  });

  it('Renders right content', () => {
    mount({
      contentRight: m(Icon, { name: Icons.ACTIVITY })
    });

    const icon = el().querySelector(`.${Classes.ICON}`) as HTMLElement;

    expect(hasChildClass(el(), Classes.ICON)).toBeTruthy();
    expect(el().lastChild).toBe(icon);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(input().hasAttribute('id')).toBeTruthy();
    expect(input().hasAttribute('name')).toBeTruthy();
  });

  function mount(attrs: IInputFileAttrs) {
    const component = {
      view: () => m(InputFile, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
