import m from 'mithril';
import assert from 'assert';
import { Button, Portal, IPortalAttrs, Classes } from '@/';
import { hasClass, hasChildClass, TIMEOUT } from '@test-utils';

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

    assert(hasClass(portal(), Classes.PORTAL));
    assert(hasClass(portal(), Classes.POSITIVE));
    assert.equal(portal().style.color, 'red');
  });

  it('Calls onContentMount', () => {
    let count = 0;

    mount({
      onContentMount: () => count++
    });

    assert.equal(count, 1);
  });

  it('Mounts to specified container', () => {
    const container = document.createElement('div');
    container.classList.add(Classes.POSITIVE);
    document.body.append(container);

    mount({ container });

    assert(container.children[0].classList.contains(Classes.PORTAL));
  });

  it('Updates children on redraw', done => {
    const component = mount({}, m(Button));
    const hasButton = () => hasChildClass(portal(), Classes.BUTTON);
    assert(hasButton());

    component.showChildren = false;
    m.redraw();

    setTimeout(() => {
      assert(!hasButton());
      done();
    }, TIMEOUT);
  });

  it('Removes div from body on unmount', () => {
    mount({});
    assert(portal());
    m.mount(document.body, null);
    assert(!portal());
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
