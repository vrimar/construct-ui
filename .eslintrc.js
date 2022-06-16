module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'camelcase': 'error',
    'comma-dangle': 'warn',
    'quotes': ['error', 'single'],
    'no-console': 'error',
    'no-multi-spaces': 'warn',
    'no-unused-vars': 'off',
    'semi': 'error'
  }
};
