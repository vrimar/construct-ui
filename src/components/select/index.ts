import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs, IIntentAttrs, updateElementGroupPadding, Option } from '../../_shared';
import { Icons, Icon } from '../icon';

export interface ISelectAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Toggles basic styling (no borders/background) */
  basic?: boolean;

  /** Left-justified content */
  contentLeft?: m.Vnode<any, any>;

  /** Right-justified content */
  contentRight?: m.Vnode<any, any>;

  /** Disables selection */
  disabled?: boolean;

  /** Initially selected value (uncontrolled mode) */
  defaultValue?: string;

  /** Array of list options */
  options?: Option[];

  /** Fills width of parent container */
  fluid?: boolean;

  /**
   * Callback invoked when selection changes.
   * The selected value can be accessed through <code>e.currentTarget.value</code>
   */
  onchange?: (e: Event) => void;

  /** Value of the selected option */
  value?: string;

  [htmlAttrs: string]: any;
}

export class Select implements m.Component<ISelectAttrs> {
  public oncreate(vnode: m.VnodeDOM<ISelectAttrs>) {
    this.updatePadding(vnode);
  }

  public onupdate(vnode: m.VnodeDOM<ISelectAttrs>) {
    this.updatePadding(vnode);
  }

  public view({ attrs }: m.Vnode<ISelectAttrs>) {
    const {
      basic,
      class: className,
      defaultValue,
      contentLeft,
      contentRight,
      fluid,
      intent,
      options = [],
      size,
      style,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.SELECT,
      basic && Classes.BASIC,
      htmlAttrs.disabled && Classes.DISABLED,
      fluid && Classes.FLUID,
      intent && `cui-${intent}`,
      size && `cui-${size}`,
      className
    );

    const selectOptions = (options as Option[]).map((option) => this.renderOption(option, attrs));

    return m('', { class: classes, style }, [
      contentLeft,
      m('select', { ...htmlAttrs }, selectOptions),
      contentRight || m(Icon, { name: Icons.CHEVRON_DOWN })
    ]);
  }

  private renderOption(option: Option, { defaultValue }: ISelectAttrs) {
    const label = typeof (option) === 'object' ? option.label : option;
    const value = typeof (option) === 'object' ? option.value : option;
    const attrs = typeof (option) === 'object' ? option : {};

    return m('option', {
      ...attrs,
      selected: defaultValue != null && value === defaultValue,
      value
    }, label);
  }

  private updatePadding({ attrs, dom }: m.VnodeDOM<ISelectAttrs>) {
    const containerEl = dom.querySelector('select') as HTMLElement;
    updateElementGroupPadding(containerEl, attrs.contentLeft, attrs.contentRight);
  }
}
