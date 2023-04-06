module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals', 'prettier'],
  plugins: ['import', 'sort-keys-fix', 'typescript-sort-keys', 'unused-imports'],
  rules: {
    '@next/next/no-img-element': 'off', // Next.jsで<img>要素を使用しても警告を出さないようにする
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }], //型はimport typeで表示
    'import/no-duplicates': 'error', // 同じモジュールから複数の変数をインポートしている場合、エラーを出す
    'import/order': [ //importの読み込み順のルール
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'builtin',
            pattern: '{react,react-dom/**,react-router-dom}',
            position: 'before',
          },
          {
            group: 'parent',
            pattern: '@src/**',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'no-param-reassign': [2, { props: false }], //パラメーターのプロパティ変更を許可
    'react/jsx-sort-props': 'error', // JSXの属性をアルファベット順にソート
    'sort-keys-fix/sort-keys-fix': 'error', // オブジェクトのキーをアルファベット順に自動でソート
    'typescript-sort-keys/interface': 'error', // TypeScriptのインターフェースのキーをアルファベット順に自動でソート
    'unused-imports/no-unused-imports': 'error', // 使っていないimportは削除
    // アロー関数のみ許容（お好みで）
    // 'react/function-component-definition': [
    //   2,
    //   {
    //     namedComponents: 'arrow-function',
    //     unnamedComponents: 'arrow-function',
    //   },
    // ],
  },
};
