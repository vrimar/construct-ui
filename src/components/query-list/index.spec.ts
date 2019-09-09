import m from 'mithril';
import assert from 'assert';
import { QueryList, Classes, Tag, Keys, IQueryListAttrs } from '@/';
import { hasClass, hasChildClass, TIMEOUT, keyboardEvent } from '@shared/test/utils';
import { Icons } from '../icon';
import { ListItem } from '../list';

const items = ['1', '2', '3'];
const endIndex = 2;

describe('query-list', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const input = () => el().querySelector('input') as HTMLInputElement;
  const list = () => el().querySelector(`.${Classes.LIST}`) as HTMLElement;
  const inputClearIcon = () => el().querySelector(`.${Classes.ICON}-${Icons.X}`) as HTMLElement;
  const controlGroup = () => el().querySelector(`.${Classes.CONTROL_GROUP}`) as HTMLElement;
  const getItem = (index: number) => list().children[index] as HTMLElement;

  afterEach(() => {
    document.body.innerHTML = '';
    m.mount(document.body, null);
  });

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      checkmark: true,
      style: 'color: red'
    });

    assert(hasClass(el(), Classes.QUERY_LIST));
    assert(hasChildClass(el(), Classes.LIST));
    assert(hasClass(el(), Classes.QUERY_LIST_CHECKMARK));
    assert(hasClass(el(), Classes.POSITIVE));
    assert.equal(el().style.color, 'red');
  });

  it('Renders control group', () => {
    mount();

    assert(controlGroup());
  });

  it('Passes through controlGroupAttrs', () => {
    mount({
      controlGroupAttrs: { id: 'test' }
    });

    assert.equal(controlGroup().id, 'test');
  });

  it('Renders control group left content', () => {
    mount({
      contentLeft: m(Tag)
    });

    assert(hasChildClass(controlGroup(), Classes.TAG));
  });

  it('Renders control group right content', () => {
    mount({
      contentRight: m(Tag)
    });

    assert(hasChildClass(controlGroup(), Classes.TAG));
  });

  it('Renders filter input', () => {
    mount();

    assert(hasChildClass(el(), Classes.INPUT));
  });

  it('Renders clear icon when query is set', () => {
    mount({ defaultQuery: '1' });
    assert(inputClearIcon());
  });

  it('Clicking on clear icon resets input value', (done) => {
    mount({ defaultQuery: '1' });
    inputClearIcon().dispatchEvent(new Event('click'));

    setTimeout(() => {
      assert.equal(input().value, '');
      done();
    }, TIMEOUT);
  });

  it('ESCAPE key clears input value', done => {
    const defaultQuery = 'testing';

    mount({ defaultQuery });

    assert.equal(input().value, defaultQuery);
    input().focus();

    keyboardEvent(el(), Keys.ESCAPE);

    setTimeout(() => {
      assert(!input().value);
      done();
    }, TIMEOUT);
  });

  it('filterable=false hides filter input', () => {
    mount({ filterable: false });
    assert(!hasChildClass(el(), Classes.INPUT));
  });

  it('Passes through inputAttrs', () => {
    mount({
      inputAttrs: { name: 'test' }
    });

    assert.equal(input().name, 'test');
  });

  it('Renders initialContent when query is empty', () => {
    const initialContent = 'Search...';
    mount({ initialContent });

    assert(hasClass(list(), Classes.QUERY_LIST_INITIAL));
    assert(list().innerHTML.includes(initialContent));
  });

  it('Renders empty content message when no results', () => {
    const emptyContent = 'No results';
    mount({
      itemPredicate: (query: string, item: string) => item.includes(query),
      defaultQuery: 'testing',
      emptyContent
    });

    assert(list().innerHTML.includes(emptyContent));
  });

  it('Sets default query', () => {
    mount({ defaultQuery: '1' });

    assert.equal(input().value, '1');
  });

  it('Renders list items', () => {
    mount();

    assert.equal(list().children.length, items.length);
  });

  it('Renders checkmark icon when item selected=true', () => {
    mount({
      itemRender: (_item: string, index) => m(ListItem, { selected: index === endIndex })
    });

    const item = getItem(endIndex);

    assert(hasChildClass(item, `${Classes.ICON}-${Icons.CHECK}`));
  });

  it('Passes through listAttrs', () => {
    mount({ listAttrs: { size: 'xs' } });

    assert(hasClass(list(), Classes.XS));
  });

  it('Sets default active index', () => {
    mount({ defaultActiveIndex: endIndex });

    assert(hasClass(getItem(endIndex), Classes.ACTIVE));
  });

  it('Handles filtering when itemPredicate specified', () => {
    mount({
      itemPredicate: (query: string, item: string) => item.includes(query),
      defaultQuery: '1'
    });

    assert.equal(list().children.length, 1);
  });

  it('Handles itemListPredicate', () => {
    mount({
      itemListPredicate: (query: string, arr: string[]) =>
        arr.filter(item => item.includes(query)),
      defaultQuery: '1'
    });

    assert.equal(list().children.length, 1);
  });

  it('Item click calls onSelect', () => {
    let count = 0;
    mount({ onSelect: () => count++ });

    const itemEl = getItem(0);
    itemEl.dispatchEvent(new Event('click'));

    assert.equal(count, 1);
  });

  it('Disabled item click does not trigger onSelect', () => {
    let count = 0;

    mount({
      onSelect: () => count++,
      itemRender: () => m('', { disabled: true })
    });

    const itemEl = getItem(0);
    itemEl.dispatchEvent(new Event('click'));

    assert.equal(count, 0);
  });

  describe('Keyboard navigation', () => {
    it('ARROW_DOWN updates active item', (done) => {
      mount();
      keyboardEvent(el(), Keys.ARROW_DOWN);

      setTimeout(() => {
        assert(hasClass(getItem(1), Classes.ACTIVE));
        done();
      }, TIMEOUT);
    });

    it('ARROW_UP updates active item', (done) => {
      mount();
      keyboardEvent(el(), Keys.ARROW_UP);

      setTimeout(() => {
        assert(hasClass(getItem(endIndex), Classes.ACTIVE));
        done();
      }, TIMEOUT);
    });

    it('ARROW_DOWN wraps to start item when at end of list', (done) => {
      mount({ defaultActiveIndex: endIndex });
      keyboardEvent(el(), Keys.ARROW_DOWN);

      setTimeout(() => {
        assert(hasClass(getItem(0), Classes.ACTIVE));
        done();
      }, TIMEOUT);
    });

    it('ARROW_UP wraps to end item when at start of list', (done) => {
      mount();
      keyboardEvent(el(), Keys.ARROW_UP);

      setTimeout(() => {
        assert(hasClass(getItem(endIndex), Classes.ACTIVE));
        done();
      }, TIMEOUT);
    });

    it('ENTER on active item calls onSelect', () => {
      let count = 0;
      mount({ onSelect: () => count++ });

      keyboardEvent(el(), Keys.ENTER);

      assert.equal(count, 1);
    });
  });

  describe('controlled', () => {
    it('Sets activeIndex', () => {
      mount({ activeIndex: endIndex });
      assert(getItem(endIndex), Classes.ACTIVE);
    });

    it('Keyboard navigation calls onActiveItemChange', () => {
      let count = 0;
      mount({
        activeIndex: 0,
        onActiveItemChange: () => count++
      });
      keyboardEvent(el(), Keys.ARROW_DOWN);
      keyboardEvent(el(), Keys.ARROW_UP);

      assert.equal(count, 2);
    });

    it('Sets input query', () => {
      const query = 'testing';

      mount({ query });

      assert.equal(input().value, query);
    });

    it('Input value change calls onQueryChange', (done) => {
      const query = 'testing';
      let count = 0;
      mount({
        query,
        onQueryChange: () => count++
      });

      input().value = query;
      input().dispatchEvent(new Event('input'));

      // onChange is debounced at 200 ms
      setTimeout(() => {
        assert.equal(count, 1);
        done();
      }, 250);
    });
  });

  // TODO: Add test for vertical-scroll to item
  // TODO: Test for cache items

  function mount(attrs?: Partial<IQueryListAttrs<any>>) {
    const component = {
      view: () => m(QueryList, {
        items,
        itemRender: (item: string) => m('', item),
        ...attrs
      })
    };

    m.mount(document.body, component);
    return component;
  }
});
