import m from 'mithril';
import { Icons, Input, Switch, Size, Intent } from '@/';
import { ContentSelect, ContentType, IntentSelect, SizeSelect, renderContent, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/input/examples/index.ts';

export class InputExample {
  private contentLeft: ContentType;
  private contentRight: ContentType;
  private disabled: boolean = false;
  private fluid: boolean = false;
  private intent: Intent;
  private readonly: boolean = false;
  private size: Size;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Input, {
        contentLeft: renderContent(this.contentLeft, Icons.CALENDAR),
        contentRight: renderContent(this.contentRight, Icons.ALERT_CIRCLE),
        disabled: this.disabled,
        fluid: this.fluid,
        intent: this.intent,
        placeholder: 'Placeholder...',
        readonly: this.readonly,
        size: this.size
      })
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Sizes'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m('h5', 'Intent'),
      m(IntentSelect, { onSelect: (intent: Intent) => this.intent = intent }),
      m(Switch, {
        checked: this.disabled,
        label: 'Disabled',
        onchange: () => this.disabled = !this.disabled
      }),

      m(Switch, {
        checked: this.readonly,
        label: 'Readonly',
        onchange: () => this.readonly = !this.readonly
      }),

      m(Switch, {
        checked: this.fluid,
        label: 'Fluid',
        onchange: () => this.fluid = !this.fluid
      }),
      m('h5', 'Left content'),
      m(ContentSelect, { onSelect: (contentType: ContentType) => this.contentLeft = contentType }),
      m('h5', 'Right content'),
      m(ContentSelect, { onSelect: (contentType: ContentType) => this.contentRight = contentType })
    ];
  }
}
