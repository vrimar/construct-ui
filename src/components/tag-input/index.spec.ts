import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Tag, TagInput, ITagInputAttrs, Classes, Keys } from '@/';
import { hasClass, hasChildClass, keyboardEvent as simulateKeyDown } from '@shared/test/utils';
import { Button } from '../button';

describe('tag-input', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const input = () => el().querySelector('input') as HTMLInputElement;
  const button = () => el().querySelector(`.${Classes.BUTTON}`) as HTMLElement;

  afterEach(() => {
    document.body.innerHTML = '';

    m.mount(document.body, null);
  });

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      fluid: true,
      intent: 'primary',
      size: 'xs',
      style: 'color: red'
    });

    expect(hasClass(el(), Classes.TAG_INPUT)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(hasClass(el(), Classes.FLUID)).toBeTruthy();
    expect(el().style.color).toBe('red');
  });

  it('Renders child tags', () => {
    mount();

    const tags = el().querySelectorAll(`.${Classes.TAG}`);

    expect(tags.length).toBe(2);
  });

  it('Renders left content', () => {
    mount({ contentLeft: m(Button) });

    expect(hasChildClass(el(), Classes.BUTTON)).toBeTruthy();
    expect(el().firstChild).toBe(button());
  });

  it('Renders right content', () => {
    mount({ contentRight: m(Button) });

    expect(hasChildClass(el(), Classes.BUTTON));
    expect(el().lastChild).toBe(button());
  });

  it('Clicking should focus input', () => {
    mount();

    el().dispatchEvent(new Event('click'));
    expect(input()).toBe(document.activeElement);
  });

  it('disabled=true should prevent input focus on click', () => {
    mount({ disabled: true });
    el().dispatchEvent(new Event('click'));
    expect(input()).not.toBe(document.activeElement);
  });

  it('ENTER key calls onAdd when input has value ', () => {
    let count = 0;
    mount({ onAdd: () => count++ });

    input().value = 'test';
    input().focus();
    simulateKeyDown(input(), Keys.ENTER);
    expect(count).toBe(1);
  });

  it('addOnBlur=true calls onAdd when input loses focus', () => {
    let count = 0;
    mount({
      addOnBlur: true,
      onAdd: () => count++
    });

    input().value = 'test';
    input().focus();
    input().blur();

    expect(count).toBe(1);
  });

  it('passes through inputAttrs', () => {
    const name = 'test';

    mount({
      inputAttrs: {
        name,
        id: name
      }
    });

    expect(input().name).toBe(name);
    expect(input().id).toBe(name);
  });

  function mount(attrs?: Partial<ITagInputAttrs>) {
    const tags = [
      m(Tag, { label: '1' }),
      m(Tag, { label: '2' })
    ];

    const component = {
      view: () => m(TagInput, {
        tags,
        ...attrs
      })
    };

    m.mount(document.body, component);
  }
});
