export const state = () => ({
    advertModal: false
})

export const mutations = {
    advertToggle(state) {
        state.advertModal = !state.advertModal
    }
}