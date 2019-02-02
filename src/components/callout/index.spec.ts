import m from 'mithril';
import assert from 'assert';
import { Callout, Classes, ICalloutAttrs, Icons } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('callout', () => {
  const el = () => document.body.firstChild as HTMLElement;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      intent: 'primary',
      size: 'xs',
      style: 'margin: 0'
    });

    assert(hasClass(el(), Classes.CALLOUT));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.XS));

    assert(el().hasAttribute('style'));
  });

  it('Renders children', () => {
    mount({
      content: 'test',
      header: 'test',
      icon: Icons.ACTIVITY
    });

    assert(hasClass(el(), Classes.CALLOUT_ICON));
    assert(hasChildClass(el(), Classes.CALLOUT_CONTENT));
    assert(hasChildClass(el(), Classes.CALLOUT_HEADER));
    assert(hasChildClass(el(), Classes.ICON));
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  it('Renders dismiss icon when onDismiss set', () => {
    mount({ onDismiss: console.log });

    assert(hasChildClass(el(), Classes.CALLOUT_DISMISS_ICON));
  });

  function mount(attrs: ICalloutAttrs) {
    const component = {
      view: () => m(Callout, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
