const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['jest'],
  rules: {
    'no-debugger': 'error',
    'no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    'no-restricted-syntax': ['error', 'ObjectPattern > RestElement']
  },
  overrides: [
    // tests, no restrictions (runs in Node / jest with jsdom)
    {
      files: ['**/__tests__/**', 'test-dts/**'],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off',
        'jest/no-disabled-tests': 'error',
        'jest/no-focused-tests': 'error'
      }
    },
    // Node scripts
    {
      files: [
        'scripts/**',
        './*.js',
        'packages/**/index.js',
        'packages/size-check/**'
      ],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off'
      }
    }
  ]
}
