import m from 'mithril';
import { Select, IconName, Icon, Button, Spinner, Tag, getObjectKeys } from '../../';

export const ContentType = {
  NONE: 'none',
  ICON: 'Icon',
  BUTTON: 'Button',
  SPINNER: 'Spinner',
  TAG: 'Tag'
} as const;

export type ContentType = typeof ContentType[keyof typeof ContentType];

export interface IContentSelectAttrs {
  onSelect: (contentType?: ContentType) => void;
}

export class ContentSelect implements m.Component<IContentSelectAttrs> {
  public view({ attrs: { onSelect } }: m.Vnode<IContentSelectAttrs>) {
    return m(Select, {
      fluid: true,
      options: getObjectKeys(ContentType).map(key => ContentType[key]),
      onchange: (e: Event) => {
        const target = (e.target as HTMLSelectElement);
        const content = target.options[target.selectedIndex].value as ContentType;
        onSelect(content === 'none' ? undefined : content);
      },
      size: 'xs'
    });
  }
}

export function renderContent(contentType: ContentType, icon: IconName) {
  if (contentType === 'Icon') {
    return m(Icon, { name: icon });
  }

  if (contentType === 'Button') {
    return m(Button, { label: 'Button' });
  }

  if (contentType === 'Spinner') {
    return m(Spinner, { active: true });
  }

  if (contentType === 'Tag') {
    return m(Tag, { label: 'Tag' });
  }

  if (contentType === 'none') {
    return undefined;
  }
}
