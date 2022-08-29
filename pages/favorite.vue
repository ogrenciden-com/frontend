<template>
	<div>
		<h2 class="ml-2 mb-8 text--subtitle">Favorilerim</h2>
		<v-alert
			v-if="alert"
			width="100%"
			dense
			text
			type="error"
			border="left"
		>
			Önce
			<nuxt-link
				to="/auth/login"
				class="text-decoration-none text-decoration-none"
			>
				giriş
			</nuxt-link>
			yapmalısınız
		</v-alert>
		<v-alert
			v-else-if="ads.length < 1 && !$fetchState.pending"
			width="100%"
			dense
			text
			type="warning"
			border="left"
			class="d-flex align-center ml-2 green--text"
		>
			Favori ilanınız bulunmamaktadır
		</v-alert>

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
				<item-card :ad="ad" />
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
		<social-tags :title="title" :description="description" />
		<canonical-tag path="favorite" />
	</div>
</template>
<script>
import CardSkeleton from '@/components/CardSkeleton.vue'
import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'
import SocialTags from '@/components/Seo/SocialTags.vue'
import CanonicalTag from '~/components/Seo/CanonicalTag.vue'
export default {
	name: 'Favorite',
	components: {
		ItemCard,
		ItemList,
		SocialTags,
		CanonicalTag,
		CardSkeleton,
	},
	data() {
		return {
			ads: [],
			loading: false,
			title: 'Favorilerim',
			description: 'Favori ilanlarıma göz atın',
			alert: false,
		}
	},
	async fetch() {
		await this.getFavorite()
	},
	head() {
		return {
			title: this.title,
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: 'description',
					name: 'description',
					content: this.description,
				},
			],
		}
	},
	mounted() {
		this.$vuetify.goTo(0)
	},
	methods: {
		async getFavorite() {
			try {
				const { data } = await this.$axios.get('auth/favorite')
				this.ads = data?.favorites
			} catch (error) {
				const statusCode = error.response?.status || 500
				if (statusCode === 401) {
					return (this.alert = true)
				}
				this.$nuxt.error({ statusCode })
			}
		},
	},
}
</script>
