import m from 'mithril';
import { describe, beforeEach, expect, it } from 'vitest';
import { ControlGroup, Classes, IControlGroupAttrs, Button, Input } from '@/';
import { hasClass } from '@test-utils';

describe('control-group', () => {
  const el = () => document.body.firstChild as HTMLElement;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      style: 'margin: 0'
    });

    expect(hasClass(el(), Classes.CONTROL_GROUP)).toBeTruthy();
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

  function mount(attrs: IControlGroupAttrs) {
    const component = {
      view: () => m(ControlGroup, { ...attrs }, [
        m(Button, { label: 'label' }),
        m(Input)
      ])
    };
    m.mount(document.body, component);
  }
});
