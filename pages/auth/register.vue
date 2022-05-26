<template>
	<v-card
		flat
		color="white"
		rounded="lg"
		max-width="410"
		width="100%"
		height="600"
		class="px-4 py-2"
	>
		<v-card-title class="justify-center mt-4">
			<brand-logo />
		</v-card-title>
		<h3 class="text-center">Kayıt Ol</h3>
		<!-- <v-btn
			outlined
			block
			color="primary"
			width="100%"
			class="font-weight-bold mt-2 text-transform-none mt-6"
			:style="{ position: 'relative' }"
		>
			<google-icon :style="{ position: 'absolute', left: '4px' }" />
			Google ile giriş yap</v-btn
		>
		<div class="mt-8 mb-2">
			<v-divider></v-divider>
			<span
				class="text-caption darkGrey--text white px-2"
				:style="{ position: 'relative', top: '-13px', left: '167px' }"
				>Veya</span
			>
		</div> -->
		<v-form>
			<div class="mt-6">
				<v-row dense>
					<v-col
						><v-text-field
							v-model="user.name"
							outlined
							solo
							autofocus
							flat
							placeholder="Ad"
							height="32"
							color="darkGrey"
							class="text-body-2 mb-5"
							type="text"
							dense
							hide-details
						>
						</v-text-field>
					</v-col>
					<v-col>
						<v-text-field
							v-model="user.surname"
							outlined
							solo
							flat
							placeholder="Soyad"
							height="32"
							color="darkGrey"
							class="text-body-2 mb-5"
							type="text"
							dense
							hide-details
						>
						</v-text-field>
					</v-col>
				</v-row>
			</div>
			<select-box
				v-model="user.university"
				:items="universities"
				item-text="name"
				item-value="slug"
				label="Üniversite"
				classes="mb-8 text-caption text-md-body-2"
			/>

			<!-- campuses -->
			<select-box
				v-model="user.campus"
				classes="mb-8 text-caption text-md-body-2"
				:items="campuses"
				item-text="name"
				item-value="slug"
				label="Kampüs"
			/>
			<v-text-field
				v-model="user.email"
				outlined
				solo
				flat
				placeholder="Lütfen E-posta adresinizi giriniz"
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
				placeholder="Lütfen şifrenizi oluşturunuz"
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
			<div class="d-flex justify-center mt-8">
				<v-btn
					class="text-body-1 font-weight-bold text-transform-none py-6 px-10"
					color="primary"
					elevation="0"
					@click="submit"
				>
					Giriş yap
				</v-btn>
			</div>
		</v-form>
		<span
			class="text-body-2 font-weight-bold"
			:style="{ position: 'absolute', bottom: '30px' }"
		>
			Hesabın var mı?
			<nuxt-link
				to="/auth/login"
				class="primary--text text-decoration-none"
			>
				Giriş yap.
			</nuxt-link>
		</span>
	</v-card>
</template>
<script>
import { mapMutations } from 'vuex'
import MailIcon from '@/components/Icons/MailIcon.vue'
import BrandLogo from '@/components/BrandLogo.vue'
// import GoogleIcon from '@/components/Icons/GoogleIcon.vue'
export default {
	components: {
		BrandLogo,
		MailIcon,
		// GoogleIcon,
	},
	layout: 'auth',

	data() {
		return {
			isShow: false,
			user: {
				name: '',
				surname: '',
				email: '',
				password: '',
				university: undefined,
				campus: undefined,
			},
		}
	},

	computed: {
		campuses() {
			return this.$store.state.UniversityAndCampus?.selectedCampuses
		},
		universities() {
			return this.$store.state.UniversityAndCampus?.universities
		},
	},
	watch: {
		'user.university'() {
			this.findCampusByUniversitySlug(this.user.university)
		},
	},
	methods: {
		...mapMutations({
			findCampusByUniversitySlug:
				'UniversityAndCampus/findCampusByUniversitySlug',
			userToggle: 'userToggle',
		}),
		async submit() {
			try {
				await this.$axios.$post('auth', this.user)
				const res = await this.$auth.loginWith('local', {
					data: {
						email: this.user.email,
						password: this.user.password,
					},
				})
				this.$auth.strategy.token.set(res.data.tokens.access_token)
				this.$auth.setUser(res.data)

				this.userToggle()

				this.$router.push('/')
			} catch (e) {
				this.$nuxt.error({ e })
			}
		},
	},
}
</script>
