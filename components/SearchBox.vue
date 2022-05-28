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
			<search-icon />
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
			search: undefined,
		}
	},
	created() {
		if (this.$route.query.q) {
			this.search = this.$route.query.q
		}
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
