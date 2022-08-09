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
					{{ $auth.user.name || user.name }}
					{{ $auth.user.surname || user.surname }}
				</div>
				<v-avatar size="38" color="primary" class="white--text">
					<span>
						{{
							(user.name && user.name.slice(0, 1)) ||
							$auth.user.name.slice(0, 1)
						}}{{
							(user.surname && user.surname.slice(0, 1)) ||
							$auth.user.surname.slice(0, 1)
						}}
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

export default {
	props: {
		user: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
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
					function: this.logout,
					link: `/`,
				},
			],
		}
	},
	methods: {
		...mapMutations({
			advertToggle: 'advertToggle',
			profileToggle: 'profileToggle',
		}),
		async logout() {
			try {
				await this.$auth.logout()
			} catch (error) {
				console.error(error)
			}
		},
	},
}
</script>
