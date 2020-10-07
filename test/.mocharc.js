module.exports = {
  diff: true,
  'inline-diffs': false,
  colors: true,
  extension: ['ts'],
  require: [
    'ts-node/register',
    'tsconfig-paths/register',
    './test/setup.js'
  ],
  slow: 75,
  spec: 'src/**/*.spec.ts',
  'watch-files': 'src/**/*.spec.ts'
};
