module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'jest'],
  ignorePatterns: ['**/dist/**'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'import/prefer-default-export': 'off',
    'func-names': 'off',
    'lines-between-class-members': 'off',
    'no-return-await': 'off',
    'consistent-return': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'error|req|res|val' }],
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'class-methods-use-this': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: 'error|req|res|val' }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  }
};
