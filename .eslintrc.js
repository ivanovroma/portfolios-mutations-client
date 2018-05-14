module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "padded-blocks": ["error", "always"],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }]
  },
  globals: {}
}
