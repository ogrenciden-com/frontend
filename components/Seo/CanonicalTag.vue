<template>
	<span v-if="false" />
</template>

<script>
export default {
	props: {
		path: {
			type: String,
			default: '',
		},
	},
	head() {
		return {
			link: [
				{
					rel: 'canonical',
					href: `https://www.ogrenciden.co/${this.path}`,
				},
			],
		}
	},
}
</script>
