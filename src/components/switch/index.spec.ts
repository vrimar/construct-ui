import m from 'mithril';
import { describe, beforeEach, expect, it } from 'vitest';
import { Switch, Classes } from '@/';
import { hasClass, hasChildClass } from '@test-utils';
import { IControlAttrs } from '../base-control';

// TODO: Combine radio, input, checkbox into one test
describe('switch', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const input = () => el().querySelector('input') as HTMLInputElement;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      intent: 'primary',
      label: 'label',
      size: 'xs',
      style: 'margin: 0'
    });

    expect(hasClass(el(), Classes.CONTROL)).toBeTruthy();
    expect(hasClass(el(), Classes.SWITCH)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();

    expect(hasChildClass(el(), Classes.CONTROL_INDICATOR)).toBeTruthy();

    expect(el().innerHTML.includes('label')).toBeTruthy();
  });

  it('Passes through attrs to input', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(input().hasAttribute('id')).toBeTruthy();
    expect(input().hasAttribute('name')).toBeTruthy();
  });

  it('Handles defaultChecked', () => {
    mount({ defaultChecked: true });

    expect(input().checked).toBeTruthy();
  });

  it('Handles disabled', () => {
    mount({ disabled: true });

    el().dispatchEvent(new Event('click'));

    expect(input().checked).toBeFalsy();
  });

  it('Handles readonly', () => {
    mount({ readonly: true });

    el().dispatchEvent(new Event('click'));

    expect(input().checked).toBeFalsy();
  });

  it('Handles onchange', () => {
    let count = 0;
    mount({ onchange: () => count++ });

    el().click();

    expect(count).toBe(1);
  });

  describe('controlled mode', () => {
    it('Handles checked', () => {
      let checked = false;

      mount({
        checked,
        onchange: () => checked = !checked
      });

      expect(input().checked).toBeFalsy();

      el().click();

      expect(input().checked).toBeTruthy();
    });
  });

  function mount(attrs: IControlAttrs) {
    const component = {
      view: () => m(Switch, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
