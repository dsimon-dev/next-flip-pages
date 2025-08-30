module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  printWidth: 98,
  semi: true,
  trailingComma: "es5",
  importOrder: ["^\\.\\./", "^\\./"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
