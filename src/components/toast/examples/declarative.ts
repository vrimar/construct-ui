import m from 'mithril';
import { Button, Toaster, Toast } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/toast/examples/declarative.ts';

interface INotification {
  key: number;
  message: string;
}

export class ToastDeclarativeExample {
  private notifications: INotification[] = [];

  public view() {
    return m(Example, { src: EXAMPLE_SRC }, [
      m(Button, {
        label: 'Show toast',
        intent: 'primary',
        onclick: this.show
      }),

      m(Toaster, {
        toasts: this.notifications.map(notification => m(Toast, {
          key: notification.key,
          message: notification.message,
          onDismiss: this.dismiss
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
}
