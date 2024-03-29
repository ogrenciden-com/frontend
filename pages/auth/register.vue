<template>
	<v-card
		flat
		color="white"
		rounded="lg"
		max-width="410"
		width="100%"
		height="610"
		class="px-4 py-2"
	>
		<v-card-title class="justify-center pb-0">
			<nuxt-link to="/">
				<brand-logo />
			</nuxt-link>
		</v-card-title>

		<h3 class="text-center">Kayıt Ol</h3>
		<v-form @submit.prevent="submit">
			<div class="mt-2">
				<v-row dense>
					<v-col
						><v-text-field
							v-model="user.name"
							outlined
							solo
							flat
							placeholder="Ad"
							height="32"
							color="darkGrey"
							class="text-body-2"
							type="text"
							dense
							:error-messages="error.name"
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
							class="text-body-2"
							type="text"
							dense
							:error-messages="error.surname"
						>
						</v-text-field>
					</v-col>
				</v-row>
			</div>
			<select-box
				v-model="user.university"
				:items="universities"
				:hide-details="false"
				:error-messages="error.university"
				item-text="name"
				item-value="slug"
				label="Üniversite"
				classes="mb-0 text-caption text-md-body-2"
			/>

			<!-- campuses -->
			<select-box
				v-model="user.campus"
				classes="mb-0 text-caption text-md-body-2"
				:items="campuses"
				:hide-details="false"
				:error-messages="error.campus"
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
				class="text-body-2"
				type="email"
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
				placeholder="Lütfen şifrenizi oluşturunuz"
				:append-icon="
					isShow ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
				"
				height="32"
				color="darkGrey"
				class="text-body-2"
				:type="isShow ? 'text' : 'password'"
				:error-messages="error.password"
				dense
				@click:append="isShow = !isShow"
			>
			</v-text-field>
			<v-checkbox v-model="termsOfService" class="mt-0 pt-0">
				<template slot="label">
					<span
						class="text-caption"
						:class="error.termsOfService && 'red--text checkbox'"
					>
						Kişisel verilerimin işlenmesine yönelik
						<nuxt-link
							to="/termsOfService"
							:class="
								!error.termsOfService
									? 'black--text'
									: 'red--text'
							"
							>aydınlatma metnini</nuxt-link
						>
						okudum ve onayladım.
					</span>
				</template>
				<!-- Kişisel verilerimin işlenmesine yönelik aydınlatma metnini
				okudum ve anladım. -->
			</v-checkbox>
			<div class="d-flex justify-center">
				<v-btn
					class="text-body-1 font-weight-bold text-transform-none py-6 px-10"
					color="primary"
					elevation="0"
					:loading="loading"
					@click="submit"
				>
					Kayıt Ol
				</v-btn>
			</div>
		</v-form>
		<span class="text-body-2 font-weight-bold d-block mt-5">
			Hesabın var mı?
			<nuxt-link
				to="/auth/login"
				class="primary--text text-decoration-none"
			>
				Giriş Yap
			</nuxt-link>
		</span>
		<social-tags :title="title" :description="description" />
		<canonical-tag :path="'auth/register'" />
	</v-card>
</template>
<script>
import { mapMutations } from 'vuex'
import MailIcon from '@/components/Icons/MailIcon.vue'
import BrandLogo from '@/components/BrandLogo.vue'
import SocialTags from '@/components/Seo/SocialTags.vue'
import CanonicalTag from '~/components/Seo/CanonicalTag.vue'
export default {
	components: {
		BrandLogo,
		MailIcon,
		SocialTags,
		CanonicalTag,
	},
	layout: 'auth',

	data() {
		return {
			title: 'Kayıt Ol',
			description: "Ögrenciden'e hemen Kayıt Ol",
			isShow: false,
			loading: false,
			user: {
				name: '',
				surname: '',
				email: '',
				password: '',
				university: undefined,
				campus: undefined,
			},
			error: {
				name: undefined,
				surname: undefined,
				university: undefined,
				campus: undefined,
				email: undefined,
				password: undefined,
				termsOfService: undefined,
			},
			termsOfService: false,
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
		}),
		clearErrorMessages() {
			this.error.name = undefined
			this.error.surname = undefined
			this.error.university = undefined
			this.error.campus = undefined
			this.error.email = undefined
			this.error.password = undefined
		},
		async submit() {
			if (!this.termsOfService) return (this.error.termsOfService = true)
			try {
				this.error.termsOfService = false
				this.loading = true
				await this.$axios.$post('auth', this.user)
				await this.$auth.loginWith('local', {
					data: {
						email: this.user.email,
						password: this.user.password,
					},
				})
				this.$router.push('/')
			} catch (e) {
				if (e.response?.data?.error?.includes('name')) {
					this.clearErrorMessages()
					this.error.name = 'İsim alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('surname')) {
					this.clearErrorMessages()
					this.error.surname = 'Soyisim alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('university')) {
					this.clearErrorMessages()
					this.error.university = 'Üniversite alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('campus')) {
					this.clearErrorMessages()
					this.error.campus = 'Kampüs alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('email')) {
					this.clearErrorMessages()
					this.error.email = 'E-posta alanı boş bırakılamaz'
				}
				if (e.response?.data?.error?.includes('password')) {
					this.clearErrorMessages()
					this.error.password = 'Şifre alanı boş bırakılamaz'
				}
				if (e.response.data.code === 11000) {
					this.clearErrorMessages()
					this.error.email =
						'Bu email ile zaten bir hesap var giriş yapmayı deneyebilirsiniz.'
				}
			} finally {
				this.loading = false
			}
		},
	},
}
</script>
<style scoped>
@keyframes example {
	0% {
		transform: translateX(0px);
		timing-function: ease-in;
	}
	37% {
		transform: translateX(5px);
		timing-function: ease-out;
	}
	55% {
		transform: translateX(-5px);
		timing-function: ease-in;
	}
	73% {
		transform: translateX(4px);
		timing-function: ease-out;
	}
	82% {
		transform: translateX(-4px);
		timing-function: ease-in;
	}
	91% {
		transform: translateX(2px);
		timing-function: ease-out;
	}
	96% {
		transform: translateX(-2px);
		timing-function: ease-in;
	}
	100% {
		transform: translateX(0px);
		timing-function: ease-in;
	}
}
.checkbox {
	position: relative;
	animation-name: example;
	animation-duration: 0.5s;
}
</style>
