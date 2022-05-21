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
				<!-- v-for="link in links"
					:key="link" -->
				<v-carousel-item nuxt :to="detailLink">
					<v-img
						width="210"
						height="190"
						class="mx-auto rounded"
						src="https://img.letgo.com/images/2a/00/6f/f1/2a006ff155483ebdf0a951ad50a993fe.jpg?impolicy=img_384"
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
					{{ ads.price }}
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
			links: [
				'https://img.letgo.com/images/6e/77/b0/0f/6e77b00fe56972c0ffbeb3a7edba1b8a.jpg?impolicy=img_600',
				'https://img.letgo.com/images/59/7b/f0/19/597bf019424a92bbb974cf7e43e91542.jpg?impolicy=img_600',
				'https://img.letgo.com/images/d1/69/60/c7/d16960c77899a052da7de378ff68f663.jpg?impolicy=img_600',
			],
			saveFavorite: this.favorite,
		}
	},
	computed: {
		detailLink() {
			// TODO
			// routeru universite campüs isim şeklinde ayarla
			// /product/zonguldak-bulent-ecevit-universitesi/farabi/camasir-makinesi/macbook-air-m1-2020
			return `/product/macbook-air-m1-2020/${this.ads._id}`
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
