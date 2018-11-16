import m from 'mithril';
import { Button, Classes, Popover, PopoverInteraction, PopoverPosition, Select, Switch, Tooltip, Icon, Icons } from '@/';
import { Example, PopoverPositionSelect } from '@shared/examples';

const EXAMPLE_SRC = 'components/popover/examples/default.ts';

export class PopoverExample implements m.Component {
  private arrow = true;
  private closeOnEscapeKey = true;
  private closeOnContentClick = false;
  private interactionType: PopoverInteraction = 'click';
  private hasBackdrop = false;
  private openOnTriggerFocus = true;
  private position: PopoverPosition = 'bottom';
  private inline = false;

  public view() {
    const content = [
      m('p', 'Popover paragraph content'),
      m(Button, {
        class: Classes.POPOVER_DISSMISS,
        label: 'Dismiss',
        size: 'xs'
      })
    ];

    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Popover, {
        closeOnEscapeKey: this.closeOnEscapeKey,
        closeOnContentClick: this.closeOnContentClick,
        content,
        hasArrow: this.arrow,
        hasBackdrop: this.hasBackdrop,
        inline: this.inline,
        interactionType: this.interactionType,
        openOnTriggerFocus: this.openOnTriggerFocus,
        position: this.position,
        trigger: m(Button, {
          label: 'Popover trigger',
          intent: 'primary'
        })
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Position'),
      m(PopoverPositionSelect, { onSelect: (position: PopoverPosition) => this.position = position }),
      m('h5', 'Interaction'),
      m(Select, {
        fluid: true,
        options: Object.keys(PopoverInteraction).map(key => PopoverInteraction[key]),
        onchange: (e: Event) => {
          const target = e.target as HTMLSelectElement;
          this.interactionType = target.value as PopoverInteraction;
        },
        size: 'xs',
        value: this.interactionType
      }),
      m(Switch, {
        label: 'Close on ESC key',
        checked: this.closeOnEscapeKey,
        onchange: () => this.closeOnEscapeKey = !this.closeOnEscapeKey
      }),
      m(Switch, {
        label: 'Close on content click',
        checked: this.closeOnContentClick,
        onchange: () => this.closeOnContentClick = !this.closeOnContentClick
      }),
      m(Switch, {
        label: 'Has arrow',
        checked: this.arrow,
        onchange: () => this.arrow = !this.arrow
      }),

      m(Switch, {
        label: [
          'Open on trigger focus',
          m(Tooltip, {
            content: 'Only applies to hover interactions',
            trigger: m(Icon, {
              class: 'cui-example-info-trigger',
              name: Icons.INFO,
              size: 'xs'
            }),
            size: 'xs'
          })
        ],
        checked: this.openOnTriggerFocus,
        onchange: () => this.openOnTriggerFocus = !this.openOnTriggerFocus
      }),

      m(Switch, {
        label: 'Has backdrop',
        checked: this.hasBackdrop,
        onchange: () => this.hasBackdrop = !this.hasBackdrop
      }),

      m(Switch, {
        label: 'Render Inline',
        checked: this.inline,
        onchange: () => this.inline = !this.inline
      })
    ];
  }
}
