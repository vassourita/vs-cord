module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'import-helpers'
  ],
  rules: {
    'space-before-function-paren': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [['/^@nestjs/'], 'module', ['parent', 'sibling', 'index']],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }
    ]
  }
}
