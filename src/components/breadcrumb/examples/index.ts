import m from 'mithril';
import { Breadcrumb, BreadcrumbItem, Icon, Icons, Size } from '@/';
import { SizeSelect, Example } from '@shared/examples';

const EXAMPLE_SRC = 'components/breadcrumb/examples/index.ts';

export class BreadcrumbExample {
  private size: Size;

  public view() {
    return m(Example, { options: this.renderOptions(), src: EXAMPLE_SRC }, [
      m(Breadcrumb, {
        size: this.size,
        seperator: m(Icon, { name: Icons.CHEVRON_RIGHT })
      }, [
          m(BreadcrumbItem, { href: '#' }, m(Icon, { name: Icons.HOME })),
          m(BreadcrumbItem, { href: '#' }, 'Application'),
          m(BreadcrumbItem, 'Section 1')
        ])
    ]);
  }

  private renderOptions() {
    return [
      m('h5', 'Size'),
      m(SizeSelect, { onSelect: (size: Size) => this.size = size })
    ];
  }
}
