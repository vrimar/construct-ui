import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs, IOption, Option } from '../../_shared';
import { Radio } from './Radio';

export interface IRadioGroupAttrs extends IAttrs, ISizeAttrs {
  /** Disables selection */
  disabled?: boolean;
  /**
   * Name of the radio group.
   * If no name is specified, a unique name will be generated for each instance.
   */
  name?: string;

  /**
   * Callback invoked when selection changes.
   * The selected value can be accessed through <code>e.currentTarget.value</code>
   */
  onchange?: (e: Event) => void;

  /** Array of radio group options */
  options?: Option[];

  /** Value of the selected radio element */
  value?: string;

  [htmlAttrs: string]: any;
}

let instanceCounter = 0;

export class RadioGroup implements m.Component<IRadioGroupAttrs> {
  private uniqueId = `${Classes.RADIO_GROUP}-${instanceCounter++}`;

  public view({ attrs }: m.Vnode<IRadioGroupAttrs>) {
    const {
      class: className,
      disabled,
      intent,
      name,
      options,
      onchange,
      size,
      value,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.RADIO_GROUP,
      size && `cui-${size}`,
      className
    );

    const radioButtons = (attrs.options as IOption[])
      .map(option => this.renderRadioButton(option, attrs));

    return m('', { class: classes, ...htmlAttrs }, radioButtons);
  }

  private renderRadioButton(option: Option, attrs: IRadioGroupAttrs) {
    const label = typeof (option) === 'object' ? option.label : option;
    const value = typeof (option) === 'object' ? option.value : option;

    return m(Radio, {
      checked: value === attrs.value,
      disabled: attrs.disabled,
      label,
      name: attrs.name || this.uniqueId,
      onchange: attrs.onchange,
      value
    });
  }
}
