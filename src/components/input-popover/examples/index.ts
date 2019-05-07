import m from 'mithril';
import { InputPopover, Switch, Select, Icons, Button } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/input-popover/examples/index.ts';

export class InputPopoverExample {
  private type: 'input' | 'textarea' = 'input';
  private header: boolean;
  private footer: boolean;
  private submitOnEnter: boolean = true;
  private value: string = 'Value';

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(InputPopover, {
        type: this.type,
        header: this.header && 'Header',
        footer: this.footer && 'Footer',
        submitOnEnter: this.submitOnEnter,
        placeholder: 'Enter value',
        onSubmit: (value) => this.value = value as string,
        value: this.value,
        trigger: m(Button, {
          sublabel: 'Trigger: ',
          label: this.value,
          iconRight: Icons.CHEVRON_DOWN
        })
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Type'),
      m(Select, {
        options: ['input', 'textarea'],
        onchange: (e: any) => this.type = e.target.value,
        size: 'xs'
      }),
      m(Switch, {
        checked: this.header,
        label: 'Header',
        onchange: () => this.header = !this.header
      }),

      m(Switch, {
        checked: this.footer,
        label: 'Footer',
        onchange: () => this.footer = !this.footer
      }),

      m(Switch, {
        checked: this.submitOnEnter,
        label: 'Submit on enter',
        onchange: () => this.submitOnEnter = !this.submitOnEnter
      })
    ];
  }
}
