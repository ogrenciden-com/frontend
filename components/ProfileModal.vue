<template>
	<v-card flat rounded="lg" class="px-sm-10 px-4">
		<v-snackbar
			v-model="snackbar"
			timeout="1500"
			app
			top
			color="success"
			outlined
		>
			{{ res }}
		</v-snackbar>
		<div class="d-flex justify-space-between align-center">
			<div>
				<v-card-title class="px-0">Profil Düzenle</v-card-title>
				<v-card-subtitle class="px-0">
					Bu formu kullanarak profilinindeki bilgileri
					değiştirebilirsin.
				</v-card-subtitle>
			</div>
			<v-btn icon class="mr-sm-n4 mt-n4" @click="profileToggle">
				<v-icon color="black">mdi-close</v-icon>
			</v-btn>
		</div>
		<form>
			<v-row no-gutters>
				<!-- change image -->
				<v-col class="mr-sm-12 mr-0" cols="12" sm="3">
					<v-sheet
						width="160px"
						height="160px"
						color="secondary"
						class="border mx-auto mx-sm-0"
						outlined
						flat
						:style="{ position: 'relative', cursor: 'pointer' }"
						@click="fileInput()"
					>
						<v-img
							:src="user.url"
							height="159px"
							width="159px"
							cover
						></v-img>
						<v-file-input
							ref="fileInput"
							v-model="image"
							class="centerCard"
							accept="image/*"
							prepend-icon="mdi-cloud-upload"
							hide-input
							@change="previewImage"
						>
						</v-file-input>
					</v-sheet>
				</v-col>
				<!-- name & surname -->
				<v-col class="mt-5 mt-sm-0" cols="12" sm="8">
					<v-row class="mb-3" dense>
						<!-- name -->
						<v-col>
							<v-text-field
								v-model="user.name"
								background-color="secondary"
								placeholder="Ad"
								color="darkGrey"
								class="text-caption text-sm-body-2 text-md-body-1"
								outlined
								type="text"
								height="32"
								flat
								solo
								dense
								hide-details
							></v-text-field>
						</v-col>
						<!-- surname -->
						<v-col>
							<v-text-field
								v-model="user.surname"
								background-color="secondary"
								placeholder="Soyad"
								color="darkGrey"
								class="text-caption text-sm-body-2 text-md-body-1"
								type="text"
								outlined
								flat
								solo
								dense
								hide-details
							></v-text-field>
						</v-col>
					</v-row>
					<!-- email -->
					<v-row class="mb-5" no-gutters>
						<v-text-field
							v-model="user.email"
							placeholder="E-posta"
							color="darkGrey"
							disabled
							type="email"
							background-color="secondary"
							class="text-caption text-sm-body-2 text-md-body-1"
							flat
							outlined
							solo
							dense
							hide-details
						>
							<template slot="append">
								<mail-icon />
							</template>
						</v-text-field>
					</v-row>
					<!-- password -->
					<v-row class="mb-5" no-gutters>
						<v-text-field
							v-model="user.password"
							placeholder="Şifre"
							:append-icon="
								isShow
									? 'mdi-eye-off-outline'
									: 'mdi-eye-outline'
							"
							:type="isShow ? 'text' : 'password'"
							background-color="secondary"
							color="darkGrey"
							class="text-caption text-sm-body-2 text-md-body-1"
							outlined
							flat
							solo
							dense
							hide-details
							@click:append="isShow = !isShow"
						>
						</v-text-field>
					</v-row>
				</v-col>
			</v-row>
			<!-- divider -->
			<v-divider class="mb-3 mt-n2 mb-sm-0 mt-sm-0 d-sm-none"></v-divider>
			<!-- university -->
			<v-row no-gutters>
				<v-col>
					<select-box
						v-model="user.university"
						:items="universities"
						item-text="name"
						item-value="slug"
						label="Üniversite"
						outlined
						classes="mb-6 text-caption text-sm-body-2"
					></select-box>
				</v-col>
			</v-row>
			<!-- campuses -->
			<v-row no-gutters>
				<v-col>
					<select-box
						v-model="user.campus"
						:items="campuses"
						item-text="name"
						item-value="slug"
						label="Kampüs"
						outlined
						classes="mb-6 text-caption text-sm-body-2 text-md-body-1"
					></select-box>
				</v-col>
			</v-row>
			<v-btn
				color="primary"
				height="40"
				width="100%"
				elevation="0"
				class="font-weight-bold mb-6"
				:loading="loading"
				@click="submit()"
				>Kaydet</v-btn
			>
		</form>
	</v-card>
</template>
<script>
import { mapMutations } from 'vuex'
import SelectBox from '@/components/SelectBox.vue'
import MailIcon from '@/components/Icons/MailIcon.vue'
export default {
	components: {
		SelectBox,
		MailIcon,
	},
	data() {
		return {
			user: {
				name: undefined,
				surname: undefined,
				email: undefined,
				password: undefined,
				university: undefined,
				campus: undefined,
				url: undefined,
			},
			isShow: false,
			image: [],
			loading: false,
			snackbar: false,
			res: undefined,
		}
	},
	async fetch() {
		await this.getUser()
	},
	computed: {
		universities() {
			return this.$store.state.UniversityAndCampus?.universities
		},
		campuses() {
			return this.$store.state.UniversityAndCampus?.selectedCampuses
		},
	},
	watch: {
		'user.university'() {
			if (!this.user.university) {
				this.user.campus = undefined
			}
			this.findCampusByUniversitySlug(this.user.university)
		},
	},
	methods: {
		async getUser() {
			try {
				const data = await this.$axios.$get('auth/me')
				this.user = { ...data }
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
			}
		},
		...mapMutations({
			findCampusByUniversitySlug:
				'UniversityAndCampus/findCampusByUniversitySlug',
			profileToggle: 'profileToggle',
			clearSelectedCampuses: 'UniversityAndCampus/clearSelectedCampuses',
		}),
		previewImage() {
			this.user.url = URL.createObjectURL(this.image)
		},
		fileInput() {
			this.$refs.fileInput.$refs.input.click()
		},
		async submit() {
			try {
				this.loading = true
				const newUser = { ...this.user }
				delete newUser._id
				delete newUser.createdAt
				delete newUser.updatedAt
				delete newUser.email
				await this.$axios.$put(`/auth/${this.user._id}`, newUser)
				this.snackbar = true
				this.res = 'Profil bilgileriniz başarı ile güncellenmiştir.'
				setTimeout(() => {
					this.profileToggle()
					this.clearSelectedCampuses()
				}, 500)
			} catch (error) {
				// eslint-disable-next-line
				console.log(error)
			} finally {
				this.loading = false
			}
		},
	},
}
</script>

<style scoped>
.centerCard {
	position: absolute;
	top: calc(50% - 33px);
	left: calc(50% - 10px);
	z-index: 10;
}
.border {
	border: 1px dashed #a6a2a2 !important;
}
</style>
