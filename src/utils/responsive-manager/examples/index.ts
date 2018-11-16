import m from 'mithril';
import { ResponsiveManager } from '@/';
import { Example } from '@shared/examples';

const EXAMPLE_SRC = 'utils/responsive-manager/examples/index.ts';

export class ResponsiveManagerExample {
  public view() {
    return m(Example, { center: false, src: EXAMPLE_SRC }, [
      m('', [
        'Current screen size = ',
        ResponsiveManager.is('xs') && 'XS',
        ResponsiveManager.is('sm') && 'SM',
        ResponsiveManager.is('md') && 'MD',
        ResponsiveManager.is('lg') && 'LG',
        ResponsiveManager.is('xl') && 'XL'
      ])
    ]);
  }
}
