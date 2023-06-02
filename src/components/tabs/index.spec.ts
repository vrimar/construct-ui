import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Classes } from '@/';
import { hasClass } from '@test-utils';
import { Tabs, ITabsAttrs } from './Tabs';
import { TabItem, ITabItemAttrs } from './TabsItem';

describe('tabs', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const tabItem = () => el().firstChild as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      align: 'left',
      bordered: true,
      class: Classes.POSITIVE,
      fluid: true,
      size: 'xs'
    });

    expect(hasClass(el(), Classes.TABS)).toBeTruthy();
    expect(hasClass(el(), Classes.ALIGN_LEFT)).toBeTruthy();
    expect(hasClass(el(), Classes.TABS_BORDERED)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.FLUID)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(el().childNodes.length).toBe(1);
  });

  it('Passes through html attrs', () => {
    mount({ id: 1 });
    expect(el().hasAttribute('id')).toBeTruthy();
  });

  describe('tab-item', () => {
    it('Renders correctly', () => {
      mount({}, {
        active: true,
        class: Classes.POSITIVE,
        label: 'testing',
        loading: true
      });

      expect(hasClass(tabItem(), Classes.TABS_ITEM)).toBeTruthy();
      expect(hasClass(tabItem(), Classes.ACTIVE)).toBeTruthy();
      expect(hasClass(tabItem(), Classes.POSITIVE)).toBeTruthy();
      expect(hasClass(tabItem(), Classes.LOADING)).toBeTruthy();
    });

    it('Passes through html attrs', () => {
      mount({}, { id: 1, label: 'testing' });
      expect(tabItem().hasAttribute('id')).toBeTruthy();
    });
  });

  function mount(attrs: ITabsAttrs, tabItemAttrs?: ITabItemAttrs) {
    const component = {
      view: () => m(Tabs, { ...attrs }, [
        m(TabItem, {
          label: 'testing',
          ...tabItemAttrs
        })
      ])
    };
    m.mount(document.body, component);
  }
});
