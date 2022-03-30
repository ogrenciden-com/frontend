export const state = () => ({
	advertModal: false,
	profileModal: false,
	hasUser: true,
})

export const mutations = {
	advertToggle(state) {
		state.advertModal = !state.advertModal
	},
	profileToggle(state) {
		state.profileModal = !state.profileModal
	},
	userToggle(state) {
		state.hasUser = !state.hasUser
	},
}
