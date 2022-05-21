<template>
	<v-card
		flat
		color="white"
		rounded="lg"
		max-width="410"
		width="100%"
		height="500"
		class="px-4 py-2"
	>
		<v-card-title class="justify-center mt-4">
			<brand-logo />
		</v-card-title>
		<v-btn
			outlined
			block
			color="primary"
			width="100%"
			class="font-weight-bold mt-2 text-transform-none text-center mt-6"
			:style="{ position: 'relative' }"
		>
			<google-icon :style="{ position: 'absolute', left: '4px' }" />

			Google ile giriş yap
		</v-btn>
		<div class="mt-8 mb-2">
			<v-divider></v-divider>
			<span
				class="text-caption darkGrey--text white px-2"
				:style="{ position: 'relative', top: '-13px', left: '167px' }"
				>Veya</span
			>
		</div>
		<v-form>
			<v-text-field
				v-model="user.email"
				outlined
				solo
				flat
				autofocus
				placeholder="Lütfen E-posta adresinizi girin"
				height="32"
				color="darkGrey"
				class="text-body-2 mb-5"
				type="email"
				dense
				hide-details
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
				:type="isShow ? 'text' : 'password'"
				dense
				hide-details
				@click:append="isShow = !isShow"
			>
			</v-text-field>
			<div class="d-flex justify-end">
				<nuxt-link
					to="/auth/forgot-password"
					class="primary--text text-decoration-underline text-caption font-weight-light mt-4 text-right"
					>Şifremi unuttum</nuxt-link
				>
			</div>
			<div class="d-flex justify-center mt-8">
				<v-btn
					class="text-body-1 font-weight-bold text-transform-none py-6 px-10"
					color="primary"
					elevation="0"
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
import { mapMutations } from 'vuex'
import MailIcon from '@/components/Icons/MailIcon.vue'
import GoogleIcon from '@/components/Icons/GoogleIcon.vue'
import BrandLogo from '@/components/BrandLogo.vue'
export default {
	components: {
		BrandLogo,
		MailIcon,
		GoogleIcon,
	},
	layout: 'auth',
	data() {
		return {
			isShow: false,
			user: {
				email: '',
				password: '',
			},
		}
	},
	methods: {
		...mapMutations({
			setUser: 'setUser',
		}),
		async loginWithEmail() {
			try {
				await this.$axios.$post('auth/login', this.user)
				this.$router.push('/')
			} catch (err) {
				this.$nuxt.error({ err })
			}
		},
	},
}
</script>
