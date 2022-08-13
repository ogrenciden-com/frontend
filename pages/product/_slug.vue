<template>
	<div>
		<v-breadcrumbs
			class="pa-0 mb-2 ml-2 font-weight-thin"
			divider=">"
			:items="breadcrumbs"
		></v-breadcrumbs>
		<v-sheet class="d-md-flex d-block mb-10 mb-sm-0" outlined rounded="lg">
			<template v-if="$fetchState.pending">
				<v-sheet>
					<v-skeleton-loader
						class="d-none d-sm-block"
						width="600"
						height="600"
					></v-skeleton-loader>
					<v-skeleton-loader
						class="d-sm-none d--block"
						width="357"
						height="600"
					></v-skeleton-loader>
				</v-sheet>
			</template>
			<v-carousel
				v-else
				v-model="model"
				class="rounded"
				hide-delimiters
				show-arrows-on-hover
				:touch="{
					left: () => model++,
					right: () => model--,
				}"
				height="600"
			>
				<v-carousel-item v-for="image in item.images" :key="image">
					<v-img
						max-width="600"
						max-height="600"
						width="100%"
						height="100%"
						contain
						class="mx-auto rounded"
						:src="image"
					></v-img>
				</v-carousel-item>
			</v-carousel>
			<template v-if="$fetchState.pending">
				<v-sheet
					max-width="539"
					width="100%"
					color="secondary pl-5 rounded-r-lg mx-auto mx-md-0 pt-1"
				>
					<v-skeleton-loader class="mt-4" width="80%" type="heading">
					</v-skeleton-loader>
					<v-skeleton-loader class="mt-4" width="80%" type="chip">
					</v-skeleton-loader>
					<v-skeleton-loader
						class="mt-4"
						width="80%"
						type="paragraph"
					>
					</v-skeleton-loader>
					<v-skeleton-loader class="mt-4" width="80%" type="text">
					</v-skeleton-loader>
					<v-skeleton-loader class="py-4" width="50%" type="text">
					</v-skeleton-loader>
				</v-sheet>
			</template>
			<v-card
				v-else
				max-width="530"
				width="100%"
				flat
				color="secondary"
				class="pl-5 rounded-r-lg rounded-l-0 mx-auto mx-md-0"
			>
				<v-card-subtitle
					class="font-weight-bold text-h6 black--text pl-0 pb-0 text-transform-capitalize"
				>
					{{ item.title }}
				</v-card-subtitle>
				<v-card-title
					class="font-weight-bold text-h5 primary--text pl-0 pt-2 pb-0"
				>
					{{ item.price && item.price.toLocaleString('tr-TR') }} TL
				</v-card-title>
				<div
					class="text-body-2 darkGrey--text d-flex align-center mt-1"
				>
					<span class="mr-1 text-transform-capitalize darkGrey--text">
						{{ item.category }}
					</span>
					<span class="d-block mr-1 dot"></span>
					<time class="text-caption font-weight-light darkGrey--text">
						{{ formatDate(item.createdAt) }}
					</time>
				</div>
				<div
					class="text-body-2 darkGrey--text d-sm-flex align-sm-center mt-1"
				>
					<span class="d-block d-sm-flex mr-1">
						{{ item.university }}
					</span>
					<span class="dot d-none d-sm-block mr-1"> </span>
					<span
						class="font-weight-thin text-transform-capitalize darkGrey--text"
						>{{ item.campus }}</span
					>
				</div>
				<p class="text-body-2 mt-2 black--text">
					{{ item.description }}
				</p>
				<div
					class="pb-4 pb-sm-0 d-flex align-center justify-space-between"
				>
					<!-- <v-btn
						v-if="!reCAPTCHA"
						x-small
						text
						:loading="recaptchaLoading"
						color="primary"
						@click="waitASecond()"
					>
						Numarayı gör
					</v-btn> -->
					<span class="text-caption darkGrey--text mr-4">
						<!-- Bu ilan 181 kez görüntülendi -->
						{{ item.user_id.name }}
						{{ item.user_id.surname }}:
						<a href="tel: +905316948991" class="darkGrey--text">
							{{ item.contact }}
						</a>
					</span>
					<div class="mr-sm-4 mr-2 d-flex">
						<a
							:href="shareWhatsAppLink"
							data-action="share/whatsapp/share"
							target="_blank"
							class="text-decoration-none"
						>
							<v-hover v-slot="{ hover }">
								<v-btn icon>
									<v-icon :class="hover ? 'green--text' : ''"
										>mdi-whatsapp</v-icon
									>
								</v-btn>
							</v-hover>
						</a>
						<a
							:href="shareTelegramLink"
							target="_blank"
							class="text-decoration-none"
						>
							<v-hover v-slot="{ hover }">
								<v-btn icon>
									<telegram-icon
										:class="
											hover
												? 'blue--text'
												: '#E1E9E9--text'
										"
									/>
								</v-btn>
							</v-hover>
						</a>
						<a
							:href="shareTwitterLink"
							data-action="share/whatsapp/share"
							target="_blank"
							class="text-decoration-none"
						>
							<v-hover v-slot="{ hover }">
								<v-btn icon>
									<v-icon :class="hover ? 'blue--text' : ''"
										>mdi-twitter</v-icon
									>
								</v-btn>
							</v-hover>
						</a>
					</div>
				</div>
				<div v-if="item && userId">
					<v-btn
						v-if="item.user_id._id === userId"
						icon
						absolute
						top
						right
						:loading="deleteLoading"
					>
						<v-hover v-slot="{ hover }">
							<v-btn
								icon
								@click="
									;(snackbar = true), (deleteLoading = true)
								"
							>
								<v-icon :class="hover ? 'red--text' : ''"
									>mdi-delete</v-icon
								>
							</v-btn>
						</v-hover>
					</v-btn>
				</div>
			</v-card>
		</v-sheet>
		<v-snackbar v-model="snackbar" top app outlined color="primary">
			Silmek istediğinize emin misiniz?

			<template #action="{ attrs }">
				<v-btn
					color="red"
					text
					v-bind="attrs"
					class="text-transform-none"
					@click="deleteAd()"
				>
					Sil
				</v-btn>
				<v-btn
					color="primary"
					text
					v-bind="attrs"
					class="text-transform-none"
					@click=";(snackbar = false), (deleteLoading = false)"
				>
					Silme
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>
<router>
  {
    path: '/product/:university?/:campus?/:category?/:slug/:id'
  }
