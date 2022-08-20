<template>
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
				<span class="text-caption darkGrey--text">
					Bu uygulama hala yapım aşamasındadır. <br />
					Olası hatalar olabilir.
				</span>
			</v-col>
			<v-col
				order="first"
				order-md="last"
				cols="9"
				class="col-12 col-md-9"
			>
				<v-row justify="space-between">
					<v-col
						v-for="(link, index) in sitemap"
						:key="index"
						cols="4"
						class="col-6 col-md-3 col-sm-6"
					>
						<ul
							v-for="(item, key) in link"
							:key="`item-${key}`"
							class="list"
						>
							<li
								v-if="item.isTitle"
								class="black--text text-decoration-none font-weight-medium"
							>
								{{ item.title }}
							</li>
							<li
								v-else
								class="darkGrey--text text-decoration-none text-body-2"
							>
								<nuxt-link
									v-if="
										!item.isExternalLink &&
										item.href !== undefined
									"
									:to="item.href"
									class="darkGrey--text text-decoration-none text-body-2"
								>
									{{ item.title }}
								</nuxt-link>
								<a
									v-else-if="item.href !== undefined"
									target="_blank"
									class="darkGrey--text text-decoration-none text-body-2"
									:href="item.href"
								>
									{{ item.title }}
								</a>
								<div
									v-else
									class="darkGrey--text text-decoration-none text-body-2 cursor-pointer"
									@click="item.function"
								>
									{{ item.title }}
								</div>
							</li>
						</ul>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-footer>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
	// props: {
	// 	userId: {
	// 		type: Object,
	// 		default: () => {},
	// 	},
	// },
	data() {
		return {
			sitemap: [
				[
					{
						title: 'Sayfalar',
						isTitle: true,
					},
					{
						title: 'Ana Sayfa',
						href: '/',
						function: undefined,
						isExternalLink: false,
					},
					{
						title: 'Profil Düzenle',
						href: undefined,
						function: this.profileToggle,
						isExternalLink: false,
					},
					{
						title: 'İlan ekle',
						href: undefined,
						function: this.advertToggle,
						isExternalLink: false,
					},
					// {
					// 	title: 'İlanlarım',
					// 	href: undefined,
					// 	function: undefined,
					// 	isExternalLink: false,
					// },
					{
						title: 'favorilerim',
						href: '/favorite',
						function: undefined,
						isExternalLink: false,
					},
				],
				[
					{
						title: 'Bizi takip edin',
						isTitle: true,
					},
					{
						title: 'Twitter',
						isExternalLink: true,
						href: 'https://twitter.com/_ahmet_cakir',
						function: undefined,
					},
					{
						title: 'Linkedin',
						isExternalLink: true,
						href: 'https://www.linkedin.com/in/aahmetcakir/',
						function: undefined,
					},
					{
						title: 'Instagram',
						isExternalLink: true,
						href: 'https://www.instagram.com/ahmetcakir.ac/',
						function: undefined,
					},
				],
				[
					{
						title: 'Hesap işlemleri',
						isTitle: true,
					},
					{
						title: 'Giriş yap',
						href: '/auth/login',
						function: undefined,
						isExternalLink: false,
					},
					{
						title: 'Kayıt ol',
						href: '/auth/register',
						function: undefined,

						isExternalLink: false,
					},
					{
						title: 'Şifremi unuttum',
						href: '/auth/forgot-password',
						function: undefined,

						isExternalLink: false,
					},
				],
			],
		}
	},
	methods: {
		...mapMutations({
			advertToggle: 'advertToggle',
			profileToggle: 'profileToggle',
		}),
	},
}
</script>
