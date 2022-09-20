<template>
	<v-row>
		<v-col order="last" order-md="first" cols="8" class="col-12 col-md-8">
			<v-row>
				<template v-if="$fetchState.pending">
					<v-col
						v-for="index in 9"
						:key="'card-' + index"
						cols="4"
						class="pt-0 pb-6 pr-0 ml-n1 d-none d-sm-flex justify-center justify-md-start col-4 col-md-6 col-lg-4"
					>
						<card-skeleton card />
					</v-col>
				</template>
				<v-col
					v-for="ad in ads"
					v-else
					:key="ad._id"
					cols="4"
					class="pt-0 pb-6 pr-0 ml-n1 d-none d-sm-flex justify-center justify-md-start col-4 col-md-6 col-lg-4"
				>
					<item-card :ad="ad" />
				</v-col>
				<v-alert
					v-if="err && !endOfTheAds"
					width="100%"
					dense
					outlined
					type="error"
					class="ml-3 mr-2 d-flex align-center"
				>
					Seçtiğin kriterlere ait ilan bulunamadı ama sen yeni bir
					tane oluşturabilirsin.
					<v-btn icon class="mt-n1" @click="advertToggle()">
						<v-icon color="darkGray">mdi-clipboard-plus </v-icon>
					</v-btn>
				</v-alert>
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
				v-for="ad in ads"
				v-else
				:key="`${ad.user_id}-${ad._id}`"
				class="d-block d-sm-none px-3 pb-3"
			>
				<item-list :ad="ad" />
			</v-row>
			<v-btn
				v-if="!err && ads.length > 9"
				color="primary"
				height="48"
				elevation="0"
				class="mt-5 rounded d-flex text-transform-none mx-auto"
				:disabled="endOfTheAds"
				:loading="isLoadMoreLoading"
				@click="increaseLimit()"
			>
				Daha fazla ilan yükle
			</v-btn>
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
		<social-tags :title="title" :description="title" />
		<canonical-tag :path="''" />
		<!-- <v-card v-intersect="infiniteScrolling"></v-card> -->
	</v-row>
</template>
<router>
  {
    path: '/:university?/:campus?/:category?'
  }
</router>
<script>
import { mapMutations } from 'vuex'
import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'
import FilterCard from '@/components/FilterCard.vue'
import CardSkeleton from '@/components/CardSkeleton.vue'
import SocialTags from '@/components/Seo/SocialTags.vue'
import CanonicalTag from '~/components/Seo/CanonicalTag.vue'

export default {
	name: 'Index',
	components: {
		ItemCard,
		ItemList,
		FilterCard,
		SocialTags,
		CardSkeleton,
		CanonicalTag,
	},
	data() {
		return {
			ads: [],
			err: '',
			title: 'Kampüsündeki ikinci el ilanları keşfet, al & sat',
			limit: 9,
			page: 0,
			isLoadMoreLoading: false,
			endOfTheAds: false,
		}
	},
	async fetch() {
		this.ads = await this.getProducts()
	},
	head() {
		return {
			title: this.title,
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
	methods: {
		...mapMutations({
			advertToggle: 'advertToggle',
		}),
		async getProducts() {
			try {
				const res = await this.$axios.$post('/products/filter', {
					text: this.$route.query.text || undefined,
					category: this.$route.params.category || undefined,
					university: this.$route.params.university || undefined,
					campus: this.$route.params.campus || undefined,
					maxPrice: this.$route.query.maxPrice || undefined,
					minPrice: this.$route.query.minPrice || undefined,
					limit: this.limit,
					page: this.page,
					sortPrice:
						this.$route.query?.order?.length <= 4
							? this.$route.query?.order
							: undefined,
					sortDate:
						this.$route.query?.order?.length > 4
							? this.$route.query?.order
							: undefined,
				})
				return res
			} catch (error) {
				const statusCode = error.response?.status || 500
				if (statusCode > 404) return this.$nuxt.error({ statusCode })
				this.err = error.response.data.message
			}
		},
		// async infiniteScrolling(entries, observer, isIntersecting) {
		// 	console.log('çalıştı')
		// 	this.page++
		// 	const res = await this.getProducts()

		// 	this.ads = [...this.ads, ...res]
		// },
		async increaseLimit() {
			if (!this.endOfTheAds) {
				try {
					this.page++
					this.isLoadMoreLoading = true
					const res = await this.getProducts()
					this.ads = [...this.ads, ...res]
				} catch (error) {
					this.endOfTheAds = true
				} finally {
					this.isLoadMoreLoading = false
				}
			}
		},
	},
}
</script>