</router>
<script>
import TelegramIcon from '@/components/Icons/TelegramIcon.vue'
export default {
	components: {
		TelegramIcon,
	},
	data() {
		return {
			model: 0,
			// reCAPTCHA: false,
			// recaptchaLoading: false,
			snackbar: undefined,
			breadcrumbs: [
				{
					text: 'Ana Sayfa',
					href: '/',
				},
				{
					text: this.convertTitle(this.$route.params.university),
					disabled: false,
					href: `/${this.$route.params.university}`,
					nuxt: true,
				},
				{
					text: this.convertTitle(this.$route.params.campus),
					disabled: false,
					href: `/${this.$route.params.university}/${this.$route.params.campus}`,
					nuxt: true,
				},
				{
					text: this.convertTitle(this.$route.params.category),
					disabled: false,
					href: `/${this.$route.params.university}/${this.$route.params.campus}/${this.$route.params.category}`,
					nuxt: true,
				},
			],
			item: {},
			userId: undefined,
			deleteLoading: false,
		}
	},
	async fetch() {
		await this.getProduct()
		this.$auth.user && (await this.getUser())
	},
	computed: {
		shareTelegramLink() {
			return `https://t.me/share/url?url=https://ogrenciden.vercel.app${this.$route.fullPath}&text=${this.item.title} ${this.item.price}TL `
		},
		shareTwitterLink() {
			return `https://twitter.com/intent/tweet?text=İlanıma göz atın. ${this.item.title} ${this.item.price}TL &url=https://ogrenciden.vercel.app${this.$route.fullPath}`
		},
		shareWhatsAppLink() {
			return this.$device.isMobile
				? `whatsapp://send?text=https://ogrenciden.vercel.app${this.$route.fullPath}`
				: `https://web.whatsapp.com/send?text=https://ogrenciden.vercel.app${this.$route.fullPath}`
		},
	},
	mounted() {
		this.$vuetify.goTo(0)
	},

	methods: {
		convertTitle(slug) {
			const words = slug.split('-')
			for (let i = 0; i < words.length; i++) {
				const word = words[i]
				words[i] = word.charAt(0).toUpperCase() + word.slice(1)
			}
			return words.join(' ')
		},

		async getUser() {
			try {
				const data = await this.$axios.$get('auth/me')
				// eslint-disable-next-line no-console
				this.userId = data._id
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
				// this.$nuxt.error({ e })
			}
		},
		// waitASecond() {
		// 	this.recaptchaLoading = true
		// 	// console.log('1.', this.reCAPTCHA, this.recaptchaLoading)
		// 	setTimeout(() => {
		// 		this.reCAPTCHA = true
		// 		// console.log('2.', this.reCAPTCHA, this.recaptchaLoading)
		// 		this.recaptchaLoading = false
		// 	}, Math.floor(Math.random() * 1000 * 2))
		// 	// console.log('3.', this.reCAPTCHA, this.recaptchaLoading)
		// },
		formatDate(date) {
			let mounth = date?.slice(5, 7)
			const day = date?.slice(8, 10)
			const year = date?.slice(0, 4)
			mounth = new Date(`${year}-${mounth}-${day}`).toLocaleString(
				'tr-TR',
				{ month: 'long' },
			)
			return `${day} ${mounth} ${year}`
		},
		async getProduct() {
			try {
				const res = await this.$axios.$get(
					`/products/${this.$route.params.id}`,
				)
				let { category, university, campus } = res
				category = this.convertTitle(category)
				university = this.convertTitle(university)
				campus = this.convertTitle(campus)

				this.item = { ...res, category, university, campus }
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
				this.$nuxt.error({ e })
			}
		},
		async deleteAd() {
			try {
				this.snackbar = true
				this.deleteLoading = true
				await this.$axios.$delete(`/products/${this.$route.params.id}`)
				this.$router.push({ path: '/' })
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
				this.$nuxt.error({ e })
			} finally {
				this.deleteLoading = false
			}
		},
	},
}
</script>
