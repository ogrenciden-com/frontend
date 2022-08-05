<template>
	<v-text-field
		v-model="search"
		type="text"
		solo
		hide-details
		flat
		height="48px"
		placeholder="Arama yap"
		background-color="secondary"
		class="rounded-lg"
		@keydown.enter="submit"
	>
		<template slot="append">
			<v-btn icon @click="submit()">
				<search-icon />
			</v-btn>
		</template>
	</v-text-field>
</template>
<script>
import SearchIcon from '@/components/Icons/SearchIcon.vue'
export default {
	components: {
		SearchIcon,
	},
	data() {
		return {
			// TODO when clicked brand logo clear input
			search: undefined,
		}
	},
	created() {
		if (!this.$route.query.text) return (this.search = undefined)
		this.search = this.$route.query.text
	},
	methods: {
		submit() {
			this.$router.push({
				name: 'index',
				query: { text: this.search },
			})
		},
	},
}
</script>
