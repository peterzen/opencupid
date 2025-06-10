/** @type {import("prettier").Config} */
export default {
  semi: false,              // ⛔ no semicolons
  singleQuote: true,        // ✅ use single quotes
  trailingComma: 'es5',     // ✅ add trailing commas where valid in ES5 (objects, arrays, etc.)
  tabWidth: 2,              // ✅ 2 spaces per indent
  useTabs: false,           // ✅ use spaces, not tabs
  bracketSpacing: true,     // ✅ { foo: bar }
  arrowParens: 'avoid',     // ✅ omit parens for single-arg arrow funcs: x => x
  printWidth: 100,          // ✅ wrap at 100 columns
  endOfLine: 'lf',          // ✅ Unix line endings
}
