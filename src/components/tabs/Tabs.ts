import m from 'mithril';
import classnames from 'classnames';
import { ISizeAttrs, IAttrs, Classes, Align } from '../../_shared';

export interface ITabsAttrs extends IAttrs, ISizeAttrs {
  /**
   * Content alignment; Used to align tabs when fluid=true
   * @default 'center'
   */
  align?: Align;

  /** Toggles bottom border */
  bordered?: boolean;

  /** Fills width of parent container */
  fluid?: boolean;

  [htmlAttrs: string]: any;
}

export class Tabs implements m.ClassComponent<ITabsAttrs> {
  public view({ attrs, children }: m.Vnode<ITabsAttrs>) {
    const { align, bordered, fluid, size, class: classname, ...htmlAttrs } = attrs;

    return m('', {
      ...htmlAttrs,
      class: classnames(
        Classes.TABS,
        align && `cui-align-${align}`,
        bordered && Classes.TABS_BORDERED,
        fluid && Classes.FLUID,
        size && `cui-${size}`,
        classname
      )
    }, children);
  }
}
