import m from 'mithril';
import assert from 'assert';
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

    assert(hasClass(el(), Classes.TAG_INPUT));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.XS));
    assert(hasClass(el(), Classes.FLUID));
    assert.equal(el().style.color, 'red');
  });

  it('Renders child tags', () => {
    mount();

    const tags = el().querySelectorAll(`.${Classes.TAG}`);

    assert.equal(tags.length, 2);
  });

  it('Renders left content', () => {
    mount({ contentLeft: m(Button) });

    assert(hasChildClass(el(), Classes.BUTTON));
    assert(el().firstChild === button());
  });

  it('Renders right content', () => {
    mount({ contentRight: m(Button) });

    assert(hasChildClass(el(), Classes.BUTTON));
    assert(el().lastChild === button());
  });

  it('Clicking should focus input', () => {
    mount();

    el().dispatchEvent(new Event('click'));
    assert.equal(input(), document.activeElement);
  });

  it('disabled=true should prevent input focus on click', () => {
    mount({ disabled: true });
    el().dispatchEvent(new Event('click'));
    assert.notEqual(input(), document.activeElement);
  });

  it('ENTER key calls onAdd when input has value ', () => {
    let count = 0;
    mount({ onAdd: () => count++ });

    input().value = 'test';
    input().focus();
    simulateKeyDown(input(), Keys.ENTER);
    assert.equal(count, 1);
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

    assert.equal(count, 1);
  });

  it('passes through inputAttrs', () => {
    const name = 'test';

    mount({
      inputAttrs: {
        name,
        id: name
      }
    });

    assert.equal(input().name, name);
    assert.equal(input().id, name);
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
