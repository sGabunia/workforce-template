import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    react: true,
    stylistic: true,
    ignores: ['**/*.md', '.react-router/types/**'],
    formatters: {
      css: true
    },
    rules: {}
  },
  [
    {
      rules: {
        'siberiacancode-react/function-component-definition': [
          'off',
          {
            namedComponents: ['arrow-function'],
            unnamedComponents: 'arrow-function'
          }
        ],
        'react-hooks/exhaustive-deps': 'warn'
      }
    }
  ]
);
