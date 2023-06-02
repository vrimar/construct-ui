import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Button, Portal, IPortalAttrs, Classes } from '@/';
import { hasClass, hasChildClass, TIMEOUT, sleep } from '@test-utils';

describe('portal', () => {
  const portal = () => document.body.querySelector(`.${Classes.PORTAL}`) as HTMLElement;

  afterEach(() => {
    document.body.innerHTML = '';
    m.mount(document.body, null);
  });

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'color: red'
    });

    expect(hasClass(portal(), Classes.PORTAL)).toBeTruthy();
    expect(hasClass(portal(), Classes.POSITIVE)).toBeTruthy();
    expect(portal().style.color).toBe('red');
  });

  it('Calls onContentMount', () => {
    let count = 0;

    mount({
      onContentMount: () => count++
    });

    expect(count).toBe(1);
  });

  it('Mounts to specified container', () => {
    const container = document.createElement('div');
    container.classList.add(Classes.POSITIVE);
    document.body.append(container);

    mount({ container });

    expect(container.children[0].classList.contains(Classes.PORTAL)).toBeTruthy();
  });

  it('Updates children on redraw', async () => {
    const component = mount({}, m(Button));
    const hasButton = () => hasChildClass(portal(), Classes.BUTTON);
    expect(hasButton()).toBeTruthy();

    component.showChildren = false;
    m.redraw();

    await sleep(TIMEOUT);
    expect(hasButton()).toBeFalsy();
  });

  it('Removes div from body on unmount', () => {
    mount({});
    expect(portal()).toBeTruthy();
    m.mount(document.body, null);
    expect(portal()).toBeFalsy();
  });

  function mount(attrs?: IPortalAttrs, children?: m.Children) {
    const component = {
      showChildren: true,
      view: (vnode: any) => m(Portal, { ...attrs }, vnode.state.showChildren ? children : undefined)
    };

    m.mount(document.body, component);
    return component;
  }
});
