<template>
	<div>
		<h3 class="mb-4 text--subtitle">İlanlarım</h3>
		<v-row class="d-none d-sm-flex">
			<template v-if="$fetchState.pending">
				<v-col
					v-for="index in 9"
					:key="'card-' + index"
					cols="4"
					class="col-12 col-sm-6 col-md-4 col-lg-3 pt-0 pb-6 pr-0 ml-n1 d-none d-sm-flex justify-center justify-md-start"
				>
					<card-skeleton card />
				</v-col>
			</template>
			<v-col
				v-for="(ad, index) in ads"
				:key="index"
				cols="3"
				class="col-md-4 col-lg-3 col-sm-6 col-12 d-flex justify-center justify-md-start"
			>
				<item-card :favorite="true" :ad="ad" />
			</v-col>
		</v-row>
		<template v-if="$fetchState.pending">
			<v-row
				v-for="index in 5"
				:key="'list-' + index"
				class="d-block d-sm-none px-3 pb-3"
			>
				<card-skeleton />
			</v-row>
		</template>
		<v-row
			v-for="(ad, index) in ads"
			:key="index"
			class="d-block d-sm-none px-3 pb-3"
		>
			<item-list :favorite="true" :ad="ad" />
		</v-row>
	</div>
</template>
<script>
import CardSkeleton from '@/components/CardSkeleton.vue'
import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'

export default {
	name: 'MyAds',
	components: {
		ItemCard,
		ItemList,
		CardSkeleton,
	},
	data() {
		return {
			ads: [],
			loading: false,
		}
	},
	async fetch() {
		await this.getUserAds()
	},
	head() {
		return {
			title: 'İlanlarım',
			meta: [
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

	methods: {
		async getUserAds() {
			try {
				const { data } = await this.$axios.get(
					'products/my-ads/' + this.$route.params.id,
				)
				this.ads = data
			} catch (error) {
				console.log(error)
			}
		},
	},
}
</script>
