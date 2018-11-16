import m from 'mithril';
import assert from 'assert';
import { Grid, IGridAttrs, Classes, Col, IColAttrs, IBreakpointMap } from '@/';
import { hasClass } from '@test-utils';

describe('grid', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const cols = () => el().children;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    render({
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
    render({});

    assert.equal(cols().length, 2);
  });

  it('Passes through html attrs', () => {
    render({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  it('Sets correct element to render into', () => {
    render({ element: 'form' });

    assert.equal(el().tagName, 'FORM');
  });

  it('Sets gutter margin', () => {
    render({ gutter: 20 });

    assert.equal(el().style.marginLeft, '-10px');
    assert.equal(el().style.marginRight, '-10px');
  });

  it.skip('Handles responsive gutter margin', () => {
    const gutter = {
      lg: 10,
      md: 20,
      sm: 30,
      xl: 40,
      xs: 50
    } as IBreakpointMap;

    render({ gutter });
  });

  describe('column', () => {
    const col = () => cols()[0] as HTMLElement;

    it('Renders correctly', () => {
      render({}, {
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
      render({}, {
        id: 1,
        name: 'name'
      });

      assert(col().hasAttribute('id'));
      assert(col().hasAttribute('name'));
    });

    it('Sets gutter padding', () => {
      render({ gutter: 20 });

      assert.equal(col().style.paddingLeft, '10px');
      assert.equal(col().style.paddingRight, '10px');
    });

    // TODO: Handle responsive padding
    // it.skip('Handles responsive padding', () => { console.log(); });
  });

  function render(attrs: IGridAttrs, colAttrs?: IColAttrs) {
    const component = {
      view: () => m(Grid, { ...attrs }, [
        m(Col, { ...colAttrs }, 'children'),
        m(Col, 'children')
      ])
    };
    m.mount(document.body, component);
  }
});
