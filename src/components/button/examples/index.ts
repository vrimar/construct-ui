import m from 'mithril';
import { Switch, Button, Icons, Size, Intent, Align, Select } from '@/';
import { IntentSelect, SizeSelect, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/button/examples/index.ts';

export class ButtonExample {
  private align: Align = 'center';
  private compact = false;
  private size: Size;
  private intent: Intent;
  private active = false;
  private disabled = false;
  private loading = false;
  private iconLeft = true;
  private iconRight = false;
  private label = true;
  private rounded = false;
  private basic = false;
  private outlined = false;
  private fluid = false;
  private sublabel = false;

  public view() {
    return m(Example, { options: this.renderOptions(), direction: 'column', src: EXAMPLE_SRC }, [
      m(Button, {
        align: this.align,
        active: this.active,
        basic: this.basic,
        compact: this.compact,
        disabled: this.disabled,
        label: this.label && 'Button',
        sublabel: this.sublabel && 'Sublabel: ',
        loading: this.loading,
        fluid: this.fluid,
        iconLeft: this.iconLeft ? Icons.SETTINGS : undefined,
        iconRight: this.iconRight ? Icons.CHEVRON_DOWN : undefined,
        intent: this.intent,
        rounded: this.rounded,
        outlined: this.outlined,
        size: this.size,
        style: 'margin-bottom: 10px'
      }),

      m(Button, {
        align: this.align,
        active: this.active,
        basic: this.basic,
        compact: this.compact,
        disabled: this.disabled,
        fluid: this.fluid,
        label: this.label && 'Anchor Button',
        sublabel: this.sublabel && 'Sublabel: ',
        loading: this.loading,
        iconLeft: this.iconLeft ? Icons.LINK : undefined,
        iconRight: this.iconRight ? Icons.CHEVRON_RIGHT : undefined,
        intent: this.intent,
        rounded: this.rounded,
        outlined: this.outlined,
        size: this.size,
        href: 'https://google.com',
        target: '_blank'
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m('h5', 'Intent'),
      m(IntentSelect, { onSelect: (intent: Intent) => this.intent = intent }),
      m('h5', 'Align'),
      m(Select, {
        fluid: true,
        defaultValue: 'center',
        options: Object.keys(Align).map(key => Align[key]),
        onchange: (e: Event) => this.align = (e.target as HTMLInputElement).value as Align,
        size: 'xs'
      }),
      m(Switch, {
        checked: this.active,
        label: 'Active',
        onchange: () => this.active = !this.active
      }),
      m(Switch, {
        checked: this.disabled,
        label: 'Disabled',
        onchange: () => this.disabled = !this.disabled
      }),
      m(Switch, {
        checked: this.loading,
        label: 'Loading',
        onchange: () => this.loading = !this.loading
      }),
      m(Switch, {
        checked: this.label,
        label: 'Label',
        onchange: () => this.label = !this.label
      }),
      m(Switch, {
        checked: this.sublabel,
        label: 'Sublabel',
        onchange: () => this.sublabel = !this.sublabel
      }),
      m(Switch, {
        checked: this.iconLeft,
        label: 'Icon left',
        onchange: () => this.iconLeft = !this.iconLeft
      }),
      m(Switch, {
        checked: this.iconRight,
        label: 'Icon right',
        onchange: () => this.iconRight = !this.iconRight
      }),
      m(Switch, {
        checked: this.basic,
        label: 'Basic',
        onchange: () => {
          this.basic = !this.basic;
          this.outlined = false;
        }
      }),
      m(Switch, {
        checked: this.outlined,
        label: 'Outlined',
        onchange: () => {
          this.outlined = !this.outlined;
          this.basic = false;
        }
      }),
      m(Switch, {
        checked: this.rounded,
        label: 'Rounded',
        onchange: () => this.rounded = !this.rounded
      }),
      m(Switch, {
        checked: this.fluid,
        label: 'Fluid',
        onchange: () => this.fluid = !this.fluid
      }),
      m(Switch, {
        checked: this.compact,
        label: 'Compact',
        onchange: () => this.compact = !this.compact
      })
    ];
  }
}
