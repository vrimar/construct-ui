import m from 'mithril';
import { Breakpoint, Breakpoints, getObjectKeys } from '../../_shared';
// @ts-ignore
import ssm from 'simplestatemanager/dist/ssm.min.js';

const breakpointKeys = getObjectKeys(Breakpoints);

class ResponsiveManager {
  /** Key value of active breakpoints */
  public activeBreakpoints: Record<Breakpoint, boolean>;

  /** Binds breakpoints */
  public initialize(breakpoints: Record<Breakpoint, string> = Breakpoints) {
    this.destroy();

    breakpointKeys.map(key => ssm.addState({
      id: key,
      query: breakpoints[key],
      onEnter: () => {
        this.activeBreakpoints = {
          ...this.activeBreakpoints,
          [key]: true
        };
        m.redraw();
      },
      onLeave: () => {
        this.activeBreakpoints = {
          ...this.activeBreakpoints,
          [key]: false
        };
        m.redraw();
      }
    }));
  }

  /** Checks if current breakpoint string is active */
  public is(key: keyof typeof Breakpoints) {
    return this.activeBreakpoints[key] === true;
  }

  /** Unbinds all breakpoints */
  public destroy() {
    ssm.removeStates(breakpointKeys);
  }
}

export default new ResponsiveManager();
