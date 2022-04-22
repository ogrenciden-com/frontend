<template>
	<div>
		<h3 class="mb-4 text--subtitle">Favori İlanlarım</h3>
		<v-row>
			<v-col
				v-for="j in 4"
				:key="j"
				cols="3"
				class="col-md-4 col-lg-3 col-sm-6 col-12 d-flex justify-center justify-md-start"
			>
				<item-card :favorite="true" />
			</v-col>
		</v-row>
	</div>
</template>
<script>
import ItemCard from '@/components/ItemCard.vue'
export default {
	name: 'Favorite',
	components: {
		ItemCard,
	},
}
</script>
