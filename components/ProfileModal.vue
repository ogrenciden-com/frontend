<template>
	<v-card flat rounded="lg" class="px-sm-10 px-4">
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
						:style="{ position: 'relative' }"
					>
						<v-img
							:src="form.url"
							height="159px"
							width="159px"
							cover
						></v-img>
						<v-file-input
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
						<v-col>
							<v-text-field
								v-model="form.name"
								background-color="secondary"
								placeholder="Ad"
								color="darkGrey"
								class="text-caption text-sm-body-2 text-md-body-1"
								outlined
								height="32"
								autofocus
								flat
								solo
								dense
								hide-details
							></v-text-field>
						</v-col>
						<v-col>
							<v-text-field
								v-model="form.lastname"
								background-color="secondary"
								placeholder="Soyad"
								color="darkGrey"
								class="text-caption text-sm-body-2 text-md-body-1"
								outlined
								flat
								solo
								dense
								hide-details
							></v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-5" no-gutters>
						<v-text-field
							v-model="form.email"
							placeholder="E-posta"
							color="darkGrey"
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
					<v-row class="mb-5" no-gutters>
						<v-text-field
							v-model="form.password"
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

			<!-- cities -->
			<v-row no-gutters>
				<v-col>
					<select-box
						v-model="form.city"
						:items="cities"
						label="Şehir"
						:outlined="true"
						classes="mb-6 text-caption text-sm-body-2 text-md-body-1"
					></select-box>
				</v-col>
			</v-row>
			<!-- university -->
			<v-row no-gutters>
				<v-col>
					<select-box
						v-model="form.universityName"
						:items="university"
						label="Üniversite"
						:outlined="true"
						classes="mb-6 text-caption text-sm-body-2"
					></select-box>
				</v-col>
			</v-row>
			<!-- campuses -->
			<v-row no-gutters>
				<v-col>
					<select-box
						v-model="form.campus"
						:items="campuses"
						label="Kampüs"
						:outlined="true"
						classes="mb-6 text-caption text-sm-body-2 text-md-body-1"
					></select-box>
				</v-col>
			</v-row>
			<!-- contact information  -->
			<v-row no-gutters>
				<v-col>
					<v-text-field
						v-model="form.tel"
						placeholder="(+90) İletişim bilgisi"
						type="tel"
						background-color="secondary"
						color="darkGrey"
						class="text-caption text-sm-body-2 text-md-body-1"
						outlined
						flat
						hide-details
						hide-spin-buttons
						dense
					></v-text-field>
				</v-col>
			</v-row>

			<v-btn
				color="primary"
				height="40"
				width="100%"
				elevation="0"
				class="font-weight-bold my-6"
				@click="submit"
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
			form: {
				name: '',
				lastname: '',
				email: '',
				password: '',
				universityName: '',
				campus: '',
				tel: '',
				city: '',
				url: '',
			},
			isShow: false,
			items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
			image: [],
		}
	},
	computed: {
		university() {
			return this.$store.state.university?.list
		},
		campuses() {
			return this.$store.state.UniversityAndCampus?.selectedCampuses
		},
		cities() {
			return this.$store.state.Cities?.list
		},
	},
	watch: {
		'form.universityName'() {
			this.form.campus = undefined
			this.findCampusByUniversityName(this.form.universityName)
		},
	},
	methods: {
		...mapMutations({
			profileToggle: 'profileToggle',
			findCampusByUniversityName:
				'UniversityAndCampus/findCampusByUniversityName',
		}),
		previewImage() {
			this.form.url = URL.createObjectURL(this.image)
		},
		submit() {
			// eslint-disable-next-line no-console
			console.log(this.form)
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
