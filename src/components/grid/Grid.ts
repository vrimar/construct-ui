import m from 'mithril';
import classnames from 'classnames';
import { IAttrs, Classes, normalizeStyle } from '../../_shared';
import { IColAttrs } from './Col';
import { ResponsiveManager } from '../../utils';

ResponsiveManager.initialize();

export interface IBreakpointMap {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface IGridAttrs extends IAttrs {
  /** HTML element to render into */
  element?: string;

  /** Space between columns */
  gutter?: number | IBreakpointMap;

  /** Flexbox column alignment */
  align?: 'top' | 'middle' | 'bottom';

  /** Flexbox column justify */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';

  [htmlAttrs: string]: any;
}

export class Grid implements m.Component<IGridAttrs> {
  public view({ attrs, children }: m.Vnode<IGridAttrs>) {
    const {
      align,
      class: className,
      element,
      justify,
      gutter,
      style,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.GRID,
      align && `${Classes.GRID}-align-${align}`,
      justify && `${Classes.GRID}-justify-${justify}`,
      className
    );

    const breakPointGutter = this.getGutter(attrs);

    const styles = {
      ...normalizeStyle(style),
      marginLeft: `-${breakPointGutter / 2}px`,
      marginRight: `-${breakPointGutter / 2}px`
    };

    return m(element || '', {
      ...htmlAttrs,
      class: classes,
      style: styles
    }, this.renderCols(children as m.ChildArray, breakPointGutter));
  }

  private getGutter(attrs: IGridAttrs) {
    const breakPoints = ResponsiveManager.breakpoints;

    if (typeof attrs.gutter === 'object' && breakPoints) {
      const activeBreakpoints = Object.keys(breakPoints).filter((x) => breakPoints[x]);
      const currentBreakpoint = activeBreakpoints[activeBreakpoints.length - 1];
      return (attrs.gutter as any)[currentBreakpoint] || 0;
    } else return attrs.gutter;
  }

  private renderCols(children: m.ChildArray, gutter: number): any {
    return children.map((col: m.Vnode<IColAttrs>) => {
      if (col == null || col.tag === '#') return;

      if (typeof (col) !== 'object')
        return col;

      if (col.tag === '[') {
        return this.renderCols(col.children as m.ChildArray, gutter);
      }

      col.attrs = col.attrs || {};

      col.attrs.style = {
        ...normalizeStyle(col.attrs.style),
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`
      };

      return col;
    });
  }
}
