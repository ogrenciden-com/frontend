<template>
	<v-row>
		<v-col order="last" order-md="first" cols="8" class="col-12 col-md-8">
			<v-row class="d-none d-sm-flex">
				<v-col
					v-for="j in 21"
					:key="j"
					class="pb-0 d-none d-sm-flex justify-center"
				>
					<item-card />
				</v-col>
			</v-row>
			<v-row v-for="j in 21" :key="j" class="d-block d-sm-none px-3 pb-3">
				<item-list />
			</v-row>
		</v-col>
		<v-col order="first" order-md="last" cols="4" class="col-12 col-md-4">
			<div class="sticky">
				<filter-card />
			</div>
		</v-col>
	</v-row>
</template>
<router>
  {
    path: '/:university?/:campus?/:category?'
  }
</router>
<script>
import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'
import FilterCard from '@/components/FilterCard.vue'
export default {
	name: 'IndexPage',
	components: {
		ItemCard,
		ItemList,
		FilterCard,
	},
	// mounted() {
	// 	this.$vuetify.goTo(0)
	// },
}
</script>
