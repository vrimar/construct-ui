import m from 'mithril';
import { Content, Nav } from './';
import { IDocumentationData } from '..';
import { ResponsiveManager, Drawer, Icons, Button } from '@/';

// tslint:disable-next-line:no-var-requires
const logoSrc = require('../logo.svg');

export default class Main implements m.Component<IDocumentationData> {
  private isDrawerOpen: boolean = false;

  public view({ attrs }: m.Vnode<IDocumentationData>) {
    const isMobile = ResponsiveManager.is('xs') || ResponsiveManager.is('sm');

    const logo = m('img.Docs-logo', { src: logoSrc });

    const nav = m(Nav, {
      data: attrs,
      closeDrawer: this.closeDrawer,
      logo
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
          onClose: this.closeDrawer
        })
        : nav,

      m('.Docs-container', m(Content, { ...attrs, key: attrs.page }))
    ]);
  }

  private closeDrawer = () => this.isDrawerOpen = false;
}
