import m from 'mithril';
import assert from 'assert';
import { Grid, IGridAttrs, Classes, Col, IColAttrs, IBreakpointMap } from '@/';
import { hasClass, TIMEOUT } from '@test-utils';

describe('grid', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const cols = () => el().children;

  beforeEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      align: 'top',
      justify: 'center',
      style: 'color: red'
    });

    assert(hasClass(el(), Classes.GRID));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), `${Classes.GRID}-align-top`));
    assert(hasClass(el(), `${Classes.GRID}-justify-center`));
    assert(el().hasAttribute('style'));
  });

  it('Renders children', () => {
    mount({});

    assert.equal(cols().length, 2);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  it('Sets correct element to render into', () => {
    mount({ element: 'form' });

    assert.equal(el().tagName, 'FORM');
  });

  it('Sets gutter margin', () => {
    mount({ gutter: 20 });

    assert.equal(el().style.marginLeft, '-10px');
    assert.equal(el().style.marginRight, '-10px');
  });

  it('Handles responsive gutter margin', (done) => {
    const gutter = { xs: 50 } as IBreakpointMap;

    mount({ gutter });

    setTimeout(() => {

      // Resize to xs
      window.resizeTo(100, 100);

      setTimeout(() => {
        assert.equal(el().style.marginLeft, '-25px');
        assert.equal(el().style.marginRight, '-25px');
        done();
      });
    }, TIMEOUT);
  });

  describe('column', () => {
    const col = () => cols()[0] as HTMLElement;

    it('Renders correctly', () => {
      mount({}, {
        class: Classes.POSITIVE,
        offset: 1,
        span: 1,
        order: 1,
        style: 'margin: 0'
      });

      assert(hasClass(col(), `${Classes.COL}-1`));
      assert(hasClass(col(), Classes.POSITIVE));
      assert(hasClass(col(), `${Classes.COL}-offset-1`));
      assert(hasClass(col(), `${Classes.COL}-order-1`));
      assert(col().hasAttribute('style'));
    });

    it('Passes through html attrs', () => {
      mount({}, {
        id: 1,
        name: 'name'
      });

      assert(col().hasAttribute('id'));
      assert(col().hasAttribute('name'));
    });

    it('Sets gutter padding', () => {
      mount({ gutter: 20 });

      assert.equal(col().style.paddingLeft, '10px');
      assert.equal(col().style.paddingRight, '10px');
    });

    it('Handles responsive padding', done => {
      const gutter = { xs: 50 } as IBreakpointMap;

      mount({ gutter });

      setTimeout(() => {

        // Resize to xs
        window.resizeTo(100, 100);

        setTimeout(() => {
          assert.equal(col().style.paddingLeft, '25px');
          assert.equal(col().style.paddingRight, '25px');
          done();
        });
      }, TIMEOUT);
    });
  });

  function mount(attrs: IGridAttrs, colAttrs?: IColAttrs) {
    const component = {
      view: () => m(Grid, { ...attrs }, [
        m(Col, { ...colAttrs }, 'children'),
        m(Col, 'children')
      ])
    };

    m.mount(document.body, component);
  }
});
