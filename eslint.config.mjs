// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = [
	...nextCoreWebVitals,
	...nextTypescript,
	{
		ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts']
	},
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports
		},
		rules: {
			'no-restricted-imports': [
				'warn',
				{
					patterns: ['../*']
				}
			],
			'react-hooks/incompatible-library': 'off',
			'react-hooks/refs': 'off',
			'react-hooks/set-state-in-effect': 'off',
			'react-hooks/static-components': 'off',
			'no-duplicate-imports': 'error',
			'simple-import-sort/exports': 'error',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^react$', '^react', '^next', '^next/'],
						['^@?\\w'],
						['^@/'],
						['^\\.(?!.*\\.(?:css|scss|sass|less)$)'],
						['^\\u0000.*\\.(?:css|scss|sass|less)$', '^.+\\.(?:css|scss|sass|less)$']
					]
				}
			],
			'unused-imports/no-unused-imports': 'error'
		}
	},
	...storybook.configs['flat/recommended']
];

export default eslintConfig;
