import m from 'mithril';
import { Form, FormGroup, Input, FormLabel, Icon, Icons, Button, CustomSelect, Classes } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/form/examples/index.ts';

export class FormExample {
  private isSubmitting: boolean = false;

  public view() {
    const span = {
      xs: 12,
      sm: 12,
      md: 6
    };

    return m(Example, { src: EXAMPLE_SRC }, [
      m(Form, { gutter: 15, onsubmit: this.handleSubmit }, [
        m(FormGroup, { span }, [
          m(FormLabel, { for: 'username' }, 'Username'),
          m(Input, {
            contentLeft: m(Icon, { name: Icons.USER }),
            id: 'username',
            name: 'username',
            placeholder: 'Username...'
          })
        ]),

        m(FormGroup, { span }, [
          m(FormLabel, { for: 'password' }, 'Password'),
          m(Input, {
            contentLeft: m(Icon, { name: Icons.LOCK }),
            id: 'password',
            name: 'password',
            placeholder: 'Password...'
          })
        ]),

        m(FormGroup, { span }, [
          m(FormLabel, { for: 'selection' }, 'User'),
          m(CustomSelect, {
            options: ['John', 'Jessica', 'Billy bob'],
            defaultValue: 'Jessica',
            name: 'users',
            triggerAttrs: {
              iconLeft: Icons.USERS,
              align: 'left',
              fluid: true
            }
          })
        ]),

        m(FormGroup, { span }, [
          m(FormLabel, { for: 'occupation' }, 'Occupation'),
          m(Input, {
            contentLeft: m(Icon, { name: Icons.BRIEFCASE }),
            id: 'occupation',
            name: 'occupation',
            placeholder: 'Occupation...'
          })
        ]),

        m(FormGroup, { class: Classes.ALIGN_RIGHT }, [
          m(Button, {
            iconRight: Icons.CHEVRON_RIGHT,
            type: 'submit',
            label: 'Submit',
            intent: 'primary',
            loading: this.isSubmitting
          })
        ])
      ])
    ]);
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
      m.redraw();

      const target = e.target as HTMLFormElement;
      const inputs = target.elements;
      const values = {};

      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i] as HTMLInputElement;
        values[input.name] = input.value;
      }

      alert(JSON.stringify(values));
    }, 500);
  };
}
