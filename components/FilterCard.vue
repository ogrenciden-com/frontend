<template>
	<v-card outlined flat class="px-5 py-3" width="100%">
		<!--order -->
		<select-box
			v-model="form.order"
			:items="order"
			item-text="name"
			item-value="slug"
			label="Sıralama"
			clearable
			classes="mb-4 mb-sm-8 text-caption text-md-body-2"
		/>
		<!-- categories -->
		<select-box
			v-model="form.category"
			:items="categories"
			item-text="name"
			item-value="slug"
			label="Kategori"
			clearable
			classes="mb-4 mb-sm-8 text-caption text-md-body-2"
		>
		</select-box>

		<!-- university -->
		<select-box
			v-model="form.universityName"
			:items="universities"
			item-text="name"
			item-value="slug"
			clearable
			label="Üniversite"
			classes="mb-4 mb-sm-8 text-caption text-md-body-2"
		/>
		<!-- campuses -->
		<select-box
			v-model="form.campus"
			:items="campuses"
			clearable
			item-text="name"
			item-value="slug"
			label="Kampüs"
			classes="mb-4 mb-sm-8 text-caption text-md-body-2"
		/>
		<!-- price inputs -->
		<div class="d-flex">
			<v-text-field
				v-model="form.minPrice"
				placeholder="En Az"
				class="mr-1 text-caption text-md-body-2"
				type="number"
				append-icon="mdi-currency-try"
				background-color="white"
				color="darkGrey"
				:rules="[rules.min]"
				dense
				hide-spin-buttons
				clearable
				flat
				outlined
			></v-text-field>
			<v-text-field
				v-model="form.maxPrice"
				placeholder="En Çok"
				append-icon="mdi-currency-try"
				class="ml-1 text-caption text-md-body-2"
				type="number"
				:rules="[rules.max]"
				outlined
				flat
				clearable
				hide-spin-buttons
				dense
				background-color="white"
				color="darkGrey"
			></v-text-field>
		</div>
		<v-btn
			class="text-transform-none mb-2 white--text font-weight-bold"
			elevation="0"
			color="red"
			width="100%"
			text
			@click="clearFilter"
		>
			Temizle
		</v-btn>

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
import { mapMutations } from 'vuex'

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
			rules: {
				min: (v) =>
					!(Number(v) > Number(this.form.maxPrice)) ||
					'Minimum fiyat maksimumdan büyük olamaz',
				max: (v) =>
					!(Number(v) <= Number(this.form.minPrice)) ||
					'Maksimum fiyat minimumdan küçük olamaz',
			},
		}
	},
	computed: {
		order() {
			return this.$store.state.Order?.list
		},
		categories() {
			return this.$store.state.Categories?.list
		},
		campuses() {
			return this.$store.state.UniversityAndCampus?.selectedCampuses
		},
		universities() {
			return this.$store.state.UniversityAndCampus?.universities
		},
	},
	watch: {
		'form.universityName'() {
			if (!this.form.universityName) return (this.form.campus = undefined)
			this.findCampusByUniversitySlug(this.form.universityName)
		},
	},
	created() {
		this.clearSelectedCampuses()
		// university router name
		if (this.$route.params.university) {
			this.form.universityName = this.$route.params.university
			this.findCampusByUniversitySlug(this.form.universityName)
		}
		// campus router name
		if (this.$route.params.campus) {
			this.form.campus = this.$route.params.campus
		}
		// category router name
		if (this.$route.params.category) {
			this.form.category = this.$route.params.category
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
			this.form.order = this.$route.query.order
		}
	},
	methods: {
		...mapMutations({
			findCampusByUniversitySlug:
				'UniversityAndCampus/findCampusByUniversitySlug',
			clearSelectedCampuses: 'UniversityAndCampus/clearSelectedCampuses',
		}),
		clearFilter() {
			this.form.order = undefined
			this.form.universityName = undefined
			this.form.campus = undefined
			this.form.category = undefined
			this.form.minPrice = undefined
			this.form.maxPrice = undefined
		},
		submit() {
			this.$router.push({
				name: 'Index',
				params: {
					university: this.form.universityName
						? slugify(this.form.universityName, {
								lower: true,
						  })
						: undefined,
					campus: this.form.campus
						? slugify(this.form.campus, {
								lower: true,
						  })
						: undefined,
					category: this.form.category
						? slugify(this.form.category, {
								lower: true,
						  })
						: undefined,
				},
				query: {
					text: this.$route.query.text || undefined,
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
