import m from 'mithril';
import assert from 'assert';
import { Checkbox, ICheckboxAttrs, Classes } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('checkbox', () => {
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

    assert(hasClass(el(), Classes.CONTROL));
    assert(hasClass(el(), Classes.CHECKBOX));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.XS));
    assert(el().hasAttribute('style'));

    assert(hasChildClass(el(), Classes.CONTROL_INDICATOR));

    assert(el().innerHTML.includes('label'));
  });

  it('Passes through attrs to input', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(input().hasAttribute('id'));
    assert(input().hasAttribute('name'));
  });

  it('Handles defaultChecked', () => {
    mount({ defaultChecked: true });

    assert(input().checked);
  });

  it('Handles defaultIndeterminate', () => {
    mount({ defaultIndeterminate: true });

    assert(input().indeterminate);
  });

  it('Handles disabled', () => {
    mount({ disabled: true });

    el().dispatchEvent(new Event('click'));

    assert(!input().checked);
  });

  it('Handles readonly', () => {
    mount({ readonly: true });

    el().dispatchEvent(new Event('click'));

    assert(!input().checked);
  });

  it('Handles onchange', () => {
    let count = 0;
    mount({ onchange: () => count++ });

    el().dispatchEvent(new Event('click'));

    assert.equal(count, 1);
  });

  it('Handles controlled: checked', () => {
    let checked = false;

    mount({
      checked,
      onchange: () => checked = !checked
    });

    assert(!input().checked);

    input().dispatchEvent(new Event('click'));

    assert(input().checked);
  });

  it('Handles controlled: indeterminate', () => {
    mount({ indeterminate: true });

    assert(input().indeterminate);

    input().dispatchEvent(new Event('click'));

    assert(input().indeterminate);
  });

  function mount(attrs: ICheckboxAttrs) {
    const component = {
      view: () => m(Checkbox, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
