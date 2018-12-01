import m from 'mithril';
import { IconName, Intent, Size } from '..';
import { IIconAttrs } from '../components/icon';

export type Style = string | Partial<CSSStyleDeclaration>;

export interface IAttrs {
  /** Space delimited class list */
  class?: string;

  /** Inline styles */
  style?: Style;
}

export interface IIntentAttrs {
  /** Component color intent */
  intent?: Intent;
}

export interface ISizeAttrs {
  /** Component size */
  size?: Size;
}

export interface IActionItemAttrs {
  /** Toggles active state */
  active?: boolean;

  /** Disables interaction */
  disabled?: boolean;

  /** Inner text or children */
  label?: m.Children;

  /** Left-justified icon */
  iconLeft?: IconName;

  /** Attrs passed though to left-justified icon */
  iconLeftAttrs?: IIconAttrs;

  /** Right-justified icon */
  iconRight?: IconName;

  /** Attrs passed though to right-justified icon */
  iconRightAttrs?: IIconAttrs;

  /** Callback invoked on click */
  onclick?: (e: Event) => void;
}

export interface IOption {
  /** Disables interaction */
  disabled?: boolean;

  /** Inner text */
  label?: string | number;

  /** Value of option */
  value?: string | number;
}

export type Option = IOption | string;
