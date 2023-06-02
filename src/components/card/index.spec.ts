import m from 'mithril';
import { describe, beforeEach, expect, it } from 'vitest';
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

    expect(hasClass(el(), Classes.CARD)).toBeTruthy();
    expect(hasClass(el(), Classes.CARD_INTERACTIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.FLUID)).toBeTruthy();
    expect(hasClass(el(), `${Classes.ELEVATION}-2`)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Passes through html attrs', () => {
    mount({ id: 1, name: 'name' });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  function mount(attrs: ICardAttrs) {
    const component = {
      view: () => m(Card, { ...attrs })
    };

    m.mount(document.body, component);
  }
});
