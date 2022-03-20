<template>
	<v-card flat color="primary" max-width="1000" width="100%" height="750">
		<div class="d-flex justify-space-between fill-height">
			<v-sheet class="primary" max-width="495" :style="{ zIndex: '10' }">
				<icon-vektor class="mt-16" />
			</v-sheet>
			<v-card
				max-width="505"
				width="100%"
				height="100%"
				rounded="0"
				flat
				class="pr-5"
			>
				<div class="d-flex justify-space-between align-center">
					<v-spacer></v-spacer>
					<v-btn class="mt-3" icon @click="loginToggle">
						<v-icon color="black">mdi-close</v-icon>
					</v-btn>
				</div>
				<div class="ml-16">
					<v-sheet width="360" class="ml-8">
						<v-card-title class="text-h5 font-weight-bold px-0">
							Giriş yap
						</v-card-title>
						<brand-logo class="mt-10 d-block" />
						<v-btn
							outlined
							color="primary"
							width="100%"
							class="font-weight-bold mt-16 text-transform-none"
							>Google ile giriş yap</v-btn
						>
						<div class="my-8">
							<v-divider></v-divider>
							<span
								class="text-caption secondary--text white px-1"
								:style="{
									position: 'relative',
									top: '-13px',
									left: '160px',
								}"
								>Veya</span
							>
						</div>
						<v-text-field
							v-model="email"
							outlined
							solo
							flat
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
							v-model="password"
							outlined
							solo
							flat
							placeholder="Lütfen şifrenizi oluşturunuz."
							:append-icon="
								isShow
									? 'mdi-eye-outline'
									: 'mdi-eye-off-outline'
							"
							height="32"
							color="darkGrey"
							class="text-body-2"
							:type="isShow ? 'password' : 'text'"
							dense
							hide-details
							@click:append="isShow = !isShow"
						>
						</v-text-field>
						<nuxt-link
							v-if="false"
							to="/sifremi-unuttum"
							class="primary--text text-decoration-underline text-caption font-weight-light d-block mt-4 text-right"
							>Şifremi unuttum</nuxt-link
						>
						<div class="d-flex justify-center mt-8">
							<v-btn
								class="text-body-1 font-weight-bold text-transform-none py-6 px-10"
								color="primary"
								elevation="0"
								@click="submit()"
							>
								Giriş yap
							</v-btn>
						</div>
						<span
							class="text-body-2 font-weight-bold"
							:style="{ position: 'absolute', bottom: '30px' }"
						>
							Hesabın yok mu?
							<nuxt-link
								to="/"
								class="primary--text text-decoration-none"
							>
								Hesap oluştur.
							</nuxt-link>
						</span>
					</v-sheet>
				</div>
			</v-card>
		</div>
	</v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import IconVektor from '@/components/Icons/IconVektor.vue'
import MailIcon from '@/components/Icons/MailIcon.vue'
import BrandLogo from '@/components/BrandLogo.vue'
export default {
	components: {
		IconVektor,
		BrandLogo,
		MailIcon,
	},
	data() {
		return {
			isShow: false,
			password: '',
			email: '',
		}
	},
	methods: {
		...mapMutations({
			loginToggle: 'loginToggle',
		}),
		submit() {
			const form = { email: this.email, password: this.password }
			this.email = ''
			this.password = ''
			console.log(form)
		},
	},
}
</script>

<style>
.text-transform-none {
	text-transform: none !important;
}
</style>
