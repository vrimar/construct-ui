import m from 'mithril';
import assert from 'assert';
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
      size: 'xs',
      style: 'margin: 0'
    });

    assert(hasClass(el(), Classes.BUTTON_GROUP));
    assert(hasClass(el(), Classes.BASIC));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.FLUID));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.ROUNDED));
    assert(hasClass(el(), Classes.XS));

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
