<template>
	<v-app>
		<v-container>
			<v-main class="customMarginBottom">
				<nuxt-link to="/" class="d-flex justify-center align-center">
					<brand-logo class="mt-6 mb-4 d-sm-none" />
				</nuxt-link>
				<v-sheet class="text-center d-sm-none mt-n5">
					<span
						class="px-2 border rounded darkGrey--text text-caption"
					>
						Beta
					</span>
				</v-sheet>
				<v-app-bar width="1157" color="white" height="72" elevation="0">
					<div class="mr-lg-10 mr-3 d-none d-sm-flex">
						<nuxt-link to="/">
							<brand-logo />
						</nuxt-link>
						<v-sheet class="ml-1">
							<span
								class="px-1 border rounded darkGrey--text text-caption"
							>
								Beta
							</span>
						</v-sheet>
					</div>
					<search-box class="mr-lg-10 mr-3" />
					<v-btn
						color="primary"
						height="48"
						width="160"
						elevation="0"
						class="rounded-lg d-none d-sm-flex mr-7 font text-transform-none"
						@click="advertToggle"
						>İlan oluştur</v-btn
					>
					<client-only>
						<avatar-menu v-if="$auth.loggedIn" />
						<v-btn
							v-else
							outlined
							nuxt
							to="/auth/register"
							color="primary"
							height="48"
							elevation="0"
							class="rounded-lg text-transform-none"
							>Giriş yap / Kayıt ol</v-btn
						>
					</client-only>
				</v-app-bar>
				<v-sheet
					height="2px"
					color="secondary"
					class="mb-2 d-none d-sm-flex"
				></v-sheet>
				<v-btn
					v-show="fab"
					v-scroll="onScroll"
					fab
					dark
					fixed
					bottom
					right
					color="primary"
					@click="$vuetify.goTo(0)"
				>
					<v-icon>mdi-arrow-up</v-icon>
				</v-btn>
				<!-- advert modal -->
				<v-dialog
					v-model="advertModal"
					:fullscreen="!$vuetify.breakpoint.smAndUp"
					max-width="680"
					width="100%"
					@click:outside="advertToggle"
					@keydown.esc="advertToggle"
				>
					<advert-modal />
					<!-- profile modal -->
				</v-dialog>
				<v-dialog
					v-model="profileModal"
					:fullscreen="!$vuetify.breakpoint.smAndUp"
					max-width="680"
					width="100%"
					@click:outside="profileToggle"
					@keydown.esc="profileToggle"
				>
					<profile-modal />
				</v-dialog>
				<span
					v-if="$route.name === 'index'"
					class="mb-2 ml-1 text-caption darkGrey--text font-weight-light d-block"
					>Şu an
					<strong>{{ randomStudentCount }} öğrenci</strong> diğer
					öğrencilerin ilanını inceliyor</span
				>

				<Nuxt :key="$route.fullPath" class="mt-1 mt-sm-0" />
			</v-main>
			<the-footer />
		</v-container>
	</v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import BrandLogo from '@/components/BrandLogo.vue'
import SearchBox from '@/components/SearchBox.vue'
import AvatarMenu from '@/components/AvatarMenu.vue'
import AdvertModal from '@/components/AdvertModal.vue'
import ProfileModal from '@/components/ProfileModal.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
	name: 'DefaultLayout',
	components: {
		AvatarMenu,
		AdvertModal,
		BrandLogo,
		TheFooter,
		SearchBox,
		ProfileModal,
	},
	data() {
		return {
			fab: false,
			// user: {},
			loading: false,
		}
	},
	// async fetch() {
	// 	await this.getUser()
	// },

	computed: {
		advertModal() {
			return this.$store.state.advertModal
		},
		profileModal() {
			return this.$store.state.profileModal
		},
		randomStudentCount() {
			return Math.ceil(Math.random() * 15)
		},
	},
	methods: {
		...mapMutations({
			advertToggle: 'advertToggle',
			profileToggle: 'profileToggle',
		}),
		// async getUser() {
		// 	try {
		// 		this.loading = true
		// 		const data = await this.$axios.$get('auth/me')

		// 		this.user = { ...data }
		// 		this.$auth.setUser(this.user)
		// 	} catch (error) {
		// 		const statusCode = error.response?.status || 500
		// 		console.log(statusCode)
		// 	} finally {
		// 		this.loading = false
		// 	}
		// },
		onScroll(e) {
			if (typeof window === 'undefined') return
			const top = window.pageYOffset || e.target.scrollTop || 0
			this.fab = top > 150
		},
	},
}
</script>
<style scoped>
.border {
	border: 1px solid #a6a2a2 !important;
}
</style>
