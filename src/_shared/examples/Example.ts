import m from 'mithril';
import { Button, Icons, ResponsiveManager } from '../../';
import { Drawer } from '@/';

export interface IExampleAttrs {
  class?: string;
  options?: m.Children;
  center?: boolean;
  direction?: 'column' | 'row';
  src?: string;
}

const GITHUB_SRC = 'https://github.com/vrimar/construct-ui/blob/master/src/';

export class Example implements m.Component<IExampleAttrs> {
  private isDrawerOpen: boolean = false;

  public view({ attrs, children }: m.Vnode<IExampleAttrs>) {
    const { class: className, options, center = true, direction = 'row', src } = attrs;

    const content = [
      children,
      m(Button, {
        class: 'cui-example-src-btn',
        iconLeft: Icons.CODE,
        label: 'Source',
        size: 'xs',
        href: `${GITHUB_SRC}${src}`,
        target: '_blank',
        rounded: true
      })
    ];

    return m('.cui-example', { class: className }, [
      m('.cui-example-content', {
        class: center ? 'cui-example-center' : '',
        style: `flex-direction:${direction}`
      }, content),

      this.renderOptions(options)
    ]);
  }

  private renderOptions(options: m.Children) {
    const isXsSize = ResponsiveManager.is('xs');
    const content = m('.cui-example-options', options);

    if (isXsSize) {
      return options && [
        m(Button, {
          class: 'cui-example-options-btn',
          iconLeft: Icons.SETTINGS,
          onclick: () => this.isDrawerOpen = true,
          size: 'xs',
          rounded: true
        }),

        m(Drawer, {
          class: 'cui-example-mobile-drawer',
          isOpen: this.isDrawerOpen,
          onClose: () => this.isDrawerOpen = false,
          position: 'bottom',
          hasBackdrop: false,
          content
        })
      ];
    }

    return options && content;
  }
}
