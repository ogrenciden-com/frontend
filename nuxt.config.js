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
				'data-domain': 'ogrenciden.vercel.app',
				defer: true,
			},
		],
	},

	css: [],

	plugins: [],

	components: true,
	buildModules: ['@nuxtjs/device', '@nuxtjs/vuetify', '@nuxtjs/pwa'],

	modules: [
		'@nuxtjs/router-extras',
		'@nuxtjs/axios',
		'@nuxtjs/auth-next',
		[
			'@nuxtjs/firebase',
			{
				config: {
					apiKey: 'AIzaSyByJ2DTipMFTshKNQIWLzT06Np386FuNeo',
					authDomain: 'ogrenciden-1903.firebaseapp.com',
					projectId: 'ogrenciden-1903',
					storageBucket: 'ogrenciden-1903.appspot.com',
					messagingSenderId: '976272317973',
					appId: '1:976272317973:web:9061a5d9a246e9c767f81c',
					measurementId: 'G-YGMZZ050XH',
				},
				services: {
					auth: true,
					firestore: true,
					functions: true,
					storage: true,
					database: true,
					messaging: true,
					performance: true,
					analytics: true,
					remoteConfig: true,
				},
				auth: {
					ssr: true,
					persistence: 'session',
				},
			},
		],
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
	auth: {
		strategies: {
			local: {
				token: {
					property: 'idToken',
					global: true,
					maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
					// required: true,
					type: 'Bearer',
				},
				user: false,
				endpoints: {
					login: false,
					logout: false,
					user: false,
				},
			},
		},
		redirect: {
			login: '/auth/login',
			logout: '/',
			callback: '/auth/login',
			home: '/',
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
