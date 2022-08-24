<template>
	<v-card
		outlined
		rounded="0"
		flat
		class="px-2 py-2"
		width="100%"
		height="120px"
	>
		<div class="d-flex">
			<v-carousel
				v-model="model"
				class="mr-3"
				hide-delimiters
				:show-arrows="false"
				:touch="{
					left: () => model++,
					right: () => model--,
				}"
				height="100"
				:style="{ width: '100px' }"
			>
				<v-carousel-item
					v-for="image in ad.images"
					:key="image"
					nuxt
					:to="detailLink"
				>
					<v-img
						width="210"
						height="190"
						class="mx-auto rounded"
						:src="image"
					></v-img>
				</v-carousel-item>
			</v-carousel>
			<div>
				<v-card-title class="pa-0">
					<nuxt-link
						:to="detailLink"
						class="text-body-2 font-weight-medium black--text text-decoration-none elipsis2 text-transform-capitalize"
					>
						{{ ad.title }}
					</nuxt-link>
				</v-card-title>
				<v-card-subtitle
					class="pa-0 mt-1 text-caption font-weight-medium dark-grey--text"
				>
					{{ ad.category }}
				</v-card-subtitle>
				<v-card-subtitle
					class="pa-0 pt-1 text-body-1 font-weight-bold primary--text"
				>
					{{ ad.price.toLocaleString('tr-TR') }} TL
				</v-card-subtitle>
				<v-card-text
					class="pa-0 pt-1 text-caption font-weight-light dark-grey--text d-flex align-center justify-space-between"
				>
					<span>
						{{ ad.campus }}
					</span>
					<v-btn
						absolute
						right
						icon
						:loading="loading"
						@click="isFavorite ? deleteFavorite() : addFavorite()"
					>
						<v-icon size="20" color="red"
							>{{
								isFavorite ? 'mdi-heart' : 'mdi-heart-outline'
							}}
						</v-icon>
					</v-btn>
				</v-card-text>
			</div>
		</div>
	</v-card>
</template>
<script>
import slugify from 'slugify'
export default {
	props: {
		ad: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			model: 0,
			loading: false,
		}
	},
	computed: {
		detailLink() {
			return `/product/${this.ad?.university}/${this.ad?.campus}/${
				this.ad?.category
			}/${slugify(this.ad?.title, { lower: true })}/${this.ad?._id}`
		},
		isFavorite() {
			return this.$auth?.user?.favorites.includes(this.ad?._id)
		},
	},
	methods: {
		async addFavorite() {
			try {
				this.loading = true
				await this.$axios.post('auth/favorite', {
					productId: this.ad?._id,
				})
				await this.getUser()
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error)
			} finally {
				this.loading = false
			}
		},
		async getUser() {
			try {
				this.loading = true
				const data = await this.$axios.$get('auth/me')

				const user = { ...data }
				this.$auth.setUser(user)
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
			} finally {
				this.loading = false
			}
		},
		async deleteFavorite() {
			try {
				this.loading = true
				await this.$axios.delete('auth/favorite', {
					data: {
						productId: this.ad._id,
					},
				})
				await this.getUser()
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error)
			} finally {
				this.loading = false
			}
		},
	},
}
</script>
<style scoped>
.elipsis2 {
	width: 150px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>
