import m from 'mithril';
import { Button, Toaster, Toast, Switch } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/toast/examples/declarative.ts';

interface INotification {
  key: number;
  message: string;
}

export class ToastDeclarativeExample {
  private notifications: INotification[] = [];
  private timeout: number = 3000;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Button, {
        label: 'Show toast',
        intent: 'primary',
        onclick: this.show
      }),

      m(Toaster, {
        toasts: this.notifications.map(notification => m(Toast, {
          key: notification.key,
          message: notification.message,
          onDismiss: this.dismiss,
          timeout: this.timeout
        }))
      })
    ]);
  }

  private show = () => {
    this.notifications.push({
      message: 'Toast message',
      key: Date.now()
    });
  }

  private dismiss = (key: number) => {
    const index = this.notifications.findIndex(x => x.key === key);
    this.notifications.splice(index, 1);
  }

  private renderOptions() {
    return [
      m(Switch, {
        checked: this.timeout === 0,
        label: 'Timeout = 0',
        onchange: () => this.timeout = this.timeout === 0 ? 3000 : 0
      })
    ];
  }
}
