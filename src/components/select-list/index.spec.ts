import m from 'mithril';
import assert from 'assert';
import { Classes, SelectList, ISelectListAttrs, Button } from '@/';
import { hasClass, hasChildClass, TIMEOUT } from '@test-utils';

const items = ['1', '2', '3'];

describe('select-list', () => {
  const el = () => document.body.querySelector(`.${Classes.SELECT_LIST}`) as HTMLElement;
  const popover = () => document.body.querySelector(`.${Classes.POPOVER}`) as HTMLElement;

  afterEach(() => {
    document.body.innerHTML = '';
    m.mount(document.body, null);
  });

  it('Renders correctly', () => {
    mount();

    assert(hasClass(el(), Classes.SELECT_LIST));
  });

  it('Renders header', () => {
    const header = 'header';
    mount({ header });

    assert(el().innerHTML.includes(header));
  });

  it('Renders footer', () => {
    const footer = 'footer';
    mount({ footer });

    assert(el().innerHTML.includes(footer));
  });

  it('Sets loading class', () => {
    mount({ loading: true });

    assert(hasChildClass(el(), Classes.SPINNER_ACTIVE));
  });

  it('closeOnSelect=true closes popover on item click', (done) => {
    mount({ closeOnSelect: true });

    const item = el().querySelector(`.${Classes.LIST}`).firstChild;
    item.dispatchEvent(new Event('click'));

    setTimeout(() => {
      m.redraw();
      assert(!el());
      done();
    }, TIMEOUT);
  });

  it('Passes through popoverAttrs', () => {
    mount({
      popoverAttrs: {
        class: Classes.POSITIVE,
        defaultIsOpen: true,
        transitionDuration: 0
      }
    });

    assert(hasClass(popover(), Classes.POSITIVE));
  });

  function mount(attrs?: Partial<ISelectListAttrs<any>>) {
    const component = {
      view: () => m(SelectList, {
        items,
        itemRender: (item: string) => m('', item),
        trigger: m(Button),
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
