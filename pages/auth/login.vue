<template>
	<v-card
		flat
		color="white"
		rounded="lg"
		max-width="410"
		width="100%"
		height="430"
		class="px-4 py-2"
	>
		<v-card-title class="justify-center mt-4">
			<nuxt-link to="/">
				<brand-logo />
			</nuxt-link>
		</v-card-title>
		<h3 class="text-center">Giriş Yap</h3>
		<v-form @submit.prevent="loginWithEmail">
			<v-text-field
				v-model="user.email"
				outlined
				solo
				flat
				placeholder="Lütfen E-posta adresinizi girin"
				height="32"
				color="darkGrey"
				class="text-body-2 mt-5"
				type="email"
				:rules="[rules.required]"
				dense
				:error-messages="error.email"
			>
				<template slot="append">
					<mail-icon />
				</template>
			</v-text-field>
			<v-text-field
				v-model="user.password"
				outlined
				solo
				flat
				placeholder="Lütfen şifrenizi giriniz."
				:append-icon="
					isShow ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
				"
				height="32"
				color="darkGrey"
				class="text-body-2"
				dense
				:rules="[rules.required]"
				:type="isShow ? 'text' : 'password'"
				:error-messages="error.password"
				@click:append="isShow = !isShow"
			>
			</v-text-field>
			<div class="d-flex justify-end">
				<nuxt-link
					to="/auth/forgot-password"
					class="primary--text text-decoration-underline text-caption font-weight-light text-right"
					>Şifremi unuttum</nuxt-link
				>
			</div>
			<div class="d-flex justify-center mt-3">
				<v-btn
					class="text-body-1 font-weight-bold text-transform-none py-6 px-10"
					color="primary"
					elevation="0"
					:loading="loading"
					@click="loginWithEmail"
				>
					Giriş yap
				</v-btn>
			</div>
		</v-form>
		<span
			class="text-body-2 font-weight-bold"
			:style="{ position: 'absolute', bottom: '30px' }"
		>
			Hesabın yok mu?
			<nuxt-link
				to="/auth/register"
				class="primary--text text-decoration-none"
			>
				Hesap oluştur.
			</nuxt-link>
		</span>
	</v-card>
</template>
<script>
import MailIcon from '@/components/Icons/MailIcon.vue'
import BrandLogo from '@/components/BrandLogo.vue'
export default {
	components: {
		BrandLogo,
		MailIcon,
	},
	layout: 'auth',
	data() {
		return {
			isShow: false,
			user: {
				email: '',
				password: '',
			},
			rules: {
				required: (value) =>
					!!value || 'Bu alanı doldurmak zorunludur.',
			},
			error: {
				email: undefined,
				password: undefined,
			},
			loading: false,
			title: 'Giriş Yap',
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
	methods: {
		async loginWithEmail() {
			try {
				this.loading = true

				const res = await this.$auth.loginWith('local', {
					data: this.user,
				})
				this.$auth.strategy.token.set(res.data.tokens.access_token)
				this.$router.push('/')
				this.$auth.setUser(res.data)
			} catch (e) {
				this.error.email =
					'Email veya şifre hatalı lütfen tekrar deneyiniz.'
				this.error.password =
					'Email veya şifre hatalı lütfen tekrar deneyiniz.'
			} finally {
				this.loading = false
			}
		},
	},
}
</script>
