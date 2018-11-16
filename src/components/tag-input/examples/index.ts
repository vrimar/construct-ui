import m from 'mithril';
import { Switch, TagInput, Size, Intent, Tag, Icon, Icons } from '@/';
import { IntentSelect, SizeSelect, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/tag-input/examples/index.ts';
const tags = ['First', 'Second', 'Third'];

export class TagInputExample {
  private size: Size;
  private intent: Intent;
  private disabled: boolean = false;
  private addOnBlur: boolean = false;
  private tags = [...tags];

  public view() {
    const isEmpty = this.tags.length === 0;

    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(TagInput, {
        addOnBlur: this.addOnBlur,
        tags: this.tags.map(tag => m(Tag, {
          label: tag,
          onRemove: () => this.removeTag(tag)
        })),
        disabled: this.disabled,
        intent: this.intent,
        size: this.size,
        contentLeft: m(Icon, { name: Icons.SETTINGS }),
        contentRight: m(Icon, {
          name: isEmpty ? Icons.REFRESH_CW : Icons.X,
          onclick: isEmpty ? this.reset : this.clear
        }),
        onAdd: this.onAdd
      })
    ]);
  }

  private onAdd = (value: string) => {
    this.tags.push(value);
  }

  private removeTag = (tag: string) => {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }

  private clear = () => {
    this.tags = [];
  }

  private reset = () => {
    this.tags = [...tags];
  }

  public renderOptions() {
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
        checked: this.addOnBlur,
        label: 'Add on blur',
        onchange: () => this.addOnBlur = !this.addOnBlur
      })
    ];
  }
}
