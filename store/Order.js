export const state = () => ({
	list: [
		{
			name: 'En yeni',
			slug: 'en-yeni',
		},
		{
			name: 'En eski',
			slug: 'en-eski',
		},
		{
			name: 'Fiyata göre artan',
			slug: 'fiyata-gore-artan',
		},
		{
			name: 'Fiyata göre azalan',
			slug: 'fiyata-gore-azalan',
		},
	],
	routeOrderName: undefined
})

export const mutations = {
	findOrderBySlug(state, slug) {
		state.list.forEach((order) => {
			if (order.slug === slug) {
				state.routeOrderName = order.name
			}
		})
		return state.routeOrderName
	},
}
export const getters = {
	getOrdersName(state) {
		const orders = []
		for (const [key, value] of Object.entries(state.list)) {
			orders.push(value.name)
		}
		return orders
	},
}
