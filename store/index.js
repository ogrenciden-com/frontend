export const state = () => ({
    loginModal: false,
    advertModal: false
})

export const mutations = {
    loginToggle(state) {
        state.loginModal = !state.loginModal
    },
    advertToggle(state) {
        state.advertModal = !state.advertModal
    }
}