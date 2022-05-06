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

	modules: [
		'@nuxtjs/router-extras',
		'@nuxtjs/axios',
		'@nuxtjs/firebase',

	],
	firebase: {
		config: {
			apiKey: "AIzaSyByJ2DTipMFTshKNQIWLzT06Np386FuNeo",
			authDomain: "ogrenciden-1903.firebaseapp.com",
			projectId: "ogrenciden-1903",
			storageBucket: "ogrenciden-1903.appspot.com",
			messagingSenderId: "976272317973",
			appId: "1:976272317973:web:9061a5d9a246e9c767f81c",
			measurementId: "G-YGMZZ050XH"
		},
		services: {
			auth: true,
			firestore: true,
			storage: true
		}
	},
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
