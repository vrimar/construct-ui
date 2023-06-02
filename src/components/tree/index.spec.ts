import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Tree, TreeNode, Classes } from '@/';
import { hasClass, hasChildClass } from '@test-utils';
import { ITreeAttrs } from './Tree';
import { Tag } from '../tag';

describe('tree', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const node = () => el().firstChild as HTMLElement;
  const nodeCaret = () => node().querySelector(`.${Classes.TREE_NODE_CARET}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'color: red'
    });

    expect(hasClass(el(), Classes.TREE)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(el().style.color).toBe('red');
  });

  it('Passes through html attrs', () => {
    const id = 'id';
    mount({ id });

    expect(el().id).toBe(id);
  });

  it('Renders nodes', () => {
    mount();

    expect(el().children.length).toBe(2);
  });

  describe('tree-node', () => {
    const label = 'tree-item-test-label';

    it('Renders correctly', () => {
      mount({
        nodes: [
          m(TreeNode, {
            key: 1,
            class: Classes.POSITIVE,
            style: 'color: red',
            label
          })
        ]
      });

      expect(hasClass(node(), Classes.TREE_NODE)).toBeTruthy();
      expect(hasChildClass(node(), Classes.TREE_NODE_CONTENT)).toBeTruthy();
      expect(hasClass(node(), Classes.POSITIVE)).toBeTruthy();
      expect(node().style.color).toBe('red');
      expect(node().innerHTML.includes(label)).toBeTruthy();
    });

    it('Renders left content', () => {
      mount({
        nodes: [
          m(TreeNode, {
            key: 1,
            contentLeft: m(Tag)
          })
        ]
      });

      expect(hasChildClass(node(), Classes.TREE_NODE_CONTENT_LEFT)).toBeTruthy();
      expect(hasChildClass(node(), Classes.TAG)).toBeTruthy();
    });

    it('Renders right content', () => {
      mount({
        nodes: [
          m(TreeNode, {
            key: 1,
            contentRight: m(Tag)
          })
        ]
      });

      expect(hasChildClass(node(), Classes.TREE_NODE_CONTENT_RIGHT)).toBeTruthy();
      expect(hasChildClass(node(), Classes.TAG)).toBeTruthy();
    });

    it('Renders caret when hasCaret=true', () => {
      mount({
        nodes: [
          m(TreeNode, {
            key: 1,
            hasCaret: true
          })
        ]
      });

      expect(hasChildClass(node(), Classes.TREE_NODE_CARET)).toBeTruthy();
      expect(hasChildClass(node(), Classes.TREE_NODE_CARET_CLOSED)).toBeTruthy();
    });

    it('isExpanded=true sets correct class', () => {
      mount({
        nodes: [
          m(TreeNode, {
            key: 1,
            isExpanded: true
          })
        ]
      });

      expect(hasClass(node(), Classes.TREE_NODE_EXPANDED)).toBeTruthy();
    });

    it('Renders child nodes when expanded', () => {
      const childLabel = 'tree-node-test-label';

      mount({
        nodes: [
          m(TreeNode, {
            key: 1,
            isExpanded: true,
            children: [m(TreeNode, { key: 2, label: childLabel })]
          })
        ]
      });

      expect(hasChildClass(node(), Classes.TREE_NODE_LIST)).toBeTruthy();
    });

    it('isSelected=true sets correct class', () => {
      mount({
        nodes: [
          m(TreeNode, {
            key: 1,
            isSelected: true
          })
        ]
      });

      expect(hasClass(node(), Classes.TREE_NODE_SELECTED)).toBeTruthy();
    });

    describe('interaction', () => {
      it('Handles onclick', () => {
        let count = 0;

        mount({
          nodes: [
            m(TreeNode, {
              key: 1,
              onclick: () => count++
            })
          ]
        });

        node().dispatchEvent(new Event('click'));
        expect(count).toBe(1);
      });

      it('Handles onExpand when hasCaret=true', () => {
        let count = 0;

        mount({
          nodes: [
            m(TreeNode, {
              key: 1,
              hasCaret: true,
              onExpand: () => count++
            })
          ]
        });

        nodeCaret().dispatchEvent(new Event('click'));
        expect(count).toBe(1);
      });

      it('Handles onCollapse when hasCaret=true and isExpanded=true', () => {
        let count = 0;

        mount({
          nodes: [
            m(TreeNode, {
              key: 1,
              isExpanded: true,
              hasCaret: true,
              onCollapse: () => count++
            })
          ]
        });

        nodeCaret().dispatchEvent(new Event('click'));
        expect(count).toBe(1);
      });
    });

    mount({
      nodes: [
        m(TreeNode, {
          key: 1,
          label,
          contentLeft: m(Tag),
          contentRight: m(Tag),
          hasCaret: true,
          isExpanded: true,
          isSelected: true
        })
      ]
    });
  });

  function mount(attrs?: ITreeAttrs) {
    const component = {
      view: () => m(Tree, {
        nodes: [
          m(TreeNode),
          m(TreeNode)
        ],
        ...attrs
      })
    };

    m.mount(document.body, component);
  }
});
