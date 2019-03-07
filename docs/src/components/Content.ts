import m from 'mithril';
import { IDocumentationData } from '..';
import { ITag, INavigable } from 'documentalist/dist/client';
import { InterfaceTable } from './InterfaceTable';
import { MethodsTable } from './MethodsTable';
import * as Examples from '../../../src/examples';
import { FocusManager, ResponsiveManager } from '@/';

FocusManager.showFocusOnlyOnTab();
ResponsiveManager.initialize();

export function Content(attrs: IDocumentationData) {
  const pageData = attrs.docs.pages[attrs.page];

  const contentAttrs = {
    class: [
      'Docs-content',
      `Docs-content-${pageData.reference}`
    ].join(' ')
  };

  return m('section', contentAttrs, [
    pageData.contents.map((contentBlock => {
      if (typeof (contentBlock) === 'string') {
        return m.trust(contentBlock);
      }

      const content = contentBlock as ITag & INavigable;

      switch (content.tag) {
        case 'heading':
          return m(`h${content.level}`, content.value);
        case 'methods':
          return MethodsTable({ api: content.value, data: attrs });
        case 'interface':
          return InterfaceTable({ api: content.value, data: attrs });
        case 'example':
          const example = Examples[content.value];
          return example ? m(Examples[content.value]) : 'RENDER ERROR';
      }
    }))
  ]);
}
