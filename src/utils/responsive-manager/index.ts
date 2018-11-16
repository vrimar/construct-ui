import m from 'mithril';
import { Breakpoints } from '../../_shared';

let enquirejs: any;

if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string): MediaQueryList => {
    return {
      media: mediaQuery,
      matches: false,
      // tslint:disable-next-line:no-empty
      addListener() {
      },
      // tslint:disable-next-line:no-empty
      removeListener() {
      }
    } as any;
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  // tslint:disable-next-line:no-var-requires
  enquirejs = require('enquire.js');
}

const breakpointKeys = Object.keys(Breakpoints);

class ResponsiveManager {
  private isInitialized: boolean = false;

  /** Key value of active breakpoints */
  public breakpoints: { [breakpoint: string]: boolean };

  /** Binds initial breakpoints */
  public initialize() {
    if (this.isInitialized) {
      return;
    }

    breakpointKeys.map(breakpoint => enquirejs.register(Breakpoints[breakpoint], {
      match: () => {
        this.breakpoints = {
          ...this.breakpoints,
          [breakpoint]: true
        };
        m.redraw();
      },
      unmatch: () => {
        this.breakpoints = {
          ...this.breakpoints,
          [breakpoint]: false
        };
        m.redraw();
      },
      // tslint:disable-next-line:no-empty
      destroy: () => { }
    }));

    this.isInitialized = true;
  }

  /** Checks if current breakpoint string is active */
  public is(key: keyof typeof Breakpoints) {
    return this.breakpoints[key] === true;
  }

  /** Unbinds all breakpoints */
  public destroy() {
    breakpointKeys.map(breakpoint => enquirejs.unregister(Breakpoints[breakpoint]));
  }
}

export default new ResponsiveManager();
