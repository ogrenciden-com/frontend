<template>
	<div>
		<v-breadcrumbs
			class="pa-0 mb-2 ml-2"
			divider=">"
			:items="breadcrumbs"
		></v-breadcrumbs>
		<v-sheet class="d-md-flex d-block mb-10 mb-sm-0" outlined rounded="lg">
			<v-carousel
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
				<v-carousel-item v-for="image in 3" :key="image">
					<v-img
						max-width="600"
						max-height="600"
						width="100%"
						height="100%"
						contain
						class="mx-auto rounded"
						src="https://img.letgo.com/images/2a/00/6f/f1/2a006ff155483ebdf0a951ad50a993fe.jpg?impolicy=img_384"
					></v-img>
				</v-carousel-item>
			</v-carousel>
			<v-card
				max-width="530"
				width="100%"
				flat
				color="secondary"
				class="pl-5 rounded-r-lg rounded-l-0 mx-auto mx-md-0"
			>
				<v-card-subtitle
					class="font-weight-bold text-h6 black--text pl-0 pb-0"
				>
					{{ item.title }}
				</v-card-subtitle>
				<v-card-title
					class="font-weight-bold text-h5 primary--text pl-0 pt-2 pb-0"
				>
					{{ item.price }} TL
				</v-card-title>
				<div
					class="text-body-2 darkGrey--text d-flex align-center mt-1"
				>
					<span class="mr-1"> {{ item.category }} </span>
					<span class="d-block mr-1 dot"></span>
					<time class="text-caption font-weight-light">
						{{ item.createdAt }}
					</time>
				</div>
				<div
					class="text-body-2 darkGrey--text d-sm-flex align-sm-center mt-1"
				>
					<span class="d-block d-sm-flex mr-1">
						{{ item.university }}
					</span>
					<span class="dot d-none d-sm-block mr-1"> </span>
					<span class="font-weight-thin">{{ item.campus }}</span>
				</div>
				<p class="text-body-2 mt-2 black--text">
					{{ item.description }}
				</p>
				<div
					class="pb-4 pb-sm-0 d-flex align-center justify-space-between"
				>
					<span class="text-caption darkGrey--text mr-4">
						<!-- Bu ilan 181 kez görüntülendi -->
						Tel: {{ item.contact }}
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
				<v-btn v-if="false" icon absolute top right>
					<v-hover v-slot="{ hover }">
						<v-btn icon>
							<v-icon :class="hover ? 'primary--text' : ''"
								>mdi-pencil-circle</v-icon
							>
						</v-btn>
					</v-hover>
				</v-btn>
			</v-card>
		</v-sheet>
	</div>
</template>
<router>
  {
    path: '/product/:university?/:campus?/:category?/:id'
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
			breadcrumbs: [
				{
					text: 'Ana Sayfa',
					disabled: false,
					href: '/',
				},
				{
					text: 'Bülent Ecevit Üniversitesi',
					disabled: false,
					href: `/${this.$route.params.university}`,
				},
				{
					text: 'Farabi',
					disabled: false,
					href: `/${this.$route.params.university}/${this.$route.params.campus}`,
				},
				{
					text: 'Teknoloji',
					disabled: false,
					href: `/${this.$route.params.university}/${this.$route.params.campus}/${this.$route.params.category}`,
				},
			],
			item: {},
		}
	},
	computed: {
		shareTelegramLink() {
			return `https://t.me/share/url?url=https://ogrenciden-git-dev-aahmetcakir.vercel.app${this.$route.fullPath}&text=${this.item.title} ${this.item.price}TL `
		},
		shareTwitterLink() {
			return `https://twitter.com/intent/tweet?text=İlanıma göz atın. ${this.item.title} ${this.item.price}TL &url=https://ogrenciden-git-dev-aahmetcakir.vercel.app${this.$route.fullPath}`
		},
		shareWhatsAppLink() {
			return this.$device.isMobile
				? `whatsapp://send?text=https://ogrenciden-git-dev-aahmetcakir.vercel.app${this.$route.fullPath}`
				: `https://web.whatsapp.com/send?text=https://ogrenciden-git-dev-aahmetcakir.vercel.app${this.$route.fullPath}`
		},
	},
	mounted() {
		this.$vuetify.goTo(0)
	},
	created() {
		this.getProduct()
	},
	methods: {
		async getProduct() {
			try {
				const res = await this.$axios.$get(
					`/products/${this.$route.params.id}`,
				)

				// eslint-disable-next-line no-console
				this.item = res
				console.log(res)
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
			}
		},
	},
}
</script>
<style scoped>
.dot {
	width: 5px;
	height: 5px;
	background-color: #a6a2a2;
	border-radius: 100px;
}
</style>
