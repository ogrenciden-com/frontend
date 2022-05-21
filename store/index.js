export const state = () => ({
	advertModal: false,
	hasUser: true,
})
export const mutations = {
	advertToggle(state) {
		globalThis.$nuxt.$store.state.UniversityAndCampus.selectedCampuses = []
		state.advertModal = !state.advertModal
	},
	// profileToggle() {
	// 	this.$router.replace('/')
	// },
	userToggle(state) {
		state.hasUser = !state.hasUser
	},
}
