import m from 'mithril';
import { IDocumentationData } from '..';

export interface INavAttrs {
  data: IDocumentationData;
  closeDrawer: Function;
  logo: m.Vnode;
  isMobile: boolean;
  onLinkClick: (e: Event) => void;
}

export function Nav(attrs: INavAttrs) {
  const { data, isMobile, closeDrawer, logo, onLinkClick } = attrs;

  return m('.Docs-nav', { class: isMobile ? 'is-mobile' : '' }, m('.Docs-nav-content', [
    m('.Docs-nav-header', [
      logo,
      m('', [
        m('.Docs-nav-title', 'Construct-ui'),
        m('.Docs-nav-title-meta', [
          m('a', {
            href: 'https://github.com/vrimar/construct-ui',
            target: '_blank'
          }, 'Github'),
          m('.Docs-nav-version', `(v${VERSION})`)
        ])
      ])
    ]),

    data.docs.nav.map(heading => m('.Docs-nav-section', [
      m('h4', heading.title),

      heading.children.map(child => [
        m('a', {
          class: `/${child.route}` === m.route.get() ? 'is-active' : '',
          onclick: (e: Event) => {
            onLinkClick(e);
            closeDrawer();
            m.route.set(`#/${child.route}`);
          },
          href: `#/${child.route}`
        }, child.title)
      ])
    ]))
  ]));
}
