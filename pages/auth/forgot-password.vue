<template>
	<v-card
		flat
		color="white"
		rounded="lg"
		max-width="510"
		width="100%"
		height="200"
		class="px-4 py-2"
	>
		<v-card-title class="justify-center mt-2">
			<nuxt-link to="/">
				<brand-logo />
			</nuxt-link>
		</v-card-title>

		<v-card-text class="text-center">
			Eğer şifrenizi unuttuysanız
			<a href="mailto:destek.ogrenciden@gmail.com"
				>destek.ogrenciden@gmail.com'a</a
			>
			kaydolduğunuz e-posta adresi ile birlikte "ŞİFREMİ UNUTTUM" başlıklı
			e-posta atınız.
		</v-card-text>
		<!-- <v-form>
			<v-text-field
				v-model="email"
				outlined
				solo
				flat
				placeholder="Lütfen E-posta adresinizi girin"
				height="32"
				color="darkGrey"
				class="text-body-2 my-5"
				type="email"
				dense
				hide-details
			>
				<template slot="append">
					<mail-icon />
				</template>
			</v-text-field>

			<small class="d-flex justify-end">
				<nuxt-link
					to="/auth/login"
					class="primary--text text-decoration-underline text-caption font-weight-light text-right"
					>Giriş yap</nuxt-link
				>
			</small>
			<div class="d-flex justify-center mt-2">
				<v-btn
					class="text-body-1 text-transform-none py-4"
					width="100%"
					color="primary"
					elevation="0"
					@click="submit"
				>
					E-mail gönder
				</v-btn>
			</div>
		</v-form> -->
	</v-card>
</template>
<script>
// import MailIcon from '@/components/Icons/MailIcon.vue'
import BrandLogo from '@/components/BrandLogo.vue'
export default {
	components: {
		BrandLogo,
		// MailIcon,
	},
	layout: 'auth',
	data() {
		return {
			// email: '',
			title: 'Şifremi Unuttum',
		}
	},
	head() {
		return {
			title: this.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content:
						'Kampüsündeki ikinci el ilanları keşfet, al ve sat',
				},
			],
		}
	},
	// methods: {
	// 	submit() {
	// 		console.log(this.email)
	// 	},
	// },
}
</script>

<style>
.text-transform-none {
	text-transform: none !important;
}
</style>
