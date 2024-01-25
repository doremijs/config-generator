/**
 * @link https://www.npmjs.com/package/lint-staged
 */
module.exports = {
  '*.{js,jsx,ts,tsx}': <% if (eslint) { %>['eslint --fix --quiet']<% } %><% if (oxlint) { %>['oxlint']<% } %>,
  '*.{css,less,styl,scss,sass}': ['stylelint --fix --quiet'],
  '*.{md|txt|yaml|yml|html|ini}': <% if (prettier) { %>['prettier --write']<% } %><% if (biome) { %>['biome check --apply']<% } %>
}
