import m from 'mithril';
import { IDocumentationData } from '..';
import { Table } from '@/';
import { ITsInterface, ITsMethod } from 'documentalist/dist/client';

export interface IMethodTableAttrs {
  data: IDocumentationData;
  api: string;
}

export class MethodsTable implements m.Component<IMethodTableAttrs> {
  private docMethods: ITsMethod[] = [];

  public oninit({ attrs }: m.Vnode<IMethodTableAttrs>) {
    const tsData = attrs.data.docs.typescript;
    const apiData = tsData[attrs.api] as ITsInterface;

    this.docMethods = apiData.methods.sort((a, b) => {
      const textA = a.name;
      const textB = b.name;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  public view() {
    return m(Table, [
      m('tr', [
        m('th[style=min-width:220px]', 'Name'),
        m('th', 'Type'),
        m('th', 'Description')
      ]),
      this.docMethods.map(this.renderRow)
    ]);
  }

  private renderRow(method: ITsMethod) {
    const signature = method.signatures[0];

    return m('tr', [
      m('td', m('code', method.name)),
      m('td', signature.type),
      m('td', m.trust(signature.documentation.contentsRaw))
    ]);
  }
}
