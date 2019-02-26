import 'highlight.js/styles/github-gist.css';
import './style.scss';
import './favicon.ico';
import m from 'mithril';
import Main from './components/Main';
import { IMarkdownPluginData, ITypescriptPluginData, Kind } from 'documentalist/dist/client';
import { highlightCode } from './utils/highlightCode';

type Data = IMarkdownPluginData & ITypescriptPluginData;

// tslint:disable-next-line:no-var-requires
const docs = normalizeDocs(require('../generated/docs.json') as Data);

export interface IDocumentationData {
  docs: IMarkdownPluginData & ITypescriptPluginData;
  page: string;
  requestedPath: string;
}

export const GITHUB_ROOT = 'https://github.com/vasilrimar/construct-ui';
export const DEFAULT_ROOT = '/introduction/getting-started';

m.route.prefix('#');

const resolveRoute = (wrapper: m.Component) => ({
  onmatch(attrs, requestedPath) {
    attrs.docs = docs;
    attrs.requestedPath = requestedPath;

    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      highlightCode();
    });
  },
  render({ attrs }) {
    return m(wrapper, { ...attrs });
  }
}) as m.RouteResolver<IDocumentationData>;

const initRoutes = (layout: any) => {
  m.route(document.getElementById('Docs'), DEFAULT_ROOT, {
    '/introduction/:page': resolveRoute(layout),
    '/components/:page...': resolveRoute(layout),
    '/utils/:page...': resolveRoute(layout)
  });
};

initRoutes(Main);

if (module.hot) {
  module.hot.accept('./components/Main', () => {
    const main = require('./components/Main').default;
    initRoutes(main);
  });
}

requestAnimationFrame(() => highlightCode());

function normalizeDocs(data: Data) {
  Object.keys(data.typescript).map(key => {
    const prop = data.typescript[key];

    if (prop.kind === Kind.Interface || prop.kind === Kind.Class) {
      prop.properties.sort((a, b) => {
        const textA = a.name;
        const textB = b.name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      prop.methods.sort((a, b) => {
        const textA = a.name;
        const textB = b.name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }

    if (prop.kind === Kind.Enum) {
      prop.members = prop.members
        .filter(member => !member.name.includes('NONE') && !member.name.includes('DEFAULT'));
    }
  });

  return data;
}
