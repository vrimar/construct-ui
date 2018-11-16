const fs = require('fs');
const path = require('path');
const ICONS = require('feather-icons/dist/icons.json');

const GENERATED_ICON_PATH = path.resolve(process.cwd(), './src/components/icon/generated');

if (!fs.existsSync(GENERATED_ICON_PATH)) {
  fs.mkdirSync(GENERATED_ICON_PATH);
}

async function writeLinesToFile(filename, ...lines) {
  const outputPath = path.join(GENERATED_ICON_PATH, filename);
  const contents = ['/* tslint:disable */', ...lines, ''].join('\n');
  fs.writeFileSync(outputPath, contents);
}

function exportIconNames() {
  return Object.keys(ICONS).map(iconName => {
    const constName = iconName.replace(/-/g, '_').toUpperCase();
    return `export const ${constName} = '${iconName}';`
  });
}

function exportIconContents() {
  const contents = Object.keys(ICONS).map(iconName => `'${iconName}' : '${ICONS[iconName]}'\n`);
  return `export default { 
    ${contents} 
  }`;
}

writeLinesToFile('IconNames.ts', ...exportIconNames());
writeLinesToFile('IconConents.ts', exportIconContents());
