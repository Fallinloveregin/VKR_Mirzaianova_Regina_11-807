module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  rules: {
    'import/no-cycle': 'error',
    'import/no-anonymous-default-export': 'off',
  },
}
