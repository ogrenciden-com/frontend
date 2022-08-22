<template>
	<!-- <div class="fill-height"> -->
	<!-- <h3 class="mb-4 text--subtitle">Favori İlanlarım</h3>
		<v-row class="d-none d-sm-flex">
			<v-col
				v-for="(ad, index) in ads"
				:key="index"
				cols="3"
				class="col-md-4 col-lg-3 col-sm-6 col-12 d-flex justify-center justify-md-start"
			>
				<item-card :favorite="true" :ads="ad" />
			</v-col>
		</v-row>
		<v-row
			v-for="(ad, index) in ads"
			:key="index"
			class="d-block d-sm-none px-3 pb-3"
		>
			<item-list :favorite="true" :ads="ad" />
		</v-row> -->

	<!-- </div> -->
	<div class="d-flex flex-column justify-center align-center">
		<v-img
			:src="require('@/static/assets/engineer.png')"
			max-height="250"
			max-width="250"
		></v-img>
		<div>
			<span class="d-block text-h4 text-center black--text mt-2">
				Bu sayfa yapım aşamasındadır.
			</span>
			<v-btn
				nuxt
				to="/"
				class="primary mt-10 d-flex justify-center text-transform-none font-weight-normal text-body-1"
				elevation="0"
			>
				Ana sayfaya dön
			</v-btn>
		</div>
	</div>
</template>
<script>
// import ItemCard from '@/components/ItemCard.vue'
// import ItemList from '@/components/ItemList.vue'
export default {
	name: 'Favorite',
	// components: {
	// 	ItemCard,
	// 	ItemList,
	// },
	head() {
		return {
			title: 'Favorilerim',
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: 'description',
					name: 'description',
					content:
						'Kampüsündeki ikinci el ilanları keşfet, al ve sat',
				},
			],
		}
	},
	mounted() {
		this.$vuetify.goTo(0)
	},
}
</script>
