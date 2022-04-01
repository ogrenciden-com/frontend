<template>
	<v-card outlined flat class="px-5 py-3" width="100%">
		<!--order -->
		<select-box
			v-model="form.order"
			:items="order"
			label="Sıralama"
			classes="mb-8 text-caption text-md-body-2"
		/>
		<!-- categories -->
		<select-box
			v-model="form.category"
			:items="items"
			label="Kategori"
			classes="mb-8 text-caption text-md-body-2"
		/>
		<!-- university -->
		<select-box
			v-model="form.universityName"
			:items="getUniversitiesName()"
			label="Üniversite"
			classes="mb-8 text-caption text-md-body-2"
		/>
		<!-- university autocomplete -->
		<!-- <v-autocomplete
    	  :items="university"
    	  v-model="universityName"
    	  label="Üniversite"
    	  class="mb-8 text-caption text-md-body-2"
    	  background-color="secondary"
    	  color="darkGrey"
    	  hide-details
    	  flat
    	  solo
    	  dense
   		 ></v-autocomplete> -->

		<!-- campuses -->
		<select-box
			v-model="form.campus"
			classes="mb-8 text-caption text-md-body-2"
			:items="campuses"
			label="Kampüs"
		/>
		<!-- price inputs -->
		<div class="d-flex">
			<v-text-field
				v-model="form.minPrice"
				placeholder="En Az"
				class="mb-8 mr-1 text-caption text-md-body-2"
				type="number"
				append-icon="mdi-currency-try"
				background-color="white"
				color="darkGrey"
				dense
				hide-details
				hide-spin-buttons
				flat
				outlined
			></v-text-field>
			<v-text-field
				v-model="form.maxPrice"
				placeholder="En Çok"
				append-icon="mdi-currency-try"
				class="mb-8 ml-1 text-caption text-md-body-2"
				type="number"
				outlined
				flat
				hide-details
				hide-spin-buttons
				dense
				background-color="white"
				color="darkGrey"
			></v-text-field>
		</div>

		<v-btn
			class="text-transform-none"
			color="primary"
			elevation="0"
			width="100%"
			@click="submit"
		>
			Uygula
		</v-btn>
	</v-card>
</template>
<script>
import slugify from 'slugify'
import { mapMutations, mapGetters } from 'vuex'

import SelectBox from '@/components/SelectBox.vue'
export default {
	components: {
		SelectBox,
	},
	data() {
		return {
			form: {
				order: undefined,
				category: undefined,
				universityName: undefined,
				campus: undefined,
				minPrice: undefined,
				maxPrice: undefined,
			},
			items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
		}
	},
	computed: {
		order() {
			return this.$store.state.Order?.list
		},
		universities() {
			return this.$store.state.university?.list
		},
		campuses() {
			return this.$store.state.UniversityAndCampus?.selectedCampuses
		},
	},
	watch: {
		'form.universityName'() {
			if (!this.form.universityName) {
				this.form.campus = undefined
			}
			this.findCampusByUniversityName(this.form.universityName)
		},
	},
	created() {
		// university router name
		if (this.$route.params.university) {
			this.findUniversityNameByUniversitySlug(
				this.$route.params.university,
			)
			this.findCampusByUniversityName(this.form.universityName)
			this.form.universityName =
				this.$store.state.UniversityAndCampus?.routeUniversityName
		}
		// campus router name

		if (this.$route.params.campus) {
			this.findCampusNameBySlug(this.$route.params.campus)
			this.form.campus =
				this.$store.state.UniversityAndCampus?.routeCampusName
		}

		// category router name
		if (this.$route.params.category) {
			this.form.category =
				this.$route.params.category[0].toUpperCase() +
				this.$route.params.category.slice(1)
		}
		// max price router value

		if (this.$route.query.maxPrice) {
			this.form.maxPrice = this.$route.query.maxPrice
		}
		// min price router value
		if (this.$route.query.minPrice) {
			this.form.minPrice = this.$route.query.minPrice
		}
		// order (sort) router value
		if (this.$route.query.order) {
			this.form.order =
				this.$route.query.order[0].toUpperCase() +
				this.$route.query.order
					.toLocaleLowerCase('tr-TR')
					.split('-')
					.join(' ')
					.slice(1)
					.replace('o', 'ö')
		}
	},
	methods: {
		...mapMutations({
			findCampusByUniversityName:
				'UniversityAndCampus/findCampusByUniversityName',
			findUniversityNameByUniversitySlug:
				'UniversityAndCampus/findUniversityNameByUniversitySlug',
			findCampusNameBySlug: 'UniversityAndCampus/findCampusNameBySlug',
		}),
		...mapGetters({
			getUniversitiesName: 'UniversityAndCampus/getUniversitiesName',
		}),
		submit() {
			this.$router.push({
				name: 'index',
				params: {
					university: this.form.universityName
						? slugify(this.form.universityName, {
								lower: true,
								locale: 'tr-TR',
						  })
						: undefined,
					campus: this.form.campus
						? slugify(this.form.campus, {
								lower: true,
								locale: 'tr',
						  })
						: undefined,
					category: this.form.category
						? slugify(this.form.category, {
								lower: true,
								locale: 'tr',
						  })
						: undefined,
				},
				query: {
					order: this.form.order
						? slugify(this.form.order, {
								lower: true,
						  })
						: undefined,
					minPrice: this.form.minPrice
						? slugify(this.form.minPrice, {
								lower: true,
						  })
						: undefined,
					maxPrice: this.form.maxPrice
						? slugify(this.form.maxPrice, {
								lower: true,
						  })
						: undefined,
				},
			})
		},
	},
}
</script>
