import m from 'mithril';
import { describe, beforeEach, expect, it } from 'vitest';
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

    expect(hasClass(el(), Classes.CALLOUT)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();

    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders children', () => {
    mount({
      content: 'test',
      header: 'test',
      icon: Icons.ACTIVITY
    });

    expect(hasClass(el(), Classes.CALLOUT_ICON)).toBeTruthy();
    expect(hasChildClass(el(), Classes.CALLOUT_CONTENT)).toBeTruthy();
    expect(hasChildClass(el(), Classes.CALLOUT_HEADER)).toBeTruthy();
    expect(hasChildClass(el(), Classes.ICON)).toBeTruthy();
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  it('Renders dismiss icon when onDismiss set', () => {
    mount({ onDismiss: () => null });

    expect(hasChildClass(el(), Classes.CALLOUT_DISMISS_ICON)).toBeTruthy();
  });

  function mount(attrs: ICalloutAttrs) {
    const component = {
      view: () => m(Callout, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
