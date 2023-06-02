import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { QueryList, Classes, Tag, Keys, IQueryListAttrs } from '@/';
import { hasClass, hasChildClass, TIMEOUT, keyboardEvent, sleep } from '@shared/test/utils';
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

    expect(hasClass(el(), Classes.QUERY_LIST)).toBeTruthy();
    expect(hasChildClass(el(), Classes.LIST)).toBeTruthy();
    expect(hasClass(el(), Classes.QUERY_LIST_CHECKMARK)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(el().style.color).toBe('red');
  });

  it('Renders control group', () => {
    mount();

    expect(controlGroup()).toBeTruthy();
  });

  it('Passes through controlGroupAttrs', () => {
    mount({
      controlGroupAttrs: { id: 'test' }
    });

    expect(controlGroup().id).toBe('test');
  });

  it('Renders control group left content', () => {
    mount({
      contentLeft: m(Tag)
    });

    expect(hasChildClass(controlGroup(), Classes.TAG)).toBeTruthy();
  });

  it('Renders control group right content', () => {
    mount({
      contentRight: m(Tag)
    });

    expect(hasChildClass(controlGroup(), Classes.TAG)).toBeTruthy();
  });

  it('Renders filter input', () => {
    mount();

    expect(hasChildClass(el(), Classes.INPUT)).toBeTruthy();
  });

  it('Renders clear icon when query is set', () => {
    mount({ defaultQuery: '1' });
    expect(inputClearIcon()).toBeTruthy();
  });

  it('Clicking on clear icon resets input value', async () => {
    mount({ defaultQuery: '1' });
    inputClearIcon().dispatchEvent(new Event('click'));

    await sleep(TIMEOUT);
    expect(input().value).toBe('');
  });

  it('ESCAPE key clears input value', async () => {
    const defaultQuery = 'testing';

    mount({ defaultQuery });

    expect(input().value).toBe(defaultQuery);
    input().focus();

    await keyboardEvent(el(), Keys.ESCAPE);
    expect(input().value).toBeFalsy();
  });

  it('filterable=false hides filter input', () => {
    mount({ filterable: false });
    expect(hasChildClass(el(), Classes.INPUT)).toBeFalsy();
  });

  it('Passes through inputAttrs', () => {
    mount({
      inputAttrs: { name: 'test' }
    });

    expect(input().name).toBe('test');
  });

  it('Renders initialContent when query is empty', () => {
    const initialContent = 'Search...';
    mount({ initialContent });

    expect(hasClass(list(), Classes.QUERY_LIST_INITIAL)).toBeTruthy();
    expect(list().innerHTML.includes(initialContent)).toBeTruthy();
  });

  it('Renders empty content message when no results', () => {
    const emptyContent = 'No results';
    mount({
      itemPredicate: (query: string, item: string) => item.includes(query),
      defaultQuery: 'testing',
      emptyContent
    });

    expect(list().innerHTML.includes(emptyContent)).toBeTruthy();
  });

  it('Sets default query', () => {
    mount({ defaultQuery: '1' });

    expect(input().value).toBe('1');
  });

  it('Renders list items', () => {
    mount();

    expect(list().children.length).toBe(items.length);
  });

  it('Renders checkmark icon when item selected=true', () => {
    mount({
      itemRender: (_item: string, index) => m(ListItem, { selected: index === endIndex })
    });

    const item = getItem(endIndex);

    expect(hasChildClass(item, `${Classes.ICON}-${Icons.CHECK}`)).toBeTruthy();
  });

  it('Passes through listAttrs', () => {
    mount({ listAttrs: { size: 'xs' } });

    expect(hasClass(list(), Classes.XS)).toBeTruthy();
  });

  it('Sets default active index', () => {
    mount({ defaultActiveIndex: endIndex });

    expect(hasClass(getItem(endIndex), Classes.ACTIVE)).toBeTruthy();
  });

  it('Handles filtering when itemPredicate specified', () => {
    mount({
      itemPredicate: (query: string, item: string) => item.includes(query),
      defaultQuery: '1'
    });

    expect(list().children.length).toBe(1);
  });

  it('Handles itemListPredicate', () => {
    mount({
      itemListPredicate: (query: string, arr: string[]) =>
        arr.filter(item => item.includes(query)),
      defaultQuery: '1'
    });

    expect(list().children.length).toBe(1);
  });

  it('Item click calls onSelect', () => {
    let count = 0;
    mount({ onSelect: () => count++ });

    const itemEl = getItem(0);
    itemEl.dispatchEvent(new Event('click'));

    expect(count).toBe(1);
  });

  it('Disabled item click does not trigger onSelect', () => {
    let count = 0;

    mount({
      onSelect: () => count++,
      itemRender: () => m('', { disabled: true })
    });

    const itemEl = getItem(0);
    itemEl.dispatchEvent(new Event('click'));

    expect(count).toBe(0);
  });

  describe('Keyboard navigation', () => {
    it('ARROW_DOWN updates active item', async () => {
      mount();
      await keyboardEvent(el(), Keys.ARROW_DOWN);
      expect(hasClass(getItem(1), Classes.ACTIVE)).toBeTruthy();
    });

    it('ARROW_UP updates active item', async () => {
      mount();
      await keyboardEvent(el(), Keys.ARROW_UP);
      expect(hasClass(getItem(endIndex), Classes.ACTIVE)).toBeTruthy();
    });

    it('ARROW_DOWN wraps to start item when at end of list', async () => {
      mount({ defaultActiveIndex: endIndex });
      await keyboardEvent(el(), Keys.ARROW_DOWN);
      expect(hasClass(getItem(0), Classes.ACTIVE)).toBeTruthy();
    });

    it('ARROW_UP wraps to end item when at start of list', async () => {
      mount();
      await keyboardEvent(el(), Keys.ARROW_UP);
      expect(hasClass(getItem(endIndex), Classes.ACTIVE)).toBeTruthy();
    });

    it('ENTER on active item calls onSelect', async () => {
      let count = 0;
      mount({ onSelect: () => count++ });

      await keyboardEvent(el(), Keys.ENTER);
      expect(count).toBe(1);
    });
  });

  describe('controlled', () => {
    it('Sets activeIndex', () => {
      mount({ activeIndex: endIndex });
      expect(getItem(endIndex), Classes.ACTIVE).toBeTruthy();
    });

    it('Keyboard navigation calls onActiveItemChange', async () => {
      let count = 0;
      mount({
        activeIndex: 0,
        onActiveItemChange: () => count++
      });
      await keyboardEvent(el(), Keys.ARROW_DOWN);
      await keyboardEvent(el(), Keys.ARROW_UP);

      expect(count).toBe(2);
    });

    it('Sets input query', () => {
      const query = 'testing';

      mount({ query });

      expect(input().value).toBe(query);
    });

    it('Input value change calls onQueryChange', async () => {
      const query = 'testing';
      let count = 0;
      mount({
        query,
        onQueryChange: () => count++
      });

      input().value = query;
      input().dispatchEvent(new Event('input'));

      // onChange is debounced at 200 ms
      await sleep(200);
      expect(count).toBe(1);
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
