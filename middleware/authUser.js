// /* eslint-disable  */
// import jwt_decode from 'jwt-decode'
// export default async function ({ app, redirect }) {
// 	// the following look directly for the cookie created by nuxtjs/auth
// 	// instead of using $auth.loggedIn

// 	const user = await app.$cookies.get('auth._token.local')

// 	if (user) {
// 		// let the user see the page
// 		const token = user.split(' ')[1]
// 		const decoded = jwt_decode(token)
// 		app.$auth.setUser(decoded._doc)
// 		app.$cookies.set('auth._token.custom', user, {
// 			maxAge: 60 * 60 * 24 * 7,
// 		})
// 	} else {
// 		const user = await app.$cookies.get('auth._token.custom')
// 		console.log(user)
// 		const token = user.split(' ')[1]
// 		const decoded = jwt_decode(token)
// 		delete decoded._doc.password
// 		app.$auth.setUser(decoded._doc)
// 		console.log(app.$auth.user)

// 		if (!user) {
// 			console.log('user yok')
// 		}
// 		// redirect to homepage
// 		// redirect('/')
// 	}
// }
