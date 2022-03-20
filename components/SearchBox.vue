<template>
	<v-text-field
		type="text"
		solo
		hide-details
		flat
		height="48px"
		placeholder="Arama yap"
		background-color="secondary"
		class="rounded-lg"
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
}
</script>
