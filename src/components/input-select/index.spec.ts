import m from 'mithril';
import assert from 'assert';
import { Classes, InputSelect, IInputSelectAttrs } from '@/';
import { hasClass, TIMEOUT } from '@test-utils';

const items = ['1', '2', '3'];
const value = '1';

describe('input-select', () => {
  const el = () => document.body.querySelector(`.${Classes.INPUT_SELECT}`) as HTMLElement;
  const inputContainer = () => document.body.querySelector(`.${Classes.INPUT}`) as HTMLElement;
  const input = () => inputContainer().querySelector('input') as HTMLInputElement;

  afterEach(() => {
    document.body.innerHTML = '';
    m.mount(document.body, null);
  });

  it('Renders correctly', () => {
    mount();

    assert(input());
    assert(hasClass(el(), Classes.INPUT_SELECT));
  });

  it('Input value is set when closed', () => {
    mount({
      popoverAttrs: {
        defaultIsOpen: false,
        transitionDuration: 0
      },
      value
    });

    assert.equal(input().value, value);
  });

  it('Placeholder is set to value when open', () => {
    mount({ value });

    assert.notEqual(input().value, value);
    assert.equal(input().placeholder, value);
  });

  it('Focus opens list', done => {
    mount({
      popoverAttrs: {
        defaultIsOpen: false,
        transitionDuration: 0
      }
    });

    input().focus();

    setTimeout(() => {
      assert(el());
      done();
    }, TIMEOUT);
  });

  it('Passes through inputAttrs', () => {
    mount({
      inputAttrs: { class: Classes.POSITIVE }
    });

    assert(hasClass(inputContainer(), Classes.POSITIVE));
  });

  function mount(attrs?: Partial<IInputSelectAttrs<string>>) {
    const component = {
      view: () => m(InputSelect, {
        items,
        itemRender: (item: string) => m('', item),
        popoverAttrs: {
          transitionDuration: 0,
          defaultIsOpen: true
        },
        ...attrs
      })
    };

    m.mount(document.body, component);
    return component;
  }
});
