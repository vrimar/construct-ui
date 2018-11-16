import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, Breakpoints } from '../../_shared';
import { IBreakpointMap } from './Grid';

export interface IColAttrs extends IAttrs {
  /** Width of column; between 1-12 */
  span?: number | IBreakpointMap;

  /** Column order */
  order?: number | IBreakpointMap;

  /** Column offset */
  offset?: number | IBreakpointMap;

  [htmlAttrs: string]: any;
}

export class Col implements m.Component<IColAttrs> {
  public view({ attrs, children }: m.Vnode<IColAttrs>) {
    const { span, order, offset, class: className, ...htmlAttrs } = attrs;

    let breakpointClasses: string;

    Object.keys(Breakpoints).map(breakpoint => {
      breakpointClasses = classnames(
        breakpointClasses,
        typeof span === 'object' && span[breakpoint] && `${Classes.COL}-${breakpoint}-${span[breakpoint]}`,
        typeof order === 'object' && order[breakpoint] && `${Classes.COL}-${breakpoint}-order-${order[breakpoint]}`,
        typeof offset === 'object' && offset[breakpoint] && `${Classes.COL}-${breakpoint}-offset-${offset[breakpoint]}`
      );
    });

    const classes = classnames(
      breakpointClasses,
      typeof span === 'number' && `${Classes.COL}-${span}`,
      typeof order === 'number' && `${Classes.COL}-order-${order}`,
      typeof offset === 'number' && `${Classes.COL}-offset-${offset}`,
      className
    );

    return m('', { ...htmlAttrs, class: classes }, children);
  }
}
