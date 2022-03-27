<template>
	<v-sheet outlined color="darkGrey" rounded max-width="232px">
		<v-card outlined color="secondary" flat class="px-2 py-3">
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
					v-for="link in links"
					:key="link"
					nuxt
					:to="detailLink"
				>
					<v-img
						width="210"
						height="190"
						class="mx-auto rounded"
						:src="link"
						:lazy-src="link"
					></v-img>
				</v-carousel-item>
			</v-carousel>
			<v-card-title class="pa-0 pt-1 mt-2">
				<nuxt-link
					:to="detailLink"
					class="text-body-2 font-weight-medium black--text text-decoration-none"
				>
					Macbook Air M1 (2020)
				</nuxt-link>
			</v-card-title>
			<v-card-subtitle
				class="pa-0 mt-1 text-caption font-weight-medium dark-grey--text"
			>
				Teknoloji
			</v-card-subtitle>
			<v-card-subtitle
				class="pa-0 pt-2 text-body-1 font-weight-bold primary--text"
			>
				17.250 TL
			</v-card-subtitle>
			<v-card-text
				class="pa-0 pt-1 text-caption font-weight-light dark-grey--text d-flex align-center justify-space-between"
			>
				<span>Farabi</span>
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
export default {
	data() {
		return {
			saveFavorite: false,
			model: 0,
			links: [
				'https://img.letgo.com/images/6e/77/b0/0f/6e77b00fe56972c0ffbeb3a7edba1b8a.jpg?impolicy=img_600',
				'https://img.letgo.com/images/59/7b/f0/19/597bf019424a92bbb974cf7e43e91542.jpg?impolicy=img_600',
				'https://img.letgo.com/images/d1/69/60/c7/d16960c77899a052da7de378ff68f663.jpg?impolicy=img_600',
			],
		}
	},
	computed: {
		detailLink() {
			return `/product/${
				this.$route.params.university
					? this.$route.params.university + '/'
					: ''
			}${
				this.$route.params.campus ? this.$route.params.campus + '/' : ''
			}${
				this.$route.params.category
					? this.$route.params.category + '/'
					: ''
			}macbook-air-m1-2020`
		},
	},
}
</script>
