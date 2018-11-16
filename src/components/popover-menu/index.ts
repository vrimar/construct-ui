import m from 'mithril';
import classnames from 'classnames';
import { Classes } from '../../';
import { IPopoverAttrs, Popover } from '../popover';
import { IMenuAttrs, Menu } from '../menu';

export interface IPopoverMenuAttrs extends IPopoverAttrs {
  /** Attrs passed through to Menu component */
  menuAttrs?: IMenuAttrs;
}

export class PopoverMenu implements m.ClassComponent<IPopoverMenuAttrs> {
  public view({ attrs }: m.Vnode<IPopoverMenuAttrs>) {
    const { class: className, menuAttrs, content, ...popoverAttrs } = attrs;

    return m(Popover, {
      class: classnames(Classes.POPOVER_MENU, className),
      ...popoverAttrs,
      content: m(Menu, { ...menuAttrs }, content)
    });
  }
}
