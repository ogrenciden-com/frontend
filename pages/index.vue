<template>
	<v-row>
		<v-col order="last" order-md="first" cols="8" class="col-12 col-md-8">
			<v-row>
				<template v-if="loading">
					<v-col
						v-for="index in 9"
						:key="index"
						cols="4"
						class="pt-0 pb-6 pr-0 ml-n1 d-none d-sm-flex justify-center justify-md-start col-4 col-md-6 col-lg-4"
					>
						<card-skeleton />
					</v-col>
				</template>
				<v-col
					v-for="(ad, index) in ads"
					v-else
					:key="index"
					cols="4"
					class="pt-0 pb-6 pr-0 ml-n1 d-none d-sm-flex justify-center justify-md-start col-4 col-md-6 col-lg-4"
				>
					<item-card :ads="ad" />
				</v-col>
				<v-alert
					v-if="err"
					width="100%"
					dense
					outlined
					type="error"
					class="ml-3 mr-2"
				>
					Seçtiğiniz kriterlere ait ilan bulunamamıştır.
				</v-alert>
			</v-row>
			<template v-if="loading">
				<v-row
					v-for="index in 5"
					:key="index"
					class="d-block d-sm-none px-3 pb-3"
				>
					<card-skeleton :card="false" />
				</v-row>
			</template>
			<v-row
				v-for="(ad, index) in ads"
				v-else
				:key="index"
				class="d-block d-sm-none px-3 pb-3"
			>
				<item-list :ads="ad" />
			</v-row>
		</v-col>
		<v-col
			order="first"
			order-md="last"
			cols="4"
			class="col-12 col-md-4 pt-0"
		>
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
import CardSkeleton from '@/components/CardSkeleton.vue'
export default {
	name: 'IndexPage',
	components: {
		ItemCard,
		ItemList,
		FilterCard,
		CardSkeleton,
	},
	data() {
		return {
			ads: [],
			loading: false,
			err: '',
		}
	},
	async fetch() {
		await this.getProducts()
	},
	mounted() {
		this.$vuetify.goTo(0)
	},
	methods: {
		async getProducts() {
			try {
				this.loading = true
				const res = await this.$axios.$post('/products/filter', {
					text: this.$route.query.text || undefined,
					category: this.$route.params.category || undefined,
					university: this.$route.params.university || undefined,
					campus: this.$route.params.campus || undefined,
					maxPrice: this.$route.query.maxPrice || undefined,
					minPrice: this.$route.query.minPrice || undefined,
					sortPrice:
						this.$route.query?.order?.length <= 4
							? this.$route.query?.order
							: undefined,
					sortDate:
						this.$route.query?.order?.length > 4
							? this.$route.query?.order
							: undefined,
				})
				this.ads = res
			} catch (err) {
				if (err.response.status > 404) return this.$nuxt.error({ err })
				this.err = err.response.data.message
			} finally {
				this.loading = false
			}
		},
	},
}
</script>
