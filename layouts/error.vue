<template>
	<v-app>
		<v-container class="d-flex justify-center font">
			<div v-if="error.statusCode === 404">
				<h1
					class="d-block primary--text font-weight-regular"
					:style="{ fontSize: '200px' }"
				>
					404
				</h1>
				<span class="d-block text-h4 text-center black--text">
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
					class="d-block primary--text font-weight-regular"
					:style="{ fontSize: '200px' }"
				>
					500
				</h1>
				<span class="d-block text-h4 text-center black--text">
					{{ otherError }}
				</span>
				<v-btn
					class="primary mt-10 d-flex justify-center text-transform-none font-weight-normal text-body-1 mx-auto"
					elevation="0"
					nuxt
					to="/"
					@click="$router.go(0)"
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
			pageNotFound: 'Sayfa bulunamadı',
			otherError: 'Bir hata meydana geldi',
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
