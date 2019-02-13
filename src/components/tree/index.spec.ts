import m from 'mithril';
import assert from 'assert';
import { Tree, TreeNode, Classes } from '@/';
import { hasClass, hasChildClass } from '@test-utils';
import { ITreeAttrs } from './Tree';
import { Tag } from '../tag';

describe('tree', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const node = () => el().firstChild as HTMLElement;
  const nodeCaret = () => node().querySelector(`.${Classes.TREE_NODE_CARET}`);

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      class: Classes.POSITIVE,
      style: 'color: red'
    });

    assert(hasClass(el(), Classes.TREE));
    assert(hasClass(el(), Classes.POSITIVE));
    assert.equal(el().style.color, 'red');
  });

  it('Passes through html attrs', () => {
    const id = 'id';
    mount({ id });

    assert.equal(el().id, id);
  });

  it('Renders nodes', () => {
    mount();

    assert.equal(el().children.length, 2);
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

      assert(hasClass(node(), Classes.TREE_NODE));
      assert(hasChildClass(node(), Classes.TREE_NODE_CONTENT));
      assert(hasClass(node(), Classes.POSITIVE));
      assert.equal(node().style.color, 'red');
      assert(node().innerHTML.includes(label));
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

      assert(hasChildClass(node(), Classes.TREE_NODE_CONTENT_LEFT));
      assert(hasChildClass(node(), Classes.TAG));
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

      assert(hasChildClass(node(), Classes.TREE_NODE_CONTENT_RIGHT));
      assert(hasChildClass(node(), Classes.TAG));
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

      assert(hasChildClass(node(), Classes.TREE_NODE_CARET));
      assert(hasChildClass(node(), Classes.TREE_NODE_CARET_CLOSED));
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

      assert(hasClass(node(), Classes.TREE_NODE_EXPANDED));
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

      assert(hasChildClass(node(), Classes.TREE_NODE_LIST));
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

      assert(hasClass(node(), Classes.TREE_NODE_SELECTED));
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
        assert.equal(count, 1);
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
        assert.equal(count, 1);
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
        assert.equal(count, 1);
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
