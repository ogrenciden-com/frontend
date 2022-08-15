module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: [
		'@nuxtjs',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended',
	],
	plugins: [],
	// add your custom rules here
	rules: {
		'vue/no-v-html': 0,
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
}
