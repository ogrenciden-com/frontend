<template>
	<div>
		<v-card flat rounded="lg" class="px-sm-10 px-4">
			<v-snackbar v-model="snackbar" timeout="2000" top app>
				{{ err }}

				<template #action="{ attrs }">
					<v-btn
						color="red"
						text
						v-bind="attrs"
						@click="snackbar = false"
					>
						Kapat
					</v-btn>
				</template>
			</v-snackbar>
			<div class="d-flex justify-space-between align-center">
				<div>
					<v-card-title class="px-0">Yeni ilan ekle</v-card-title>
					<v-card-subtitle class="px-0"
						>Bu formu kullanarak yeni bir ilan
						oluşturabilirsiniz.</v-card-subtitle
					>
				</div>
				<v-btn icon class="mr-sm-n4 mt-n4" @click="advertToggle">
					<v-icon color="black">mdi-close</v-icon>
				</v-btn>
			</div>
			<form @submit.prevent="submit">
				<v-row no-gutters>
					<v-col>
						<v-text-field
							v-model="ads.title"
							background-color="secondary"
							placeholder="İlan başlığını giriniz."
							height="42"
							color="darkGrey"
							class="text-caption text-sm-body-2 text-md-body-1"
							outlined
							autofocus
							counter="70"
							flat
							solo
							dense
						></v-text-field>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col cols="5" sm="4">
						<v-text-field
							v-model="ads.price"
							placeholder="Fiyat"
							append-icon="mdi-currency-try"
							type="tel"
							background-color="secondary"
							color="darkGrey"
							class="text-caption text-sm-body-2 text-md-body-1 mr-3"
							reverse
							outlined
							flat
							hide-details
							hide-spin-buttons
							dense
						></v-text-field>
					</v-col>
					<v-col cols="7" sm="8">
						<select-box
							v-model="ads.category"
							:items="categories"
							item-text="name"
							item-value="slug"
							label="Kategori"
							:outlined="true"
							classes="mb-6 text-caption text-sm-body-2 text-md-body-1"
						></select-box>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<select-box
							v-model="ads.university"
							:items="universities"
							item-text="name"
							item-value="slug"
							label="Üniversite"
							outlined
							classes="mb-6 text-caption text-sm-body-2"
						></select-box>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<select-box
							v-model="ads.campus"
							:items="campuses"
							item-text="name"
							item-value="slug"
							label="Kampüs"
							outlined
							classes="mb-6 text-caption text-sm-body-2 text-md-body-1"
						></select-box>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<v-text-field
							v-model="ads.contact"
							placeholder="(+90) İletişim bilgisi"
							type="tel"
							background-color="secondary"
							color="darkGrey"
							class="text-caption text-sm-body-2 text-md-body-1"
							outlined
							flat
							hide-details
							hide-spin-buttons
							dense
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-textarea
							v-model="ads.description"
							placeholder="İlan açıklaması"
							background-color="white"
							auto-grow
							counter="250"
							outlined
							flat
						></v-textarea>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col
						class="d-flex justify-center justify-sm-space-between flex-wrap"
					>
						<v-sheet
							v-for="(i, index) in 4"
							:key="index"
							width="130px"
							height="130px"
							color="secondary"
							class="border ma-1 ma-sm-0"
							outlined
							flat
							:style="{ position: 'relative' }"
						>
							<v-img
								:src="ads.images[index]"
								height="128px"
								width="130px"
								cover
							></v-img>
							<v-file-input
								v-model="image"
								class="centerCard"
								accept="image/*"
								prepend-icon="mdi-cloud-upload"
								hide-input
								@change="previewImage(index)"
							>
							</v-file-input>
						</v-sheet>
					</v-col>
				</v-row>
				<div class="d-flex justify-end">
					<v-btn
						color="primary"
						height="40"
						width="160"
						:loading="loading"
						elevation="0"
						class="font-weight-bold my-6"
						type="submit"
						>Yayınla</v-btn
					>
				</div>
			</form>
		</v-card>
	</div>
</template>
<script>
import { mapMutations } from 'vuex'
import { processImage } from '../heplers/reduceImageSize'
import SelectBox from '@/components/SelectBox.vue'

export default {
	components: {
		SelectBox,
	},
	data() {
		return {
			ads: {
				title: undefined,
				university: undefined,
				campus: undefined,
				description: undefined,
				contact: '05',
				category: undefined,
				price: undefined,
				images: [],
				user_id: '',
			},
			image: [],
			snackbar: false,
			err: 'Bir şeyler yanlış gitti',
			loading: false,
		}
	},
	computed: {
		universities() {
			return this.$store.state.UniversityAndCampus?.universities
		},
		campuses() {
			return this.$store.state.UniversityAndCampus?.selectedCampuses
		},
		categories() {
			return this.$store.state.Categories?.list
		},
	},
	watch: {
		'ads.university'() {
			if (!this.ads.university) {
				this.ads.campus = undefined
			}
			this.findCampusByUniversitySlug(this.ads.university)
		},
	},
	created() {
		this.getUser()
	},
	methods: {
		// clearAd(){

		// }
		...mapMutations({
			advertToggle: 'advertToggle',
			findCampusByUniversitySlug:
				'UniversityAndCampus/findCampusByUniversitySlug',
		}),
		async previewImage(index) {
			let selectedImage = this.image
			this.ads.images[index] = URL.createObjectURL(this.image)
			selectedImage = await processImage(selectedImage)
			this.ads.images[index] = selectedImage
		},
		async getUser() {
			try {
				const data = await this.$axios.$get('auth/me')
				this.ads.user_id = data._id
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
				// this.$nuxt.error({ e })
			}
		},
		async submit() {
			this.ads.contact = this.ads.contact.split(' ').join('')
			this.ads.images = this.ads.images.filter((img) => {
				return img !== null
			})
			try {
				this.loading = true
				await this.$axios.$post('/products', this.ads)
				this.advertToggle()
			} catch (err) {
				this.snackbar = true
				this.err = err.response?.data.error
				// this.$nuxt.error({ e })
			} finally {
				this.loading = false
			}
		},
	},
}
</script>

<style scoped>
.centerCard {
	position: absolute;
	top: calc(50% - 33px);
	left: calc(50% - 10px);
	z-index: 10;
}
.border {
	border: 1px dashed #a6a2a2 !important;
}
</style>
