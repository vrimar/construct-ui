import m from 'mithril';
import { describe, afterEach, expect, it } from 'vitest';
import { Select, Tag, ISelectAttrs, Classes, IOption } from '@/';
import { hasClass, hasChildClass, TIMEOUT, sleep } from '@test-utils';

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

    expect(hasClass(el(), Classes.SELECT)).toBeTruthy();
    expect(hasClass(el(), Classes.BASIC)).toBeTruthy();
    expect(hasClass(el(), Classes.POSITIVE)).toBeTruthy();
    expect(hasClass(el(), Classes.PRIMARY)).toBeTruthy();
    expect(hasClass(el(), Classes.XS)).toBeTruthy();
    expect(hasClass(el(), Classes.FLUID)).toBeTruthy();
    expect(el().hasAttribute('style')).toBeTruthy();
  });

  it('Renders right chevron icon', () => {
    mount();
    expect((el().lastChild as HTMLElement).classList.contains(`${Classes.ICON}`)).toBeTruthy();
  });

  it('Renders options: string array', () => {
    mount({ options });

    const children = select().children;
    expect(children.length).toBe(2);
    expect(children[0].textContent).toBe(options[0]);
    expect(children[1].textContent).toBe(options[1]);
  });

  it('Renders options: object array', () => {
    mount({ options: objOptions });

    const children = select().children;
    expect(children.length).toBe(2);
    expect(children[0].textContent).toBe(objOptions[0].label);
    expect(children[1].textContent).toBe(objOptions[1].label);
  });

  it('Renders left content', () => {
    mount({ contentLeft: m(Tag) });

    expect(hasChildClass(el(), Classes.TAG)).toBeTruthy();
    expect(el().firstChild).toBe(tag());
  });

  it('Renders right content', () => {
    mount({ contentRight: m(Tag) });

    expect(hasChildClass(el(), Classes.TAG));
    expect(el().lastChild).toBe(tag());
  });

  it('Correctly sets defaultValue', () => {
    mount({
      options,
      defaultValue: secondOption
    });

    expect(selectedValue()).toBe(secondOption);
  });

  it('Correctly sets value', () => {
    mount({
      options,
      value: secondOption
    });

    expect(selectedValue()).toBe(secondOption);
  });

  it('Handles onChange', async () => {
    let value = secondOption;

    mount({
      options,
      value,
      onchange: (e) => value = (e.currentTarget as HTMLSelectElement).value
    });

    select().value = firstOption;
    select().dispatchEvent(new Event('change'));

    await sleep(TIMEOUT);

    expect(value).toBe(firstOption);
  });

  function mount(attrs?: ISelectAttrs) {
    const component = {
      view: () => m(Select, { ...attrs })
    };
    m.mount(document.body, component);
  }
});
