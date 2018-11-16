import classnames from 'classnames';
import m from 'mithril';
import { Classes, IAttrs } from '../../_shared';

export interface ITableAttrs extends IAttrs {
  /** Toggles bordered styling */
  bordered?: boolean;

  /** Adds interactive hover/active styling for each row */
  interactive?: boolean;

  /** Toggles striped styling */
  striped?: boolean;

  [htmlAttrs: string]: any;
}

export class Table implements m.Component<ITableAttrs> {
  public view({ attrs, children }: m.Vnode<ITableAttrs>) {
    const { class: className, bordered, interactive, striped, ...htmlAttrs } = attrs;

    return m('table', {
      ...htmlAttrs,
      class: classnames(
        Classes.TABLE,
        bordered && Classes.TABLE_BORDERED,
        striped && Classes.TABLE_STRIPED,
        interactive && Classes.TABLE_INTERACTIVE,
        className
      )
    }, children);
  }
}
