<template>
	<v-select
		v-model="item"
		:items="items"
		:label="label"
		:outlined="outlined"
		:class="classes"
		background-color="secondary"
		color="darkGrey"
		hide-details
		flat
		solo
		dense
		@change="updateValue"
	></v-select>
</template>
<script>
export default {
	props: {
		items: {
			type: Array,
			default: undefined,
		},
		value: {
			type: String,
			default: '',
		},
		height: {
			type: [String, Number],
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		classes: {
			type: String,
			default: 'mb-8',
		},
		outlined: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			item: '',
		}
	},
	watch: {
		value(val) {
			this.item = val
		},
	},
	created() {
		if (this.value) {
			this.item = this.value
		}
	},

	methods: {
		updateValue(value) {
			this.$emit('input', value)
		},
	},
}
</script>
