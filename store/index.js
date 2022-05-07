export const state = () => ({
	advertModal: false,
	profileModal: false,
	hasUser: false,
	user: {},
})
export const mutations = {
	advertToggle(state) {
		globalThis.$nuxt.$store.state.UniversityAndCampus.selectedCampuses = []
		state.advertModal = !state.advertModal
	},
	profileToggle(state) {
		globalThis.$nuxt.$store.state.UniversityAndCampus.selectedCampuses = []
		state.profileModal = !state.profileModal
	},
	userToggle(state) {
		state.hasUser = !state.hasUser
	},
	setUser(state, user) {
		state.user = user
		state.hasUser = true
	}
}
