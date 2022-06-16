import m from 'mithril';
import { Icons, InputFile, Switch, Size, Intent } from '@/';
import { ContentSelect, IntentSelect, SizeSelect, ContentType, renderContent, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/input-file/examples/index.ts';

export class InputFileExample {
  private contentLeft: ContentType;
  private contentRight: ContentType;
  private disabled = false;
  private fluid = false;
  private intent: Intent;
  private size: Size;
  private text: string;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(InputFile, {
        contentLeft: renderContent(this.contentLeft, Icons.CALENDAR),
        contentRight: renderContent(this.contentRight, Icons.ALERT_CIRCLE),
        disabled: this.disabled,
        fluid: this.fluid,
        intent: this.intent,
        onchange: this.handleChange,
        size: this.size,
        text: this.text
      })
    ]);
  }

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.text = target.files![0].name;
  };

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size }),
      m('h5', 'Intent'),
      m(IntentSelect, { onSelect: (intent: Intent) => this.intent = intent }),
      m(Switch, {
        checked: this.disabled,
        label: 'Disabled',
        onchange: () => this.disabled = !this.disabled
      }),
      m(Switch, {
        checked: this.fluid,
        label: 'Fluid',
        onchange: () => this.fluid = !this.fluid
      }),
      m('h5', 'Left content'),
      m(ContentSelect, { onSelect: (content: ContentType) => this.contentLeft = content }),
      m('h5', 'Right content'),
      m(ContentSelect, { onSelect: (content: ContentType) => this.contentRight = content })
    ];
  }
}
