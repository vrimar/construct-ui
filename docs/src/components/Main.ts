import m from 'mithril';
import { Content, Nav } from './';
import { IDocumentationData } from '..';
import { ResponsiveManager, Drawer, Icons, Button, getClosest } from '@/';

const logoSrc = require('../logo.svg');

export default class Main implements m.Component<IDocumentationData> {
  private isDrawerOpen: boolean = false;
  private scrollPosition: number;

  public view({ attrs }: m.Vnode<IDocumentationData>) {
    const isMobile = ResponsiveManager.is('xs') || ResponsiveManager.is('sm');

    const logo = m('img.Docs-logo', { src: logoSrc });

    const nav = Nav({
      data: attrs,
      closeDrawer: this.closeDrawer,
      logo,
      isMobile,
      onLinkClick: this.handleLinkClick
    });

    return m('.Docs', { class: isMobile ? 'is-mobile' : '' }, [
      isMobile && m('.Docs-mobile-header', [
        logo,
        m(Button, {
          basic: true,
          iconLeft: Icons.MENU,
          onclick: () => this.isDrawerOpen = true,
          size: 'xs'
        })
      ]),

      isMobile
        ? m(Drawer, {
          class: 'Docs-nav-drawer',
          isOpen: this.isDrawerOpen,
          position: 'left',
          content: nav,
          onClose: this.closeDrawer,
          onOpened: this.handleDrawerOnOpened
        })
        : nav,

      m('.Docs-container', Content({ ...attrs }))
    ]);
  }

  private closeDrawer = () => this.isDrawerOpen = false;

  private handleLinkClick = (e: Event) => {
    const contentEl = getClosest(e.target, '.Docs-nav');
    this.scrollPosition = contentEl!.scrollTop;
  };

  private handleDrawerOnOpened = (el: HTMLElement) => {
    const contentEl = el.querySelector('.Docs-nav');
    contentEl!.scrollTop = this.scrollPosition;
  };
}
