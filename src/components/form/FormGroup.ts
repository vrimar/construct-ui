import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs } from '../../_shared';
import { FormLabel } from './FormLabel';

export interface IFormGroupAttrs extends IAttrs {
  /** Text label */
  label?: string;

  /** Inner content; can be used instead of passing children */
  content?: m.Children;

  /** Width of form group; between 1-12 */
  span?: number;

  /** Disables interaction */
  disabled?: boolean;
}

export class FormGroup implements m.Component<IFormGroupAttrs> {
  public view({ attrs, children }: m.Vnode<IFormGroupAttrs>) {
    const {
      class: className,
      content,
      disabled,
      label,
      span,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.FORM_GROUP,
      `${Classes.COL}-${span || 12}`,
      disabled && Classes.DISABLED,
      className
    );

    const innerContent = [
      label && m(FormLabel, label),
      content || children
    ];

    return m('', {
      class: classes,
      ...htmlAttrs
    }, innerContent);
  }
}
