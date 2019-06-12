import { Data } from '..';

export function normalizeDocs(data: Data) {
  Object.keys(data.typescript).map(key => {
    const prop = data.typescript[key];

    if (prop.kind === 'interface' || prop.kind === 'class') {
      prop.properties.sort((a, b) => {
        const textA = a.name;
        const textB = b.name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      prop.methods.sort((a, b) => {
        const textA = a.name;
        const textB = b.name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      prop.properties.map(attr => {
        const type = attr.type;

        if (type === 'undefined | false | true') {
          attr.type = 'boolean';
        }

        if (type === 'undefined | string') {
          attr.type = 'string';
        }

        if (type === 'undefined | number') {
          attr.type = 'number';
        }
      });
    }

    if (prop.kind === 'enum') {
      prop.members = prop.members
        .filter(member => !member.name.includes('NONE') && !member.name.includes('DEFAULT'));
    }
  });

  return data;
}
