import m from 'mithril';
import classnames from 'classnames';
import { Classes, safeCall, getClosest, IAttrs } from '../../_shared';
import { Icon, Icons } from '../icon';

export interface ITreeNodeAttrs extends IAttrs {
  key: number | string;

  /** Right-justified content */

  contentRight?: m.Children;
  /** Left-justified content */
  contentLeft?: m.Children;

  /** Array of TreeNodes */
  children?: Array<m.Vnode<ITreeNodeAttrs>>;

  /** Toggles caret visiblity */
  hasCaret?: boolean;

  /** Wether children are expanded */
  isExpanded?: boolean;

  /** Wether node is selected */
  isSelected?: boolean;

  /** Inner label or children */
  label?: m.Children;

  /** Callback invoked on tree node click */
  onClick?: (node: ITreeNodeAttrs, e: Event) => void;

  /** Callback invoked when caret is collapsed */
  onCollapse?: (node: ITreeNodeAttrs, e: Event) => void;

  /** Callback invoked when caret is expanded */
  onExpand?: (node: ITreeNodeAttrs, e: Event) => void;

  [htmlAttrs: string]: any;
}

export class TreeNode implements m.Component<ITreeNodeAttrs> {
  public view({ attrs }: m.Vnode<ITreeNodeAttrs>) {
    const {
      contentLeft,
      contentRight,
      class: className,
      children,
      hasCaret,
      isExpanded,
      isSelected,
      label,
      onClick,
      onCollapse,
      onExpand,
      ...htmlAttrs
    } = attrs;

    const caretClasses = classnames(
      Classes.TREE_NODE_CARET,
      !hasCaret && Classes.TREE_NODE_CARET_NONE,
      hasCaret && (isExpanded ? Classes.TREE_NODE_CARET_OPEN : Classes.TREE_NODE_CARET_CLOSED)
    );

    const caret = m(Icon, {
      class: caretClasses,
      name: Icons.CHEVRON_RIGHT,
      onclick: (e: Event) => this.handleCaretClick(e, attrs)
    });

    const innerContent = [
      caret,
      contentLeft && m('', { class: Classes.TREE_NODE_CONTENT_LEFT }, contentLeft),
      label && m('', { class: Classes.TREE_NODE_LABEL }, label),
      contentRight && m('', { class: Classes.TREE_NODE_CONTENT_RIGHT }, contentRight)
    ];

    const content = m('', {
      class: Classes.TREE_NODE_CONTENT,
      onclick: (e: Event) => this.handleClick(e, attrs)
    }, innerContent);

    const treeNodeClasses = classnames(
      Classes.TREE_NODE,
      isSelected && Classes.TREE_NODE_SELECTED,
      isExpanded && Classes.TREE_NODE_EXPANDED,
      className
    );

    return m('li', { class: treeNodeClasses, ...htmlAttrs }, [
      content,
      isExpanded && m('ul', { class: Classes.TREE_NODE_LIST }, children)
    ]);
  }

  private handleCaretClick(e: Event, attrs: ITreeNodeAttrs) {
    const { onCollapse, onExpand, isExpanded } = attrs;

    if (onCollapse || onExpand) {
      e.stopPropagation();
      safeCall(isExpanded ? onCollapse : onExpand, attrs, e);
    } else (e as any).redraw = false;
  }

  private handleClick(e: Event, attrs: ITreeNodeAttrs) {
    const { onClick } = attrs;
    const el = e.target as HTMLElement;
    const isClickOnRightContent = getClosest(el, `.${Classes.TREE_NODE_CONTENT_RIGHT}`);

    if (onClick && !isClickOnRightContent) {
      safeCall(onClick, attrs, e);
    } else (e as any).redraw = false;
  }
}
