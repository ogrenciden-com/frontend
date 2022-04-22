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
					Ahmet ÇAKIR
				</div>
				<v-avatar size="38">
					<v-img
						src="https://pbs.twimg.com/profile_images/1322853331073671169/bcNaQF8Y_400x400.jpg"
					></v-img>
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
				<template v-for="(item, index) in menuItems">
					<div :key="index">
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
					text: 'Profil Düzenle',
					function: this.profileToggle,
					link: undefined,
				},
				{
					text: 'İlanlarım',
					function: () => {},
					link: '/my-ads',
				},
				{
					text: 'Favorilerim',
					function: () => {},
					link: '/favorite',
				},
				{
					text: 'İlan oluştur',
					function: this.advertToggle,
					link: undefined,
				},
				{
					text: 'Çıkış Yap',
					function: this.userToggle,
					link: undefined,
				},
			],
		}
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
