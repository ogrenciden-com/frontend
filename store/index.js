export const state = () => ({
	advertModal: false,
	profileModal: false,
	hasUser: false,
})
export const mutations = {
	advertToggle(state) {
		globalThis.$nuxt.$store.state.UniversityAndCampus.selectedCampuses = []
		state.advertModal = !state.advertModal
	},
	profileToggle(state) {
		state.profileModal = !state.profileModal
	},
	userToggle(state) {
		state.hasUser = !state.hasUser
	},
}
