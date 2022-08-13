<template>
	<v-sheet max-width="232px">
		<v-card outlined flat class="pa-3">
			<v-carousel
				v-model="model"
				hide-delimiters
				show-arrows-on-hover
				:touch="{
					left: () => model++,
					right: () => model--,
				}"
				height="190"
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
			<v-card-title class="pa-0 pt-1 mt-2">
				<nuxt-link
					:to="detailLink"
					class="text-body-2 font-weight-medium black--text text-decoration-none text-transform-capitalize elipsis"
				>
					{{ ad.title }}
				</nuxt-link>
			</v-card-title>
			<v-card-subtitle
				class="pa-0 mt-1 text-caption font-weight-medium dark-grey--text text-transform-capitalize"
			>
				{{ ad.category }}
			</v-card-subtitle>
			<v-card-subtitle
				class="pa-0 pt-2 text-body-1 font-weight-bold primary--text"
			>
				{{ ad.price.toLocaleString('tr-TR') }} TL
			</v-card-subtitle>
			<v-card-text
				class="pa-0 pt-1 text-caption font-weight-light dark-grey--text d-flex align-center justify-space-between text-transform-capitalize"
			>
				<span>
					{{ ad.campus }}
				</span>
				<v-btn icon @click="saveFavorite = !saveFavorite">
					<v-icon color="red"
						>{{ saveFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
					</v-icon>
				</v-btn>
			</v-card-text>
		</v-card>
	</v-sheet>
</template>
<script>
import slugify from 'slugify'
export default {
	props: {
		favorite: {
			type: Boolean,
			default: false,
		},
		ad: {
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
			return `/product/${this.ad.university}/${this.ad.campus}/${
				this.ad.category
			}/${slugify(this.ad.title, { lower: true })}/${this.ad._id}`
		},
	},
}
</script>
