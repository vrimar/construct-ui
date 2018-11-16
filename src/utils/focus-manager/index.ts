import { Keys, Classes } from '../../_shared';

class FocusManager {
  /** testing */

  public test: boolean;
  /** Focus outline is shown only when tabbing through elements */
  public showFocusOnlyOnTab() {
    const body = document.body;

    body.addEventListener('mousedown', this.handleMouseDown);
    body.addEventListener('keydown', this.handleKeyDown);
  }

  /** Focus outline is always shown (mouse click and tab) */
  public alwaysShowFocus() {
    const body = document.body;

    body.removeEventListener('mousedown', this.handleMouseDown);
    body.removeEventListener('keydown', this.handleKeyDown);
    body.classList.remove(Classes.FOCUS_DISABLED);
  }

  private handleMouseDown = () => {
    document.body.classList.add(Classes.FOCUS_DISABLED);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.which === Keys.TAB) {
      document.body.classList.remove(Classes.FOCUS_DISABLED);
    }
  }
}

export default new FocusManager();
