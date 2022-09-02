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
				<template v-if="!loading">
					<div
						class="font-weight-bold black--text mr-2 d-none d-md-block text-transform-none"
					>
						{{ $auth.user.name }}
						{{ $auth.user.surname }}
					</div>
					<v-avatar size="38" color="primary" class="white--text">
						<span v-if="!$auth.user.profileImage">
							{{ $auth.user.name.slice(0, 1)
							}}{{ $auth.user.surname.slice(0, 1) }}
						</span>
						<img
							v-else
							:src="$auth.user.profileImage"
							:alt="$auth.user.name"
						/>
					</v-avatar>
				</template>
				<template v-else> yükleniyor... </template>
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
					<v-list-item
						:key="'item-' + item.id"
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
						:key="'sheet-' + item.id"
						height="1"
						width="129"
						color="secondary"
						class="ml-4"
					></v-sheet>
				</template>
			</v-list>
		</v-card>
	</v-menu>
</template>
<script>
import { mapMutations } from 'vuex'
/* eslint-disable  */
import jwt_decode from 'jwt-decode'
/* eslint-enable  */

export default {
	data() {
		return {
			loading: false,
			menuItems: [
				{
					id: 0,
					text: 'Profil Düzenle',
					function: this.profileToggle,
					link: undefined,
				},
				{
					id: 1,
					text: 'İlanlarım',
					function: () => {},
					link: '/my-ads/' + this.$auth.user.uid,
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
					function: this.logout,
					link: undefined,
				},
			],
		}
	},
	async fetch() {
		await this.getUser()
	},
	methods: {
		...mapMutations({
			advertToggle: 'advertToggle',
			profileToggle: 'profileToggle',
		}),
		async getUser() {
			try {
				this.loading = true
				const userId = jwt_decode(
					await this.$auth.strategy.token.get(),
				)?.user_id
				const userRef = this.$fire.firestore
					.collection('users')
					.doc(userId)

				const snapshot = await userRef.get()
				const doc = snapshot.data()
				const uid = userId
				const user = { uid, ...doc }
				this.$auth.setUser(user)
			} catch (error) {
				const statusCode = error.response?.status || 500
				/* eslint-disable  */
				console.log(statusCode)
				/* eslint-enable  */
			} finally {
				this.loading = false
			}
		},
		async logout() {
			try {
				await this.$fire.auth.signOut()
				this.$router.push('/auth/login')
			} catch (error) {
				console.error(error)
			}
		},
	},
}
</script>
