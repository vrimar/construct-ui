import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { List, ListItem, IListAttrs, IListItemAttrs, Classes } from '@/';
import { hasClass, hasChildClass } from '@test-utils';

describe('list', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const listItem = () => el().firstChild as HTMLElement;
  const leftContent = () => listItem().querySelector(`.${Classes.LIST_ITEM_CONTENT_LEFT}`) as HTMLElement;
  const rightContent = () => listItem().querySelector(`.${Classes.LIST_ITEM_CONTENT_RIGHT}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      interactive: true,
      style: 'margin:0'
    });

    expect(hasClass(el(), Classes.LIST)).toBeTruthy();
    expect(hasClass(el(), Classes.INTERACTIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders children', () => {
    mount({});

    expect(el().children.length).toBe(1);
  });

  it('Passes through html attrs', () => {
    mount({
      id: 1,
      name: 'name'
    });

    expect(el().hasAttribute('id')).toBeTruthy();
    expect(el().hasAttribute('name')).toBeTruthy();
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

      expect(hasClass(listItem(), Classes.LIST_ITEM)).toBeTruthy();
      expect(hasClass(listItem(), Classes.ACTIVE)).toBeTruthy();
      expect(hasClass(listItem(), Classes.POSITIVE)).toBeTruthy();
      expect(hasClass(listItem(), Classes.SELECTED)).toBeTruthy();
      expect(listItem().hasAttribute('style')).toBeTruthy();
      expect(listItem().innerHTML).toBe('label');
    });

    it('Renders left content', () => {
      mount({}, { contentLeft: 'contentLeft' });

      expect(hasChildClass(listItem(), Classes.LIST_ITEM_CONTENT_LEFT));
      expect(leftContent().innerHTML).toBe('contentLeft');
    });

    it('Renders right content', () => {
      mount({}, { contentRight: 'contentRight' });

      expect(hasChildClass(listItem(), Classes.LIST_ITEM_CONTENT_RIGHT));
      expect(rightContent().innerHTML).toBe('contentRight');
    });

    it('Clicking right/left content should prevent onclick callback', () => {
      let count = 0;

      mount({}, {
        contentLeft: 'contentLeft',
        contentRight: 'contentRight',
        onclick: () => count++
      });

      listItem().dispatchEvent(new Event('click', { bubbles: true }));
      leftContent().dispatchEvent(new Event('click', { bubbles: true }));
      rightContent().dispatchEvent(new Event('click', { bubbles: true }));

      expect(count).toBe(1);
    });

    it('Clicking right/left content should call onclick callback when allowOnContentClick=true', () => {
      let count = 0;

      mount({}, {
        contentLeft: 'contentLeft',
        contentRight: 'contentRight',
        allowOnContentClick: true,
        onclick: () => count++
      });

      listItem().dispatchEvent(new Event('click', { bubbles: true }));
      leftContent().dispatchEvent(new Event('click', { bubbles: true }));
      rightContent().dispatchEvent(new Event('click', { bubbles: true }));
      expect(count).toBe(3);
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
