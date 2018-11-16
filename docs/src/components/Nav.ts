import m from 'mithril';
import { IDocumentationData } from '..';

export interface INavAttrs {
  data: IDocumentationData;
  closeDrawer: Function;
  logo: m.Vnode;
}

export class Nav implements m.Component<INavAttrs> {
  public view({ attrs }: m.Vnode<INavAttrs>) {
    const { data, closeDrawer, logo } = attrs;

    return m('.Docs-nav', m('.Docs-nav-content', [
      m('.Docs-nav-header', [
        logo,
        m('', [
          m('.Docs-nav-title', 'Construct-ui'),
          m('a.Docs-nav-title-meta', {
            href: 'https://github.com/vrimar/construct-ui',
            target: '_blank'
          }, 'Github')
        ])
      ]),

      data.docs.nav.map(heading => m('.Docs-nav-section', [
        m('h4', heading.title),

        heading.children.map(child => [
          m('a', {
            class: `/${child.route}` === m.route.get() ? 'is-active' : '',
            oncreate: m.route.link,
            onclick: () => {
              window.requestAnimationFrame(() => closeDrawer());
            },
            href: `/${child.route}`
          }, child.title)
        ])
      ]))
    ]));
  }
}
