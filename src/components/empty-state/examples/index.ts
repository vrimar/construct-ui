import m from 'mithril';
import { EmptyState, Icons, Icon, Input, Switch } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/empty-state/examples/index.ts';

export class EmptyStateExample {
  private hasIcon = true;
  private hasHeader = true;
  private hasContent = true;
  private fill = true;

  public view() {
    return m(Example, { options: this.renderOptions(), center: false, src: EXAMPLE_SRC }, [
      m(EmptyState, {
        icon: this.hasIcon ? Icons.ARCHIVE : undefined,
        header: this.hasHeader && 'No search results found.',
        content: this.hasContent && m(Input, {
          contentLeft: m(Icon, { name: Icons.SEARCH }),
          placeholder: 'Search results...'
        }),
        fill: this.fill
      })
    ]);
  }

  private renderOptions() {
    return [
      m(Switch, {
        checked: this.hasIcon,
        label: 'Icon',
        onchange: () => this.hasIcon = !this.hasIcon
      }),

      m(Switch, {
        checked: this.hasHeader,
        label: 'Header',
        onchange: () => this.hasHeader = !this.hasHeader
      }),

      m(Switch, {
        checked: this.hasContent,
        label: 'Content',
        onchange: () => this.hasContent = !this.hasContent
      }),

      m(Switch, {
        checked: this.fill,
        label: 'Fill',
        onchange: () => this.fill = !this.fill
      })
    ];
  }
}
