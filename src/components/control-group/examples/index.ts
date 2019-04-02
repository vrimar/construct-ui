import m from 'mithril';
import { ControlGroup, Button, Input, Icon, Icons, Select, Spinner, CustomSelect } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/control-group/examples/index.ts';
const options = ['Option 1', 'Option 2'];

export class ControlGroupExample {
  public view() {
    return m(Example, { direction: 'column', src: EXAMPLE_SRC }, [
      m(ControlGroup, { style: 'margin-bottom:15px' }, [
        m(Input, {
          contentLeft: m(Icon, { name: Icons.SEARCH }),
          placeholder: 'Input placeholder...'
        }),
        m(Button, {
          iconLeft: Icons.USERS,
          label: 'Button'
        }),
        m(Select, { options })
      ]),

      m(ControlGroup, [
        m(Button, {
          iconLeft: Icons.SETTINGS,
          label: 'Action'
        }),
        m(Input, {
          contentLeft: m(Icon, { name: Icons.USER }),
          contentRight: m(Spinner, { active: true }),
          placeholder: 'Enter name...'
        }),
        m(CustomSelect, {
          options,
          defaultValue: 'Option 2'
        })
      ])
    ]);
  }
}
