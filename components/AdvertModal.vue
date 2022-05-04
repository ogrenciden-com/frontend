<template>
	<div>
		<v-card flat rounded="lg" class="px-sm-10 px-4">
			<div class="d-flex justify-space-between align-center">
				<div>
					<v-card-title class="px-0">Yeni ilan ekle</v-card-title>
					<v-card-subtitle class="px-0"
						>Bu formu kullanarak yeni bir ilan
						oluşturabilirsiniz.</v-card-subtitle
					>
				</div>
				<v-btn icon class="mr-sm-n4 mt-n4" @click="advertToggle">
					<v-icon color="black">mdi-close</v-icon>
				</v-btn>
			</div>
			<form>
				<v-row no-gutters>
					<v-col>
						<v-text-field
							v-model="form.title"
							background-color="secondary"
							placeholder="İlan başlığını giriniz."
							height="42"
							color="darkGrey"
							class="text-caption text-sm-body-2 text-md-body-1"
							outlined
							autofocus
							flat
							solo
							dense
							hide-details
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="5" sm="4">
						<v-text-field
							v-model="form.price"
							placeholder="Fiyat"
							append-icon="mdi-currency-try"
							type="number"
							background-color="secondary"
							color="darkGrey"
							class="text-caption text-sm-body-2 text-md-body-1"
							reverse
							outlined
							flat
							hide-details
							hide-spin-buttons
							dense
						></v-text-field>
					</v-col>
					<v-col cols="7" sm="8">
						<select-box
							v-model="form.category"
							:items="categories"
							item-text="name"
							item-value="slug"
							label="Kategori"
							:outlined="true"
							classes="mb-6 text-caption text-sm-body-2 text-md-body-1"
						></select-box>
					</v-col>
				</v-row>
				<!-- <v-row no-gutters>
					<v-col>
						<select-box
							v-model="form.city"
							:items="cities"
							label="Şehir"
							:outlined="true"
							classes="mb-6 text-caption text-sm-body-2 text-md-body-1"
						></select-box>
					</v-col>
				</v-row> -->
				<v-row no-gutters>
					<v-col>
						<select-box
							v-model="form.universityName"
							:items="universities"
							item-text="name"
							item-value="slug"
							label="Üniversite"
							outlined
							classes="mb-6 text-caption text-sm-body-2"
						></select-box>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<select-box
							v-model="form.campus"
							:items="campuses"
							item-text="name"
							item-value="slug"
							label="Kampüs"
							outlined
							classes="mb-6 text-caption text-sm-body-2 text-md-body-1"
						></select-box>
					</v-col>
				</v-row>
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
				<v-row>
					<v-col>
						<v-textarea
							v-model="form.description"
							placeholder="İlan açıklaması"
							background-color="white"
							auto-grow
							outlined
							flat
						></v-textarea>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col
						class="d-flex justify-center justify-sm-space-between mt-n2 flex-wrap"
					>
						<v-sheet
							v-for="(i, index) in 5"
							:key="index"
							width="110px"
							height="110px"
							color="secondary"
							class="border ma-1 ma-sm-0"
							outlined
							flat
							:style="{ position: 'relative' }"
						>
							<v-img
								:src="form.url[index]"
								height="110px"
								width="110px"
								cover
							></v-img>
							<v-file-input
								v-model="image"
								class="centerCard"
								accept="image/*"
								prepend-icon="mdi-cloud-upload"
								hide-input
								@change="previewImage(index)"
							>
							</v-file-input>
						</v-sheet>
					</v-col>
				</v-row>
				<div class="d-flex justify-end">
					<v-btn
						color="primary"
						height="40"
						width="160"
						elevation="0"
						class="font-weight-bold my-6"
						@click="submit"
						>Yayınla</v-btn
					>
				</div>
			</form>
		</v-card>
	</div>
</template>
<script>
import { mapMutations } from 'vuex'
import SelectBox from '@/components/SelectBox.vue'
export default {
	components: {
		SelectBox,
	},
	data() {
		return {
			form: {
				title: undefined,
				universityName: undefined,
				campus: undefined,
				description: undefined,
				tel: '+905',
				city: undefined,
				category: undefined,
				price: undefined,
				url: [],
			},
			image: [],
		}
	},
	computed: {
		universities() {
			return this.$store.state.UniversityAndCampus?.universities
		},
		campuses() {
			return this.$store.state.UniversityAndCampus?.selectedCampuses
		},
		categories() {
			return this.$store.state.Categories?.list
		},
	},
	watch: {
		'form.universityName'() {
			if (!this.form.universityName) {
				this.form.campus = undefined
			}
			this.findCampusByUniversitySlug(this.form.universityName)
		},
	},
	methods: {
		...mapMutations({
			advertToggle: 'advertToggle',
			findCampusByUniversitySlug:
				'UniversityAndCampus/findCampusByUniversitySlug',
		}),
		previewImage(index) {
			this.form.url[index] = URL.createObjectURL(this.image)
		},
		submit() {
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
