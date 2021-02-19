import m from 'mithril';
import assert from 'assert';
import { Select, Tag, ISelectAttrs, Classes, IOption } from '@/';
import { hasClass, hasChildClass, TIMEOUT } from '@test-utils';

const options = ['1', '2'];
const firstOption = options[0];
const secondOption = options[1];
const objOptions: IOption[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' }
];

describe('select', () => {
  const el = () => document.body.firstChild as HTMLElement;
  const select = () => el().querySelector('select') as HTMLSelectElement;
  const selectedValue = () => select().options[select().selectedIndex].value;
  const tag = () => el().querySelector(`.${Classes.TAG}`) as HTMLElement;

  afterEach(() => m.mount(document.body, null));

  it('Renders correctly', () => {
    mount({
      basic: true,
      class: Classes.POSITIVE,
      style: 'margin:0',
      intent: 'primary',
      size: 'xs',
      fluid: true
    });

    assert(hasClass(el(), Classes.SELECT));
    assert(hasClass(el(), Classes.BASIC));
    assert(hasClass(el(), Classes.POSITIVE));
    assert(hasClass(el(), Classes.PRIMARY));
    assert(hasClass(el(), Classes.XS));
    assert(hasClass(el(), Classes.FLUID));
    assert(el().hasAttribute('style'));
  });

  it('Renders right chevron icon', () => {
    mount();
    assert((el().lastChild as HTMLElement).classList.contains(`${Classes.ICON}`));
  });

  it('Renders options: string array', () => {
    mount({ options });

    const children = select().children;
    assert.equal(children.length, 2);
    assert.equal(children[0].textContent, options[0]);
    assert.equal(children[1].textContent, options[1]);
  });

  it('Renders options: object array', () => {
    mount({ options: objOptions });

    const children = select().children;
    assert.equal(children.length, 2);
    assert.equal(children[0].textContent, objOptions[0].label);
    assert.equal(children[1].textContent, objOptions[1].label);
  });

  it('Renders left content', () => {
    mount({ contentLeft: m(Tag) });

    assert(hasChildClass(el(), Classes.TAG));
    assert(el().firstChild === tag());
  });

  it('Renders right content', () => {
    mount({ contentRight: m(Tag) });

    assert(hasChildClass(el(), Classes.TAG));
    assert(el().lastChild === tag());
  });

  it('Correctly sets defaultValue', () => {
    mount({
      options,
      defaultValue: secondOption
    });

    assert.equal(selectedValue(), secondOption);
  });

  it('Correctly sets value', () => {
    mount({
      options,
      value: secondOption
    });

    assert.equal(selectedValue(), secondOption);
  });

  it('Handles onChange', (done) => {
    let value = secondOption;

    mount({
      options,
      value,
      onchange: (e) => value = (e.currentTarget as HTMLSelectElement).value
    });

    select().value = firstOption;
    select().dispatchEvent(new Event('change'));

    setTimeout(() => {
      assert.equal(value, firstOption);
      done();
    }, TIMEOUT);
  });

  function mount(attrs?: ISelectAttrs) {
    const component = {
      view: () => m(Select, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
