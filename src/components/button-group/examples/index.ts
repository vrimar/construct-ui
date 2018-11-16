import m from 'mithril';
import { Button, ButtonGroup, Icons, Switch, Size, Intent } from '@/';
import { IntentSelect, SizeSelect, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/button-group/examples/index.ts';

export class ButtonGroupExample {
  private size: Size;
  private fluid = false;
  private intent: Intent;
  private label = true;
  private rounded = false;
  private basic = false;

  public view() {
    const attrs = {
      size: this.size,
      intent: this.intent,
      rounded: this.rounded,
      basic: this.basic,
      fluid: this.fluid
    };

    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(ButtonGroup, { ...attrs }, [
        m(Button, {
          iconLeft: Icons.COPY,
          label: this.label && 'Copy'
        }),
        m(Button, {
          iconLeft: Icons.SETTINGS,
          label: this.label && 'Settings'
        }),
        m(Button, {
          iconLeft: Icons.LINK,
          iconRight: Icons.CHEVRON_DOWN,
          label: this.label && 'Link'
        })
      ])
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m('h5', 'Intent'),
      m(IntentSelect, { onSelect: (intent: Intent) => this.intent = intent }),
      m(Switch, {
        checked: this.label,
        label: 'Label',
        onchange: () => this.label = !this.label
      }),

      m(Switch, {
        checked: this.rounded,
        label: 'Rounded',
        onchange: () => this.rounded = !this.rounded
      }),

      m(Switch, {
        checked: this.basic,
        label: 'Basic',
        onchange: () => this.basic = !this.basic
      }),

      m(Switch, {
        checked: this.fluid,
        label: 'Fluid',
        onchange: () => this.fluid = !this.fluid
      })
    ];
  }
}
