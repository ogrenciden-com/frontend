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
					{{ user.displayName }}
				</div>
				<v-avatar size="38">
					<v-img :src="user.photoURL"></v-img>
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
					function: this.userToggle,
					link: undefined,
				},
			],
		}
	},
	computed: {
		user() {
			return this.$store.state.user
		},
	},
	methods: {
		...mapMutations({
			advertToggle: 'advertToggle',
			profileToggle: 'profileToggle',
			userToggle: 'userToggle',
		}),
	},
}
</script>
