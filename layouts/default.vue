<template>
	<v-app>
		<v-container>
			<v-main class="customMarginBottom">
				<nuxt-link to="/" class="d-flex justify-center align-center">
					<brand-logo class="mt-6 mb-4 d-sm-none" />
				</nuxt-link>
				<v-app-bar width="1157" color="white" height="72" elevation="0">
					<nuxt-link to="/" class="mr-lg-10 mr-3">
						<brand-logo class="d-none d-sm-block" />
					</nuxt-link>
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
					<avatar-menu
						v-if="!loading && $auth.loggedIn"
						:user="user"
					/>
					<v-btn
						v-else
						outlined
						nuxt
						to="/auth/login"
						color="primary"
						height="48"
						elevation="0"
						class="rounded-lg text-transform-none"
						>Giriş yap / Kayıt ol</v-btn
					>
				</v-app-bar>
				<v-sheet height="2px" color="secondary" class="mb-10"></v-sheet>
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
				<v-dialog
					v-model="advertModal"
					:fullscreen="!$vuetify.breakpoint.smAndUp"
					max-width="680"
					width="100%"
					@click:outside="advertToggle"
					@keydown.esc="advertToggle"
				>
					<advert-modal />
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
				<Nuxt :key="$route.fullPath" />
			</v-main>
			<v-footer
				color="white"
				class="pb-8 pt-4 mx-auto"
				absolute
				padless
				max-width="1157"
			>
				<v-row justify="center">
					<v-col
						order="last"
						order-md="first"
						cols="3"
						class="col-12 col-md-3 mt-5 mt-md-0 pl-md-2 pl-10"
						align-self="center"
					>
						<brand-logo class="d-block mb-3" />
						<div class="text-body-2 darkGrey--text">
							{{ new Date().getFullYear() }} &copy;
							<span>Öğrenciden</span>
						</div>
					</v-col>
					<v-col
						order="first"
						order-md="last"
						cols="9"
						class="col-12 col-md-9"
					>
						<v-row justify="space-between">
							<v-col cols="4" class="col-6 col-md-3 col-sm-6">
								<ul class="list">
									<li>
										<span
											class="black--text text-decoration-none font-weight-medium"
											>Sayfalar</span
										>
									</li>
									<li>
										<nuxt-link
											to="/"
											class="darkGrey--text text-decoration-none text-body-2"
											>Ana Sayfa</nuxt-link
										>
									</li>
									<li>
										<nuxt-link
											to="/"
											class="darkGrey--text text-decoration-none text-body-2"
											>Profil Düzenle</nuxt-link
										>
									</li>
									<li>
										<nuxt-link
											to="/my-ads"
											class="darkGrey--text text-decoration-none text-body-2"
											>İlanlarım</nuxt-link
										>
									</li>
									<li>
										<nuxt-link
											to="/favorite"
											class="darkGrey--text text-decoration-none text-body-2"
											>Favorilerim</nuxt-link
										>
									</li>
								</ul>
							</v-col>
							<v-col cols="4" class="col-6 col-md-3 col-sm-6">
								<ul class="list">
									<li>
										<span
											class="black--text text-decoration-none font-weight-medium"
											>Bizi takip edin</span
										>
									</li>
									<li>
										<a
											href="https://twitter.com"
											target="_blank"
											class="darkGrey--text text-decoration-none text-body-2"
											>Twitter</a
										>
									</li>
									<li>
										<a
											href="https://linkedin.com"
											target="_blank"
											class="darkGrey--text text-decoration-none text-body-2"
											>Linkedin</a
										>
									</li>
									<li>
										<a
											href="https://instagram.com"
											target="_blank"
											class="darkGrey--text text-decoration-none text-body-2"
											>İnstagram</a
										>
									</li>
								</ul>
							</v-col>
							<v-col cols="4" class="col-6 col-md-3 col-sm-6">
								<ul class="list">
									<li>
										<span
											class="black--text text-decoration-none font-weight-medium"
											>Hesap İşlemleri</span
										>
									</li>
									<li>
										<nuxt-link
											to="/auth/login"
											class="darkGrey--text text-decoration-none text-body-2"
											>Giriş Yap</nuxt-link
										>
									</li>
									<li>
										<nuxt-link
											to="/auth/register"
											class="darkGrey--text text-decoration-none text-body-2"
											>Kayıt Ol</nuxt-link
										>
									</li>
									<li>
										<nuxt-link
											to="/auth/forgot-password"
											class="darkGrey--text text-decoration-none text-body-2"
											>Şifremi unuttum</nuxt-link
										>
									</li>
								</ul>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-footer>
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
export default {
	name: 'DefaultLayout',
	components: {
		BrandLogo,
		SearchBox,
		AvatarMenu,
		AdvertModal,
		ProfileModal,
	},
	data() {
		return {
			fab: false,
			user: {},
			loading: false,
			hasUser: false,
		}
	},
	async fetch() {
		await this.getUser()
	},

	computed: {
		advertModal() {
			return this.$store.state.advertModal
		},
		profileModal() {
			return this.$store.state.profileModal
		},
	},
	methods: {
		...mapMutations({
			advertToggle: 'advertToggle',
			profileToggle: 'profileToggle',
		}),
		async getUser() {
			try {
				this.loading = true
				const data = await this.$axios.$get('auth/me')

				this.user = { ...data }
				this.$auth.setUser(this.user)
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
			} finally {
				this.loading = false
			}
		},
		onScroll(e) {
			if (typeof window === 'undefined') return
			const top = window.pageYOffset || e.target.scrollTop || 0
			this.fab = top > 150
		},
	},
}
</script>
