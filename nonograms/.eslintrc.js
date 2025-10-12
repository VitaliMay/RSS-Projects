// module.exports = {
//   env: {
//     commonjs: true,
//     es2022: true,
//     node: true,
//   },
//   extends: ['eslint:recommended', 'prettier'],
//   plugins: ['prettier'],
//   parserOptions: {
//     ecmaVersion: 13,
//   },
//   rules: {
//     indent: ['error', 2],
//     quotes: ['error', 'single'],
//     semi: ['error', 'always'],
//     'prettier/prettier': 'error',
//   },
// };

/******************************************************* */

module.exports = {
  env: {
    commonjs: true,
    es2022: true,
    node: true,
    browser: true, // Добавлено, если вы планируете использовать код в браузере
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parser: '@babel/eslint-parser', // Добавлено для поддержки синтаксиса import/export
  parserOptions: {
    ecmaVersion: 13, // Можно оставить, т.к. соответствует ES2022
    sourceType: 'module', // Позволяет использовать import/export
    requireConfigFile: false, // Позволяет использовать парсер без файла конфигурации Babel
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
  },
};
