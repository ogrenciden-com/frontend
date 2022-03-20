<template>
	<v-row>
		<v-col order="last" order-md="first" cols="8" class="col-12 col-md-8">
			<v-row>
				<v-col
					v-for="j in 100"
					:key="j"
					class="d-flex justify-center justify-sm-start"
				>
					<item-card />
				</v-col>
			</v-row>
		</v-col>
		<v-col order="first" order-md="last" cols="4" class="col-12 col-md-4">
			<div class="sticky">
				<filter-card />
			</div>
		</v-col>
	</v-row>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue'
import FilterCard from '@/components/FilterCard.vue'
export default {
	name: 'IndexPage',
	components: {
		ItemCard,
		FilterCard,
	},
}
</script>
<style scoped>
.sticky {
	position: sticky;
	top: 10px;
}
</style>
