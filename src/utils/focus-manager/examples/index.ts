import m from 'mithril';
import { Button, Switch, Input, FocusManager } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'utils/focus-manager/examples/index.ts';

export class FocusManagerExample {
  private showFocusOnTab = true;

  public onremove() {
    FocusManager.showFocusOnlyOnTab();
  }

  public view() {
    return m(Example, { options: this.renderOptions(), direction: 'column', src: EXAMPLE_SRC }, [
      m(Button, { label: 'Button', style: 'margin-bottom: 20px' }),

      m(Input, { placeholder: 'Placeholder...' })
    ]);
  }

  private renderOptions() {
    return [
      m(Switch, {
        checked: this.showFocusOnTab,
        label: 'Show focus only on tab',
        onchange: () => {
          this.showFocusOnTab
            ? FocusManager.alwaysShowFocus()
            : FocusManager.showFocusOnlyOnTab();
          this.showFocusOnTab = !this.showFocusOnTab;
        }
      })
    ];
  }
}
