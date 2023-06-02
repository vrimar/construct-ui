import m from 'mithril';
import { describe, beforeEach, expect, it } from 'vitest';
import { ButtonGroup, Classes, IButtonGroupAttrs, Button } from '@/';
import { hasClass } from '@test-utils';

describe('button-group', () => {
  const el = () => document.body.firstChild as HTMLElement;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      basic: true,
      class: Classes.POSITIVE,
      fluid: true,
      intent: 'primary',
      rounded: true,
      outlined: true,
      size: 'xs',
      style: 'margin: 0'
    });

    expect(hasClass(el(), Classes.BUTTON_GROUP)).toBeTruthy();
    expect(hasClass(el(), Classes.BASIC)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.FLUID)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.ROUNDED)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();

    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders children', () => {
    mount({});

    const length = el().children.length;
    expect(length).toBe(2);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  function mount(attrs: IButtonGroupAttrs) {
    const component = {
      view: () => m(ButtonGroup, { ...attrs }, [
        m(Button, { label: 'label' }),
        m(Button, { label: 'label' })
      ])
    };

    m.mount(document.body, component);
  }
});
