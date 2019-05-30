import m from 'mithril';
import classnames from 'classnames';
import { Classes, updateElementGroupPadding, IAttrs, ISizeAttrs, IIntentAttrs } from '../..';
import { Button } from '../button';

export interface IInputFileAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Left-justified content */
  contentLeft?: m.Vnode<any, any>;

  /** Right-justified content */
  contentRight?: m.Vnode<any, any>;

  /** Disables file selection */
  disabled?: boolean;

  /** Fills width of parent container */
  fluid?: boolean;

  /** Callback invoked on filename change */
  onchange?: (e: Event) => void;

  /** Inner text value */
  text?: string;

  [htmlAttrs: string]: any;
}

export class InputFile implements m.Component<IInputFileAttrs> {
  private browseButton: m.Vnode;

  public oncreate(vnode: m.VnodeDOM<IInputFileAttrs>) {
    this.updatePadding(vnode);
  }

  public onupdate(vnode: m.VnodeDOM<IInputFileAttrs>) {
    this.updatePadding(vnode);
  }

  public view({ attrs }: m.Vnode<IInputFileAttrs>) {
    const {
      class: className,
      contentLeft,
      contentRight,
      fluid,
      intent,
      size,
      style,
      text,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.INPUT_FILE,
      attrs.disabled && Classes.DISABLED,
      fluid && Classes.FLUID,
      intent && `cui-${intent}`,
      size && `cui-${size}`,
      className
    );

    this.browseButton = m(Button, {
      class: Classes.INPUT_FILE_BUTTON,
      label: 'Browse',
      tabindex: -1
    });

    const contentClasses = classnames(
      Classes.INPUT_FILE_CONTENT,
      text && Classes.INPUT_FILE_TEXT
    );

    const content = [
      contentLeft,
      m('input', { class: Classes.HIDDEN, ...htmlAttrs, type: 'file' }),
      m('', { class: contentClasses }, text || 'Choose a file...'),
      contentRight || this.browseButton
    ];

    return m('label', {
      class: classes,
      style,
      tabindex: 0
    }, content);
  }

  private updatePadding({ attrs, dom }: m.VnodeDOM<IInputFileAttrs>) {
    const containerEl = dom.querySelector(`.${Classes.INPUT_FILE_CONTENT}`) as HTMLElement;
    updateElementGroupPadding(
      containerEl,
      attrs.contentLeft,
      attrs.contentRight || this.browseButton
    );
  }
}
