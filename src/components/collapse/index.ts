import m from 'mithril';
import classnames from 'classnames';
import { Transition, TransitionState } from 'mithril-transition-group';
import { IAttrs, Classes } from '../../_shared';

export interface ICollapseAttrs extends IAttrs {
  /** Toggles visibility */
  isOpen?: boolean;

  /**
   * Duration of the slide-in/slide-out animation
   * @default 300
   */
  duration?: number;
}

export class Collapse implements m.Component<ICollapseAttrs> {
  private height: number = 0;
  private duration: number;
  private contentEl: HTMLElement;
  private containerStyles = {
    height: 0,
    overflow: 'hidden',
    transition: ''
  };

  public oninit({ attrs }: m.Vnode<ICollapseAttrs>) {
    this.duration = attrs.duration || 300;
    this.containerStyles.transition = `height ${this.duration}ms ease-out`;
  }

  public onbeforeupdate() {
    if (this.contentEl) {
      this.height = this.getContentHeight(this.contentEl);
    }
  }

  public view({ attrs, children }: m.Vnode<ICollapseAttrs>) {
    const classes = classnames(
      Classes.COLLAPSE,
      attrs.class
    );

    return m(Transition, {
      isVisible: attrs.isOpen,
      onEnter: this.handleEnter,
      onExit: this.handleExit,
      content: (state: TransitionState) => {
        const containerTransitionStyles = {
          entering: {
            height: this.height + 'px'
          },
          entered: {
            height: 'auto',
            transition: 'none'
          },
          exiting: {
            height: '0px'
          }
        };

        const bodyTransitionStyles = {
          entering: {
            transform: 'translateY(0px)',
            transition: `transform ${this.duration}ms ease-out`
          },
          exiting: {
            transform: `translateY(${-this.height}px)`,
            transition: `transform ${this.duration}ms ease-out`
          }
        };

        const body = m('', {
          class: Classes.COLLAPSE_BODY,
          style: { ...bodyTransitionStyles[state] }
        }, children);

        const container = m('', {
          class: classes,
          style: {
            ...this.containerStyles,
            ...containerTransitionStyles[state],
            ...attrs.style as CSSStyleDeclaration
          }
        }, body);

        return container;
      },
      timeout: this.duration
    });
  }

  private handleEnter = (node: HTMLElement) => {
    const body = node.querySelector(`.${Classes.COLLAPSE_BODY}`) as HTMLElement;
    this.contentEl = body.children[0] as HTMLElement;
    this.height = this.getContentHeight(this.contentEl);
    body.style.transform = `translateY(${-this.height}px)`;
  }

  private handleExit = (node: HTMLElement) => {
    node.style.height = `${this.height}px`;
  }

  private getContentHeight(element: HTMLElement) {
    if (!element) return 0;
    const styles = window.getComputedStyle(element);
    const margin = parseFloat(styles.marginTop!) + parseFloat(styles.marginBottom!);
    return Math.ceil(element.offsetHeight + margin);
  }
}
