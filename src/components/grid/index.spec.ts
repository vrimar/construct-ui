import m from 'mithril';
import { describe, beforeEach, expect, it } from 'vitest';
import { Grid, IGridAttrs, Classes, Col, IColAttrs, IBreakpointMap } from '@/';
import { hasClass, sleep, TIMEOUT } from '@test-utils';

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

    expect(hasClass(el(), Classes.GRID)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), `${Classes.GRID}-align-top`)).toBeTruthy();
    expect(hasClass(el(), `${Classes.GRID}-justify-center`)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders children', () => {
    mount({});

    expect(cols().length).toBe(2);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
  });

  it('Sets correct element to render into', () => {
    mount({ element: 'form' });

    expect(el().tagName).toBe('FORM');
  });

  it('Sets gutter margin', () => {
    mount({ gutter: 20 });

    expect(el().style.marginLeft).toBe('-10px');
    expect(el().style.marginRight).toBe('-10px');
  });

  it('Handles responsive gutter margin', async () => {
    const gutter = { xs: 50 } as IBreakpointMap;

    mount({ gutter });

    window.resizeTo(100, 100);

    await sleep(TIMEOUT);

    expect(el().style.marginLeft).toBe('-25px');
    expect(el().style.marginRight).toBe('-25px');
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

      expect(hasClass(col(), `${Classes.COL}-1`)).toBeTruthy();
      expect(hasClass(col(), Classes.POSITIVE)).toBeTruthy();
      expect(hasClass(col(), `${Classes.COL}-offset-1`)).toBeTruthy();
      expect(hasClass(col(), `${Classes.COL}-order-1`)).toBeTruthy();
      expect(col().hasAttribute('style')).toBeTruthy();
    });

    it('Passes through html attrs', () => {
      mount({}, {
        id: 1,
        name: 'name'
      });

      expect(col().hasAttribute('id')).toBeTruthy();
      expect(col().hasAttribute('name')).toBeTruthy();
    });

    it('Sets gutter padding', () => {
      mount({ gutter: 20 });

      expect(col().style.paddingLeft).toBe('10px');
      expect(col().style.paddingRight).toBe('10px');
    });

    it('Handles responsive padding', async () => {
      const gutter = { xs: 50 } as IBreakpointMap;

      mount({ gutter });

      // Resize to xs
      window.resizeTo(100, 100);

      await sleep(TIMEOUT);

      expect(el().style.marginLeft).toBe('-25px');
      expect(el().style.marginRight).toBe('-25px');
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
