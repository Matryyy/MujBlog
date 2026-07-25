// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      // Nahrazeno recommended a stylistic za nejpřísnější varianty s kontrolou typů
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
    ],
    // Důležité pro pravidla využívající informace o typech z tsconfig.json
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      // Vynutí psaní návratových typů u všech funkcí a metod
      '@typescript-eslint/explicit-function-return-type': 'error',
      // Vynutí typování parametrů u exportovaných funkcí/metod (hranice modulů)
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      // Striktní zákaz používání typu "any"
      '@typescript-eslint/no-explicit-any': 'error',
      
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);
