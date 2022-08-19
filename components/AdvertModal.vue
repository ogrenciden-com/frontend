<template>
	<div>
		<v-card flat rounded="lg" class="px-sm-10 px-4">
			<v-snackbar
				v-model="snackbar"
				timeout="1200"
				app
				absolute
				right
				top
				color="success"
				outlined
			>
				{{ res }}
			</v-snackbar>
			<div class="d-flex justify-space-between align-center">
				<div>
					<v-card-title class="px-0">Yeni ilan ekle</v-card-title>
					<v-card-subtitle class="px-0"
						>Bu formu kullanarak yeni bir ilan
						oluşturabilirsiniz.</v-card-subtitle
					>
					<v-alert
						v-if="!$auth.loggedIn"
						width="100%"
						dense
						outlined
						type="error"
						class="text-caption red--text"
					>
						İlan oluşturmak için giriş yapmanız gerekmektedir!
					</v-alert>
				</div>
				<v-btn icon class="mr-sm-n4 mt-n4" @click="advertToggle">
					<v-icon color="black">mdi-close</v-icon>
				</v-btn>
			</div>
			<form @submit.prevent="submit">
				<v-row no-gutters>
					<v-col>
						<v-text-field
							v-model="ad.title"
							background-color="secondary"
							placeholder="İlan başlığını giriniz."
							height="42"
							color="darkGrey"
							class="text-caption text-sm-body-2 text-md-body-1"
							outlined
							autofocus
							counter="70"
							:error-messages="error.title"
							flat
							solo
							dense
						></v-text-field>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col cols="5" sm="4">
						<v-text-field
							v-model="ad.price"
							placeholder="Fiyat"
							append-icon="mdi-currency-try"
							type="tel"
							background-color="secondary"
							color="darkGrey"
							class="text-caption text-sm-body-2 text-md-body-1 mr-3"
							reverse
							outlined
							flat
							:error-messages="error.price"
							hide-spin-buttons
							dense
						></v-text-field>
					</v-col>
					<v-col cols="7" sm="8">
						<select-box
							v-model="ad.category"
							:items="categories"
							item-text="name"
							:error-messages="error.category"
							:hide-details="false"
							item-value="slug"
							label="Kategori"
							:outlined="true"
							classes="text-caption text-sm-body-2 text-md-body-1"
						></select-box>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<select-box
							v-model="ad.university"
							:items="universities"
							:error-messages="error.university"
							:hide-details="false"
							item-text="name"
							item-value="slug"
							label="Üniversite"
							outlined
							classes="text-caption text-sm-body-2"
						></select-box>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<select-box
							v-model="ad.campus"
							:items="campuses"
							:error-messages="error.campus"
							:hide-details="false"
							item-text="name"
							item-value="slug"
							label="Kampüs"
							outlined
							classes="text-caption text-sm-body-2 text-md-body-1"
						></select-box>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<v-text-field
							v-model="ad.contact"
							type="tel"
							placeholder="Telefon numarası"
							background-color="secondary"
							color="red--text"
							class="text-caption text-sm-body-2 text-md-body-1"
							:error-messages="error.contact"
							outlined
							flat
							hide-spin-buttons
							dense
						>
							<template slot="prepend-inner">
								<div
									:class="
										ad.contact
											? phoneClass
												? 'green--text'
												: 'red--text'
											: 'darkGrey--text'
									"
								>
									<small> +90 </small>
								</div>
							</template>
						</v-text-field>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<v-textarea
							v-model="ad.description"
							:error-messages="error.description"
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
							:style="{ position: 'relative', cursor: 'pointer' }"
							@click="fileInput(index)"
						>
							<v-img
								:src="ad.images[index]"
								height="128px"
								width="130px"
								cover
							></v-img>
							<v-file-input
								ref="fileInput"
								v-model="image"
								:error-messages="error.images"
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
				<div class="d-flex justify-space-between align-center">
					<v-btn
						color="red"
						height="40"
						width="140"
						outlined
						elevation="0"
						class="font-weight-bold my-6"
						@click="clearAd"
						>Temizle</v-btn
					>
					<v-btn
						color="primary"
						height="40"
						width="140"
						:loading="loading"
						elevation="0"
						class="font-weight-bold my-6"
						type="submit"
						nuxt
						to="/"
						@click="submit"
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
			ad: {
				title: undefined,
				university: undefined,
				campus: undefined,
				description: undefined,
				contact: undefined,
				category: undefined,
				price: undefined,
				images: [],
				user_id: '',
			},
			image: [],
			snackbar: false,
			res: undefined,
			loading: false,
			phoneClass: false,
			error: {
				title: undefined,
				university: undefined,
				campus: undefined,
				description: undefined,
				contact: undefined,
				category: undefined,
				price: undefined,
				images: [],
			},
		}
	},
	async fetch() {
		await this.getUser()
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
		'ad.university'() {
			if (!this.ad.university) {
				this.ad.campus = undefined
			}
			this.findCampusByUniversitySlug(this.ad.university)
		},
		'ad.contact'() {
			if (this.ad?.contact?.length === 10) return (this.phoneClass = true)
			this.phoneClass = false
		},
	},

	methods: {
		clearErrorMessages() {
			this.error.title = undefined
			this.error.university = undefined
			this.error.campus = undefined
			this.error.description = undefined
			this.error.contact = undefined
			this.error.category = undefined
			this.error.price = undefined
			this.error.images = undefined
		},
		clearAd() {
			this.ad.title = undefined
			this.ad.university = undefined
			this.ad.campus = undefined
			this.ad.description = undefined
			this.ad.contact = undefined
			this.ad.price = undefined
			this.ad.images = []
			this.ad.user_id = undefined
		},
		...mapMutations({
			advertToggle: 'advertToggle',
			findCampusByUniversitySlug:
				'UniversityAndCampus/findCampusByUniversitySlug',
		}),
		fileInput(index) {
			this.$refs.fileInput[index].$refs.input.click()
		},
		async previewImage(index) {
			let selectedImage = this.image
			this.ad.images[index] = URL.createObjectURL(this.image)
			selectedImage = await processImage(selectedImage)
			this.ad.images[index] = selectedImage
		},
		async getUser() {
			try {
				const data = await this.$axios.$get('auth/me')
				this.ad.user_id = data._id
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
				// this.$nuxt.error({ e })
			}
		},
		async submit() {
			if (this.ad?.contact?.length === 11) {
				this.ad.contact = this.ad?.contact?.split(' ').join('')
			} else this.ad.contact = this.ad?.contact?.split(' ').join('')

			this.ad.images = this.ad.images.filter((img) => {
				return img !== null
			})
			try {
				this.loading = true
				await this.$axios.$post('/products', this.ad)
				this.res = 'İlanınız başarılı bir şekilde oluşturuldu'
				this.snackbar = true
				this.clearAd()
				setTimeout(() => {
					this.advertToggle()
					this.$router.go(0)
				}, 500)
			} catch (e) {
				if (e.response?.data?.error?.includes('title')) {
					this.clearErrorMessages()
					this.error.title = 'Başlık alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('price')) {
					this.clearErrorMessages()
					this.error.price = 'Fiyat alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('university')) {
					this.clearErrorMessages()
					this.error.university = 'Üniversite alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('campus')) {
					this.clearErrorMessages()
					this.error.campus = 'Kampüs alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('category')) {
					this.clearErrorMessages()
					this.error.category = 'Kategori alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('contact')) {
					this.clearErrorMessages()
					this.error.contact = 'İletişim alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('description')) {
					this.clearErrorMessages()
					this.error.description = 'Açıklama alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('images')) {
					this.clearErrorMessages()
					this.error.images = 'Resim alanı boş bırakılamaz'
				}
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
