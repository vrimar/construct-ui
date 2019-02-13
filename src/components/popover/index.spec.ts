import m from 'mithril';
import assert from 'assert';
import { Popover, Classes, IPopoverAttrs, Button, IButtonAttrs } from '@/';
import { hasClass, hasChildClass, triggerEvent } from '@test-utils';

const triggerClass = 'TRIGGER';
const content = 'popover-test-content';

describe('popover', () => {
  const overlay = () => document.body.querySelector(`.${Classes.OVERLAY}`) as HTMLElement;
  const popover = () => document.body.querySelector(`.${Classes.POPOVER}`) as HTMLElement;
  const trigger = () => document.body.querySelector(`.${triggerClass}`) as HTMLElement;

  afterEach(() => {
    document.body.innerHTML = '';
    m.mount(document.body, null);
  });

  it('Renders correctly when closed', () => {
    mount({});
    assert(trigger());
    assert(!popover());
  });

  it('Renders correctly when open', () => {
    mount({
      defaultIsOpen: true,
      class: Classes.POSITIVE,
      style: 'color: red'
    });

    assert(hasChildClass(popover(), Classes.POPOVER_ARROW));
    assert(hasChildClass(popover(), Classes.POPOVER_CONTENT));
    assert(hasClass(popover(), Classes.POSITIVE));
    assert.equal(popover().style.color, 'red');
  });

  it('Renders content', () => {
    mount({
      defaultIsOpen: true,
      content
    });
    assert(popover().innerHTML.includes(content));
  });

  it('Initially open when defaultIsOpen=true', () => {
    mount({ defaultIsOpen: true });

    assert(popover());
  });

  describe('interactionType=click', () => {
    it('trigger click opens popover', done => {
      mount({});

      triggerEvent(trigger(), 'click', () => {
        assert(popover());
        done();
      });
    });

    it('trigger click closes popover when open', done => {
      mount({
        defaultIsOpen: true
      });

      triggerEvent(trigger(), 'click', () => {
        assert(!popover());
        done();
      });
    });

    it('outside click closes popover when open', done => {
      mount({
        defaultIsOpen: true
      });

      triggerEvent(document.body, 'mousedown', () => {
        assert(!popover());
        done();
      });
    });

    it('trigger onclick is called', () => {
      let count = 0;

      mount({}, {
        onclick: () => count++
      });

      trigger().dispatchEvent(new Event('click'));
      assert.equal(count, 1);
    });
  });

  describe('interactionType=click-trigger', () => {
    it('trigger click opens popover', done => {
      mount({ interactionType: 'click-trigger' });

      triggerEvent(trigger(), 'click', () => {
        assert(popover());
        done();
      });
    });

    it('trigger click closes popover when open', done => {
      mount({
        defaultIsOpen: true,
        interactionType: 'click-trigger'
      });

      triggerEvent(trigger(), 'click', () => {
        assert(!popover());
        done();
      });
    });

    it('outside click does not close popover when open', done => {
      mount({
        defaultIsOpen: true,
        interactionType: 'click-trigger'
      });

      triggerEvent(document.body, 'mousedown', () => {
        assert(popover());
        done();
      });
    });
  });

  describe('interactionType=hover', () => {
    it('trigger hover opens popover', done => {
      mount({
        interactionType: 'hover'
      });

      triggerEvent(trigger(), 'mouseenter', () => {
        assert(popover());
        done();
      });
    });

    // TODO: Add mouseleave tests

    it('trigger onmouseenter is called', () => {
      let count = 0;

      mount({ interactionType: 'hover' }, {
        onmouseenter: () => count++
      });

      trigger().dispatchEvent(new Event('mouseenter'));
      assert.equal(count, 1);
    });
  });

  it('closeOnContentClick=true triggers close', done => {
    mount({
      defaultIsOpen: true,
      closeOnContentClick: true
    });

    triggerEvent(popover(), 'click', () => {
      assert(!popover());
      done();
    });
  });

  it('Clicking on element with class=Classes.POPOVER_DISMISS triggers close', done => {
    mount({
      defaultIsOpen: true,
      content: m(Button, {
        class: Classes.POPOVER_DISSMISS
      })
    });

    const button = popover().querySelector(`.${Classes.POPOVER_DISSMISS}`);

    triggerEvent(button, 'click', () => {
      assert(!popover());
      done();
    });
  });

  it('Handles openOnTriggerFocus=true', done => {
    mount({
      interactionType: 'hover',
      openOnTriggerFocus: true
    });

    triggerEvent(trigger(), 'focus', () => {
      assert(popover());
      done();
    });
  });

  it('hasArrow=false hides arrow', () => {
    mount({
      defaultIsOpen: true,
      hasArrow: false
    });

    assert(!hasChildClass(popover(), Classes.POPOVER_ARROW));
  });

  it('Passes through attrs to Overlay', () => {
    mount({
      defaultIsOpen: true,
      overlayClass: Classes.POSITIVE,
      overlayStyle: 'color: red'
    });

    assert(hasClass(overlay(), Classes.POSITIVE));
    assert.equal(overlay().style.color, 'red');
  });

  it('Correctly sets position', () => {
    mount({
      defaultIsOpen: true,
      position: 'right'
    });

    assert.equal(popover().getAttribute('x-placement'), 'right');
  });

  // TODO: add controlled mode tests

  function mount(attrs: IPopoverAttrs, triggerAttrs?: IButtonAttrs) {
    const component = {
      view: () => m(Popover, {
        content: m('', 'Test'),
        transitionDuration: 0,
        trigger: m(`.${triggerClass}`, triggerAttrs),
        ...attrs
      })
    };

    m.mount(document.body, component);
    return component;
  }
});
