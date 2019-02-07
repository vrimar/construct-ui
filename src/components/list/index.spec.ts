import m from 'mithril';
import assert from 'assert';
import { List, ListItem, IListAttrs, IListItemAttrs, Classes } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('list', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const listItem = () => el().firstChild as HTMLElement;
  const leftContent = () => listItem().querySelector(`.${Classes.LIST_ITEM_CONTENT_LEFT}`);
  const rightContent = () => listItem().querySelector(`.${Classes.LIST_ITEM_CONTENT_RIGHT}`);

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      interactive: true,
      style: 'margin:0'
    });

    assert(hasClass(el(), Classes.LIST));
    assert(hasClass(el(), Classes.INTERACTIVE));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(el().hasAttribute('style'));
  });

  it('Renders children', () => {
    mount({});

    assert.equal(el().children.length, 1);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    assert(el().hasAttribute('id'));
    assert(el().hasAttribute('name'));
  });

  describe('list-item', () => {
    it('Renders correctly', () => {
      mount({}, {
        active: true,
        label: 'label',
        class: Classes.POSITIVE,
        selected: true,
        style: 'margin:0'
      });

      assert(hasClass(listItem(), Classes.LIST_ITEM));
      assert(hasClass(listItem(), Classes.ACTIVE));
      assert(hasClass(listItem(), Classes.POSITIVE));
      assert(hasClass(listItem(), Classes.SELECTED));
      assert(listItem().hasAttribute('style'));
      assert.equal(listItem().innerHTML, 'label');
    });

    it('Renders left content', () => {
      mount({}, { contentLeft: 'contentLeft' });

      assert(hasChildClass(listItem(), Classes.LIST_ITEM_CONTENT_LEFT));
      assert.equal(leftContent().innerHTML, 'contentLeft');
    });

    it('Renders right content', () => {
      mount({}, { contentRight: 'contentRight' });

      assert(hasChildClass(listItem(), Classes.LIST_ITEM_CONTENT_RIGHT));
      assert.equal(rightContent().innerHTML, 'contentRight');
    });

    it('Clicking right/left content should prevent onclick callback', () => {
      let count = 0;

      mount({}, {
        contentLeft: 'contentLeft',
        contentRight: 'contentRight',
        onclick: () => count++
      });

      listItem().dispatchEvent(new Event('click'));
      leftContent().dispatchEvent(new Event('click'));
      rightContent().dispatchEvent(new Event('click'));

      assert.equal(count, 1);
    });
  });

  function mount(attrs: IListAttrs, itemAttrs?: IListItemAttrs) {
    const component = {
      view: () => m(List, { ...attrs }, [
        m(ListItem, { ...itemAttrs })
      ])
    };
    m.mount(document.body, component);
  }
});
