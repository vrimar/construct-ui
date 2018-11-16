import m from 'mithril';
import { Switch, Select, Icons, Intent, Size } from '@/';
import { Example, ContentSelect, IntentSelect, SizeSelect, ContentType, renderContent } from '@shared/examples';

const EXAMPLE_SRC = 'components/select/examples/default.ts';

export class SelectDefaultExample {
  private contentLeft: ContentType;
  private contentRight: ContentType;
  private basic: boolean = false;
  private disabled: boolean;
  private fluid: boolean = false;
  private intent: Intent;
  private size: Size;
  private options: string[] = ['First', 'Second', 'Third', 'Fourth'];

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Select, {
        contentLeft: renderContent(this.contentLeft, Icons.USERS),
        contentRight: renderContent(this.contentRight, Icons.SEARCH),
        basic: this.basic,
        disabled: this.disabled,
        fluid: this.fluid,
        intent: this.intent,
        options: this.options,
        size: this.size,
        defaultValue: 'Third',
        onchange: () => null
      })
    ]);
  }

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
      m(Switch, {
        checked: this.basic,
        label: 'Basic',
        onchange: () => this.basic = !this.basic
      }),
      m('h5', 'Left content'),
      m(ContentSelect, { onSelect: (content: ContentType) => this.contentLeft = content }),
      m('h5', 'Right content'),
      m(ContentSelect, { onSelect: (content: ContentType) => this.contentRight = content })
    ];
  }
}
