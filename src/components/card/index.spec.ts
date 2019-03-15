import m from 'mithril';
import assert from 'assert';
import { Card, Classes, ICardAttrs } from '@/';
import { hasClass } from '@test-utils';

describe('card', () => {
  const el = () => document.body.firstChild as HTMLElement;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      elevation: 2,
      fluid: true,
      interactive: true,
      size: 'xs',
      style: 'margin: 0'
    });

    assert(hasClass(el(), Classes.CARD));
    assert(hasClass(el(), Classes.CARD_INTERACTIVE));
    assert(hasClass(el(), Classes.FLUID));
    assert(hasClass(el(), `${Classes.ELEVATION}-2`));
    assert(hasClass(el(), Classes.XS));
    assert(el().hasAttribute('style'));
  });

  it('Passes through html attrs', () => {
    mount({ id: 1, name: 'name' });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  function mount(attrs: ICardAttrs) {
    const component = {
      view: () => m(Card, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
