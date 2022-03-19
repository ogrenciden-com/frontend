export const state = () => ({
    advertModal: false,
    profileModal: false
})

export const mutations = {
    advertToggle(state) {
        state.advertModal = !state.advertModal
    },
    profileToggle(state) {
        state.profileModal = !state.profileModal
    }
}