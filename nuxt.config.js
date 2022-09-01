import colors from 'vuetify/es5/util/colors'
import { sortRoutes } from '@nuxt/utils'

export default {
	ssr: true,
	head: {
		titleTemplate: '%s - Öğrenciden',
		title: 'Öğrenciden',
		htmlAttrs: {
			lang: 'en',
		},
		script: [
			{
				src: 'https://plausible.io/js/plausible.js',
				'data-domain': 'ogrenciden-ogrenciden.vercel.app',
				defer: true,
			},
		],
		// meta: [
		// 	{ charset: 'utf-8' },
		// 	{
		// 		name: 'viewport',
		// 		content: 'width=device-width, initial-scale=1',
		// 	},
		// 	{ hid: 'description', name: 'description', content: '' },
		// 	{ name: 'format-detection', content: 'telephone=no' },
		// 	{ name: 'msapplication-TileColor', content: '#ffffff' },
		// 	{
		// 		name: 'msapplication-TileImage',
		// 		content: '/ms-icon-144x144.png',
		// 	},
		// 	{ name: 'theme-color', content: '#ffffff' },
		// ],
		// link: [
		// 	{ rel: 'icon', type: 'image/x-icon', href: '/icon/favicon.ico' },
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		sizes: '57x57',
		// 		type: 'image/x-icon',
		// 		href: '/icon/apple-icon-57x57.png',
		// 	},
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		sizes: '60x60',
		// 		type: 'image/x-icon',
		// 		href: '/icon/apple-icon-60x60.png',
		// 	},
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		sizes: '72x72',
		// 		type: 'image/x-icon',
		// 		href: '/icon/apple-icon-72x72.png',
		// 	},
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		sizes: '76x76',
		// 		type: 'image/x-icon',
		// 		href: '/icon/apple-icon-76x76.png',
		// 	},
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		sizes: '114x114',
		// 		type: 'image/x-icon',
		// 		href: '/icon/apple-icon-114x114.png',
		// 	},
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		sizes: '120x120',
		// 		type: 'image/x-icon',
		// 		href: '/icon/apple-icon-120x120.png',
		// 	},
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		sizes: '144x144',
		// 		type: 'image/x-icon',
		// 		href: '/icon/apple-icon-144x144.png',
		// 	},
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		sizes: '152x152',
		// 		type: 'image/x-icon',
		// 		href: '/icon/apple-icon-152x152.png',
		// 	},
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		sizes: '180x180',
		// 		type: 'image/x-icon',
		// 		href: '/icon/apple-icon-180x180.png',
		// 	},
		// 	{
		// 		rel: 'icon',
		// 		type: 'image/png',
		// 		sizes: '192x192',
		// 		href: '/icon/android-icon-192x192.png',
		// 	},
		// 	{
		// 		rel: 'icon',
		// 		type: 'image/png',
		// 		sizes: '32x32',
		// 		href: '/icon/favicon-32x32.png',
		// 	},
		// 	{
		// 		rel: 'icon',
		// 		type: 'image/png',
		// 		sizes: '96x96',
		// 		href: '/icon/favicon-96x96.png',
		// 	},
		// 	{
		// 		rel: 'icon',
		// 		type: 'image/png',
		// 		sizes: '16x16',
		// 		href: '/icon/favicon-16x16.png',
		// 	},
		// 	{ rel: 'manifest', href: '/icon/manifest.json' },
		// ],
	},

	css: [],

	plugins: [],

	components: true,
	buildModules: ['@nuxtjs/device', '@nuxtjs/vuetify', '@nuxtjs/pwa'],

	modules: [
		'@nuxtjs/router-extras',
		'@nuxtjs/axios',
		'@nuxtjs/auth-next',
		'cookie-universal-nuxt',
	],
	pwa: {
		meta: {
			title: 'Öğrenciden',
			author: 'Ahmet ÇAKIR',
			description: 'Kampüsündeki ikinci el ilanları keşfet, al & sat',
			theme_color: '#2D7BF0',
		},
		manifest: {
			name: 'Öğrenciden',
			short_name: 'Öğrenciden',
			lang: 'tr',
			description: 'Kampüsündeki ikinci el ilanları keşfet, al & sat',
			background_color: '#2D7BF0',
		},
	},
	axios: {
		baseURL: 'https://ogrenciden.herokuapp.com/',
		headers: {
			Accept: '*/*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		},
	},
	auth: {
		strategies: {
			local: {
				token: {
					property: 'tokens.access_token',
					global: true,
					maxAge: 604800,
					// required: true,
					// type: 'Bearer'
				},
				user: {
					property: false,
					// autoFetch: true
				},
				endpoints: {
					login: { url: 'auth/login', method: 'post' },
					logout: false,
					user: { url: 'auth/me', method: 'get' },
				},
			},
		},
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
	router: {
		extendRoutes(routes) {
			sortRoutes(routes)
		},
	},

	build: {},
}
