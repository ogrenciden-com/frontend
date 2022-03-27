<template>
	<div>
		<v-breadcrumbs
			class="pa-0 mb-2"
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
				<v-carousel-item v-for="link in links" :key="link">
					<v-img
						max-width="600"
						max-height="600"
						width="100%"
						height="100%"
						contain
						class="mx-auto rounded"
						:src="link"
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
					Macbook Air M1 (2020)
				</v-card-subtitle>
				<v-card-title
					class="font-weight-bold text-h5 primary--text pl-0 pt-2 pb-0"
				>
					17.250 TL
				</v-card-title>
				<div class="text-body-2 darkGrey--text d-flex align-center">
					<span class="mr-1"> Teknoloji </span>
					<span class="font-weight-bold text-h6 mr-1">•</span>
					<time class="text-caption font-weight-light"
						>19.02.2022</time
					>
				</div>
				<div class="text-body-2 darkGrey--text d-flex align-center">
					<span class="mr-1"> Bülent Ecevit Universitesi </span>
					<span class="font-weight-bold text-h6 mr-1"> • </span>
					<time class="font-weight-regular">Farabi</time>
				</div>
				<p class="text-body-2 mt-2 black--text">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Soluta, corporis adipisci. Eaque cumque illum provident quod
					iure dolorem cum laudantium reprehenderit possimus nulla
					neque hic repudiandae officiis, tempora perspiciatis saepe.
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Nesciunt quo facilis libero optio sequi, numquam velit
					soluta vel, aliquid a veritatis ipsam qui fugit temporibus
					dolore consequatur architecto sed iste?
				</p>
				<div
					class="pb-4 pb-sm-0 d-flex align-center justify-space-between"
				>
					<span class="text-caption darkGrey--text mr-4">
						Bu ilan 181 kez görüntülendi
					</span>
					<div class="mr-4">
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
					</div>
				</div>
			</v-card>
		</v-sheet>
	</div>
</template>
<router>
  {
    path: '/product/:university?/:campus?/:category?/:slug'
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
			links: [
				'https://img.letgo.com/images/6e/77/b0/0f/6e77b00fe56972c0ffbeb3a7edba1b8a.jpg?impolicy=img_600',
				'https://img.letgo.com/images/59/7b/f0/19/597bf019424a92bbb974cf7e43e91542.jpg?impolicy=img_600',
				'https://img.letgo.com/images/d1/69/60/c7/d16960c77899a052da7de378ff68f663.jpg?impolicy=img_600',
			],
			breadcrumbs: [
				{
					text: 'Ana Sayfa',
					disabled: false,
					href: '/',
				},
				{
					text: 'Bülent Ecevit Üniversitesi',
					disabled: false,
					href: `/zonguldak-bulent-ecevit-universitesi`,
				},
				{
					text: 'Farabi',
					disabled: false,
					href: `/zonguldak-bulent-ecevit-universitesi/farabi`,
				},
				{
					text: 'Teknoloji',
					disabled: false,
					href: `/zonguldak-bulent-ecevit-universitesi/farabi/bar`,
				},
			],
		}
	},
	computed: {
		shareTelegramLink() {
			return `https://t.me/share/url?url=https://frontend-git-dev-aahmetcakir.vercel.app${this.$route.fullPath}&text=Macbook Air M1 (2020) Fiyatı: 17.250TL`
		},
		shareWhatsAppLink() {
			return this.detectMob()
				? `whatsapp://send?text=https://frontend-git-dev-aahmetcakir.vercel.app${this.$route.fullPath}`
				: `https://web.whatsapp.com/send?text=https://frontend-git-dev-aahmetcakir.vercel.app${this.$route.fullPath}`
		},
	},
	methods: {
		mobileCheck() {
			if (!process.client) return
			let check = false
			;(function (a) {
				if (
					/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
						a,
					) ||
					/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
						a.substr(0, 4),
					)
				)
					check = true
			})(navigator.userAgent || navigator.vendor || window.opera)
			return check
		},
	},
}
</script>
