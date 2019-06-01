import m from 'mithril';
import { IDocumentationData } from '..';
import { Table } from '@/';
import { ITsMethod, ITsInterface } from '@documentalist/client';

export interface IMethodTableAttrs {
  data: IDocumentationData;
  api: string;
}

export function MethodsTable(attrs: IMethodTableAttrs) {
  const { data, api } = attrs;
  const methods = (data.docs.typescript[api] as ITsInterface).methods;

  return m(Table, [
    m('tr', [
      m('th[style=min-width:220px]', 'Name'),
      m('th', 'Type'),
      m('th', 'Description')
    ]),
    methods.map(renderRow)
  ]);
}

function renderRow(method: ITsMethod) {
  const signature = method.signatures[0];

  return m('tr', [
    m('td', m('code', method.name)),
    m('td', signature.type),
    m('td', m.trust(signature.documentation!.contentsRaw))
  ]);
}
