<template>
	<div>
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
						:class="hover ? 'blue--text' : '#E1E9E9--text'"
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
</template>
<script>
import TelegramIcon from '@/components/Icons/TelegramIcon.vue'
export default {
	components: {
		TelegramIcon,
	},
	props: {
		title: {
			type: String,
			default: '',
		},
		price: {
			type: [String, Number],
			default: 0,
		},
	},
	computed: {
		shareTelegramLink() {
			return `https://t.me/share/url?url=https://ogrenciden.co${this.$route.fullPath}&text=${this.title} ${this.price}TL `
		},
		shareTwitterLink() {
			return `https://twitter.com/intent/tweet?text=İlanıma göz atın. ${this.title} ${this.price}TL &url=https://ogrenciden.co${this.$route.fullPath}`
		},
		shareWhatsAppLink() {
			return this.$device.isMobile
				? `whatsapp://send?text=https://ogrenciden.co${this.$route.fullPath}`
				: `https://web.whatsapp.com/send?text=https://ogrenciden.co${this.$route.fullPath}`
		},
	},
}
</script>
