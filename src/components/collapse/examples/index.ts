import m from 'mithril';
import { Button, Collapse, Card } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/collapse/examples/index.ts';
const SAMPLE_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum ex eu eros dictum.<br/><br/>';

export class CollapseExample {
  private isOpen = false;
  private content = [SAMPLE_TEXT];

  public view() {
    return m(Example, { center: false, src: EXAMPLE_SRC }, [
      m(Button, {
        label: this.isOpen ? 'Hide collapse' : 'Show collapse',
        intent: 'primary',
        onclick: this.toggleOpen,
        style: 'margin-right: 10px'
      }),

      m(Button, {
        label: 'Append content',
        onclick: this.appendContent
      }),

      m(Collapse, { duration: 200, isOpen: this.isOpen }, [
        m(Card, { style: 'margin-top:20px' }, this.content.map((text) => m.trust(text)))
      ])
    ]);
  }

  private appendContent = () => {
    this.content.push(SAMPLE_TEXT);
  };

  private toggleOpen = () => {
    this.isOpen = !this.isOpen;
  };
}
