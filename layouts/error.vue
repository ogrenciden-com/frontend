<template>
	<v-app>
		<v-container class="d-flex justify-center">
			<div v-if="error.statusCode === 404">
				<h1
					class="d-block primary--text font"
					:style="{ fontSize: '200px' }"
				>
					404
				</h1>
				<span class="d-block text-h4 text-center font">
					{{ pageNotFound }}
				</span>
				<v-btn
					nuxt
					to="/"
					class="primary mt-10 d-flex justify-center text-transform-none font-weight-normal text-body-1"
					elevation="0"
				>
					Ana sayfaya dön
				</v-btn>
			</div>
			<div v-else>
				<h1
					class="d-block primary--text font"
					:style="{ fontSize: '200px' }"
				>
					500
				</h1>
				<span class="d-block text-h4 text-center font">
					{{ otherError }}
				</span>
				<v-btn
					nuxt
					to="/"
					class="primary mt-10 d-flex justify-center text-transform-none font-weight-normal text-body-1"
					elevation="0"
				>
					Ana sayfaya dön
				</v-btn>
			</div>
		</v-container>
	</v-app>
</template>

<script>
export default {
	name: 'EmptyLayout',
	layout: 'empty',
	props: {
		error: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			pageNotFound: 'Page Not Found',
			otherError: 'An error occurred',
		}
	},
	head() {
		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError
		return {
			title,
		}
	},
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

.font {
	font-family: 'Quicksand', sans-serif !important;
}
</style>
