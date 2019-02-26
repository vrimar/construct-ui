import m from 'mithril';
import { IDocumentationData } from '..';
import { Table } from '@/';
import { ITsInterface, ITsProperty } from 'documentalist/dist/client';

export interface IInterfaceTableAttrs {
  data: IDocumentationData;
  api: string;
}

// TODO: Add basic type filters
// const basicTypes = [
//   'boolean',
//   'string',
//   'number',
//   'm.Children',
//   'm.Child',
//   'm.Vnode',
//   '=> void'
// ];

export class InterfaceTable implements m.Component<IInterfaceTableAttrs> {
  private docAttrs: ITsProperty[] = [];

  public oninit({ attrs }: m.Vnode<IInterfaceTableAttrs>) {
    const tsData = attrs.data.docs.typescript;
    const apiData = tsData[attrs.api] as ITsInterface;

    this.docAttrs = apiData.properties.sort((a, b) => {
      const textA = a.name;
      const textB = b.name;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  public view({ attrs }: m.Vnode<IInterfaceTableAttrs>) {
    return this.renderTable(this.docAttrs, attrs.data);
  }

  private renderTable(attrs: ITsProperty[], data: IDocumentationData) {
    return m(Table, { class: 'Docs-interface-table' }, [
      m('tr', [
        m('th[style=max-width:175px; min-width: 175px]', 'Name'),
        m('th', 'Description')
      ]),
      attrs.map(attr => this.renderRow(attr, data))
    ]);
  }

  private renderRow(attr: ITsProperty, data: IDocumentationData) {
    if (attr.documentation == null) {
      return;
    }

    return m('tr', [
      m('td', m('code', attr.name)),
      m('td', [
        this.renderTypePopover(attr, data),
        m.trust(attr.documentation.contentsRaw)
      ])
    ]);
  }

  private renderTypePopover(attr: ITsProperty, _data: IDocumentationData) {
    const { type, defaultValue } = attr;

    return m('.Docs-code-type', [
      type,
      defaultValue && ` = ${defaultValue}`
    ]);
  }
}
