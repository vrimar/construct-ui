import classnames from 'classnames';
import m from 'mithril';
import { Classes, IAttrs, ISizeAttrs, IIntentAttrs } from '../../_shared';

export interface ISpinnerAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Toggles visibility of spinner */
  active?: boolean;

  /** Fills the height/width of parent container */
  fill?: boolean;

  /** Shows background when fill=true */
  background?: boolean;

  /** Optional message to show under icon */
  message?: string;

  [htmlAttrs: string]: any;
}

export class Spinner implements m.Component<ISpinnerAttrs> {
  public view({ attrs }: m.Vnode<ISpinnerAttrs>) {
    const {
      active,
      background,
      class: className,
      fill,
      intent,
      message,
      size,
      ...otherAttrs
    } = attrs;

    const content = [
      m(`.${Classes.SPINNER_CONTENT}`, [
        m(`.${Classes.SPINNER_ICON}`),
        message && m(`.${Classes.SPINNER_MESSAGE}`, message)
      ])
    ];

    return m('', {
      ...otherAttrs,
      class: classnames(
        Classes.SPINNER,
        active && Classes.SPINNER_ACTIVE,
        background && Classes.SPINNER_BG,
        fill && Classes.SPINNER_FILL,
        intent && `cui-${attrs.intent}`,
        size && `cui-${attrs.size}`,
        className
      )
    }, content);
  }
}
