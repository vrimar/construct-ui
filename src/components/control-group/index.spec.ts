import m from 'mithril';
import assert from 'assert';
import { ControlGroup, Classes, IControlGroupAttrs, Button, Input } from '@/';
import { hasClass } from '@test-utils';

describe('control-group', () => {
  const el = () => document.body.firstChild as HTMLElement;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      style: 'margin: 0'
    });

    assert(hasClass(el(), Classes.CONTROL_GROUP));
    assert(el().hasAttribute('style'));
  });

  it('Renders children', () => {
    mount({});

    const length = el().children.length;
    assert.equal(length, 2);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
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
