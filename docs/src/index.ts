import './style.scss';
import m from 'mithril';
import { Main } from './components/Main';
import { IMarkdownPluginData, ITypescriptPluginData } from '@documentalist/client';
import { normalizeDocs } from './utils/normalizeDocs';
import json from '../generated/docs.json';

export type Data = IMarkdownPluginData & ITypescriptPluginData;

const docs = normalizeDocs(json as any);

export interface IDocumentationData {
  docs: IMarkdownPluginData & ITypescriptPluginData;
  page: string;
  requestedPath: string;
}

export const GITHUB_ROOT = 'https://github.com/vasilrimar/construct-ui';
export const DEFAULT_ROOT = '/introduction/getting-started';

m.route.prefix = '#';

const resolveRoute = (wrapper: m.Component<IDocumentationData>) => ({
  onmatch(attrs, requestedPath) {
    attrs.docs = docs;
    attrs.requestedPath = requestedPath;

    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  },
  render({ attrs }) {
    return m(wrapper, { ...attrs });
  }
}) as m.RouteResolver<IDocumentationData>;

const initRoutes = (layout: any) => {
  m.route(document.getElementById('Docs')!, DEFAULT_ROOT, {
    '/introduction/:page': resolveRoute(layout),
    '/components/:page...': resolveRoute(layout),
    '/utils/:page...': resolveRoute(layout)
  });
};

initRoutes(Main);
