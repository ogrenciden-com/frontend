<template>
	<span v-if="false" />
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
		description: {
			type: String,
			default: null,
		},
		image: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			path: '',
		}
	},
	head() {
		const image = this.image || 'https://i.ibb.co/kXTJ1cW/ogrenciden.png'

		return {
			meta: [
				this.title !== null
					? {
							hid: 'twitter:title',
							name: 'twitter:title',
							content: this.title,
					  }
					: {},
				this.description !== null
					? {
							hid: 'twitter:description',
							name: 'twitter:description',
							content: this.description,
					  }
					: {},
				{
					hid: 'twitter:image',
					name: 'twitter:image',
					content: image,
				},
				this.title !== null
					? {
							hid: 'twitter:image:alt',
							name: 'twitter:image:alt',
							content: this.title,
					  }
					: {},
				{
					hid: 'og:type',
					property: 'og:type',
					content: 'website',
				},
				this.title !== null
					? {
							hid: 'og:title',
							property: 'og:title',
							content: this.title,
					  }
					: {},
				this.description !== null
					? {
							hid: 'og:description',
							property: 'og:description',
							content: this.description,
					  }
					: {},

				{
					hid: 'og:image',
					property: 'og:image',
					content: image,
				},
				{
					hid: 'og:image:secure_url',
					property: 'og:image:secure_url',
					content: image,
				},
				this.title !== null
					? {
							hid: 'og:image:alt',
							property: 'og:image:alt',
							content: this.title,
					  }
					: {},
				{
					hid: 'og:site_name',
					property: 'og:site_name',
					content: 'Ogrenciden',
				},
			],
		}
	},
	// methods: {
	// 	pathUrl() {
	// 		this.path = this.image.split('/').splice(3, 7).join('/')
	// 		return this.path
	// 	},
	// },
}
</script>
