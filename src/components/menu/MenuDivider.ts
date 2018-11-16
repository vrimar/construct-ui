import m from 'mithril';
import { Classes } from '../../_shared';

export class MenuDivider implements m.Component {
  public view() {
    return m(`.${Classes.MENU_DIVIDER}`);
  }
}
