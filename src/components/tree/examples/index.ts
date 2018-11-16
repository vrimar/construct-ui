import m from 'mithril';
import { Tree, TreeNode, ITreeNodeAttrs, Popover, Icons, Menu, MenuItem, Classes, Icon } from '@/';
import { Example } from '@shared/examples';
import { data, IModel } from './data';

const EXAMPLE_SRC = 'components/tree/examples/index.ts';

export class TreeExample {
  private expandedMap: Map<string | number, boolean>;
  private selectedId: string | number;

  public oninit() {
    this.expandedMap = new Map();
  }

  public view() {
    return m(Example, { center: false, src: EXAMPLE_SRC }, [
      m(Tree, {
        class: 'cui-example-tree-component',
        nodes: data.map(item => this.renderNode(item))
      })
    ]);
  }

  private renderNode(item: IModel): m.Vnode<ITreeNodeAttrs> {
    const { children = [], id, type } = item;
    const hasChildren = children.length !== 0;

    const contentRight = m(Popover, {
      hasArrow: false,
      class: Classes.POPOVER_MENU,
      closeOnContentClick: true,
      content: m(Menu, [
        m(MenuItem, {
          iconLeft: Icons.COPY,
          label: 'Copy'
        }),
        m(MenuItem, {
          iconLeft: Icons.TRASH_2,
          intent: 'negative',
          label: 'Delete'
        })
      ]),
      position: 'bottom-end',
      trigger: m(Icon, {
        name: Icons.MORE_HORIZONTAL,
        onclick: () => console.log(item)
      })
    });

    const contentLeft = m(Icon, {
      name: type === 'Folder' ? Icons.FOLDER : Icons.FILE_TEXT
    });

    return m(TreeNode, {
      contentLeft,
      contentRight: type === 'File' && contentRight,
      children: children.map(child => this.renderNode(child)),
      hasCaret: hasChildren,
      label: `${type} ${id}`,
      key: id,
      isExpanded: this.expandedMap.has(id),
      isSelected: this.selectedId === id,
      onExpand: this.handleNodeExpand,
      onCollapse: this.handleNodeCollapse,
      onClick: this.handleClick
    });
  }

  private handleNodeExpand = (node: ITreeNodeAttrs) => {
    this.expandedMap.set(node.key, true);
  }

  private handleNodeCollapse = (node: ITreeNodeAttrs) => {
    this.expandedMap.delete(node.key);
  }

  private handleClick = (node: ITreeNodeAttrs) => {
    const id = node.key;
    this.selectedId = this.selectedId === id ? null : id;
  }
}
