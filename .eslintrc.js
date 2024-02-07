module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  rules: {
    "vue/html-indent": ["error", 2], // html tabulation
    "indent": ["error", 2], // js tabulation
  }
}
