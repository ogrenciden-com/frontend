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
					v-for="image in ads.images"
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
						class="text-body-2 font-weight-medium black--text text-decoration-none elipsis2"
					>
						{{ ads.title }}
					</nuxt-link>
				</v-card-title>
				<v-card-subtitle
					class="pa-0 mt-1 text-caption font-weight-medium dark-grey--text"
				>
					{{ ads.category }}
				</v-card-subtitle>
				<v-card-subtitle
					class="pa-0 pt-1 text-body-1 font-weight-bold primary--text"
				>
					{{ ads.price }} TL
				</v-card-subtitle>
				<v-card-text
					class="pa-0 pt-1 text-caption font-weight-light dark-grey--text d-flex align-center justify-space-between"
				>
					<span>
						{{ ads.campus }}
					</span>
					<v-btn
						absolute
						right
						icon
						@click="saveFavorite = !saveFavorite"
					>
						<v-icon size="20" color="red"
							>{{
								saveFavorite ? 'mdi-heart' : 'mdi-heart-outline'
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
		favorite: {
			type: Boolean,
			default: false,
		},
		ads: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			model: 0,
			saveFavorite: this.favorite,
		}
	},
	computed: {
		detailLink() {
			return `/product/${this.ads.university}/${this.ads.campus}/${
				this.ads.category
			}/${slugify(this.ads.title, { lower: true })}/${this.ads._id}`
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
