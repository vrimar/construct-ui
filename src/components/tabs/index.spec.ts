import m from 'mithril';
import assert from 'assert';
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

    assert(hasClass(el(), Classes.TABS));
    assert(hasClass(el(), Classes.ALIGN_LEFT));
    assert(hasClass(el(), Classes.TABS_BORDERED));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.FLUID));
    assert(hasClass(el(), Classes.XS));
    assert(el().childNodes.length === 1);
  });

  it('Passes through html attrs', () => {
    mount({ id: 1 });
    assert(el().hasAttribute('id'));
  });

  describe('tab-item', () => {
    it('Renders correctly', () => {
      mount({}, {
        active: true,
        class: Classes.POSITIVE,
        label: 'testing',
        loading: true
      });

      assert(hasClass(tabItem(), Classes.TABS_ITEM));
      assert(hasClass(tabItem(), Classes.ACTIVE));
      assert(hasClass(tabItem(), Classes.POSITIVE));
      assert(hasClass(tabItem(), Classes.LOADING));
    });

    it('Passes through html attrs', () => {
      mount({}, { id: 1, label: 'testing' });
      assert(tabItem().hasAttribute('id'));
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
