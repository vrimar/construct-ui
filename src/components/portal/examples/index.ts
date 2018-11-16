import m from 'mithril';
import { Card, Portal, Button } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/portal/examples/index.ts';

export class PortalExample {
  private isOpen = false;

  public view() {
    const card = m(Card, { elevation: 4 }, m('', 'This content is taken out of document flow.'));

    return m(Example, { src: EXAMPLE_SRC }, [
      m(Button, {
        intent: 'primary',
        label: this.isOpen ? 'Hide Portal' : 'Show Portal',
        onclick: () => this.isOpen = !this.isOpen
      }),

      this.isOpen && m(Portal, { style: 'position: absolute; top:10px; left: 10px' }, card)
    ]);
  }
}
