import colors from 'vuetify/es5/util/colors'

export default {
	head: {
		titleTemplate: '%s - ogrenciden',
		title: 'ogrenciden',
		htmlAttrs: {
			lang: 'en',
		},

		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: 'icon/favicon.ico' }],
	},

	css: [],

	plugins: [],

	components: true,

	buildModules: ['@nuxtjs/device', '@nuxtjs/vuetify'],

	modules: ['@nuxtjs/router-extras', '@nuxtjs/axios'],

	axios: {
		baseURL: '/',
	},

	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		treeShake: true,
		theme: {
			dark: false,
			themes: {
				light: {
					primary: '#2D7BF0',
					accent: colors.grey.darken3,
					secondary: '#F3F3F3',
					darkGrey: '#A6A2A2',
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},

	build: {},
}
