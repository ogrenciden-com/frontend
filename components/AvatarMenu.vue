<template>
	<v-menu offset-y>
		<template #activator="{ on, attrs }">
			<v-btn
				color="primary"
				outlined
				elevation="0"
				height="48"
				class="rounded-lg pr-2 pl-3"
				v-bind="attrs"
				v-on="on"
			>
				<div
					class="font-weight-bold black--text mr-2 d-none d-md-block text-transform-none"
				>
					{{ !loading && user.name }}
					{{ !loading && user.surname }}
				</div>
				<v-avatar size="38" color="primary" class="white--text">
					<!-- <v-img :src="user.photoURL"></v-img> -->
					<!-- <v-img
						src="https://pbs.twimg.com/profile_images/1322853331073671169/bcNaQF8Y_400x400.jpg"
					></v-img> -->
					<span>
						<!-- {{ user?.name.slice(0, 1) }}
						{{ user?.surname.slice(0, 1) }} -->
						ÖA
					</span>
				</v-avatar>
			</v-btn>
		</template>
		<v-card elevation="0">
			<v-list>
				<v-sheet
					height="1"
					width="129"
					color="secondary"
					class="ml-4"
				></v-sheet>
				<template v-for="item in menuItems">
					<div :key="item.id">
						<v-list-item
							color="primary"
							dense
							:style="{
								textAlign: 'center',
								fontSize: '14px',
							}"
							:to="item.link"
							@click="item.function"
						>
							<span class="mx-auto"> {{ item.text }} </span>
						</v-list-item>
						<v-sheet
							height="1"
							width="129"
							color="secondary"
							class="ml-4"
						></v-sheet>
					</div>
				</template>
			</v-list>
		</v-card>
	</v-menu>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
	data() {
		return {
			menuItems: [
				{
					id: 0,
					text: 'Profil Düzenle',
					function: this.profileToggle,
					link: '/profile',
				},
				{
					id: 1,
					text: 'İlanlarım',
					function: () => {},
					link: '/my-ads',
				},
				{
					id: 2,
					text: 'Favorilerim',
					function: () => {},
					link: '/favorite',
				},
				{
					id: 3,
					text: 'İlan oluştur',
					function: this.advertToggle,
					link: undefined,
				},
				{
					id: 4,
					text: 'Çıkış Yap',
					function: () => {},
					link: '/auth/login',
				},
			],
			user: {},
			loading: false,
		}
	},
	created() {
		this.getUser()
	},
	methods: {
		...mapMutations({
			advertToggle: 'advertToggle',
			profileToggle: 'profileToggle',
			userToggle: 'userToggle',
		}),
		async getUser() {
			try {
				this.loading = true
				const data = await this.$axios.$get(
					'auth/6287f917008193cfe442094e',
				)
				this.user = { ...data }
				// this.$router.push('/')
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e)
				this.$nuxt.error({ e })
			} finally {
				this.loading = false
			}
		},
	},
}
</script>
