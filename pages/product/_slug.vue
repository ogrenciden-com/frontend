<template>
	<div>
		<v-breadcrumbs
			class="pa-0 mb-2"
			divider=">"
			:items="items"
		></v-breadcrumbs>
		<v-sheet class="d-md-flex d-block" outlined rounded="lg">
			<v-carousel
				v-model="model"
				class="rounded"
				hide-delimiters
				show-arrows-on-hover
				:touch="{
					left: () => model++,
					right: () => model--,
				}"
				height="600"
			>
				<v-carousel-item v-for="link in links" :key="link">
					<v-img
						max-width="600"
						max-height="600"
						width="100%"
						height="100%"
						contain
						class="mx-auto rounded"
						:src="link"
					></v-img>
				</v-carousel-item>
			</v-carousel>
			<v-card
				max-width="530"
				width="100%"
				flat
				color="secondary"
				class="pl-5 rounded-r-lg rounded-l-0 mx-auto mx-md-0"
			>
				<v-card-subtitle
					class="font-weight-bold text-h6 black--text pl-0 pb-0"
				>
					Macbook Air M1 (2020)
				</v-card-subtitle>
				<v-card-title
					class="font-weight-bold text-h5 primary--text pl-0 pt-2 pb-0"
				>
					17.250 TL
				</v-card-title>
				<div class="text-body-2 darkGrey--text d-flex align-center">
					<span class="mr-1"> Teknoloji </span>
					<span class="font-weight-bold text-h6 mr-1"> • </span>
					<time class="text-caption font-weight-light"
						>19.02.2022</time
					>
				</div>
				<div class="text-body-2 darkGrey--text d-flex align-center">
					<span class="mr-1"> Bülent Ecevit Universitesi </span>
					<span class="font-weight-bold text-h6 mr-1"> • </span>
					<time class="font-weight-regular">Farabi</time>
				</div>
				<p class="text-body-2 mt-2 black--text">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Soluta, corporis adipisci. Eaque cumque illum provident quod
					iure dolorem cum laudantium reprehenderit possimus nulla
					neque hic repudiandae officiis, tempora perspiciatis saepe.
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Nesciunt quo facilis libero optio sequi, numquam velit
					soluta vel, aliquid a veritatis ipsam qui fugit temporibus
					dolore consequatur architecto sed iste?
				</p>
				<div class="pb-4 pb-sm-0 d-flex d-sm-inline align-center">
					<span class="text-caption darkGrey--text mr-4">
						Bu ilan 181 kez görüntülendi
					</span>
					<a
						:href="shareLink"
						data-action="share/whatsapp/share"
						target="_blank"
						class="text-decoration-none mr-2"
					>
						<v-icon>mdi-whatsapp</v-icon>
					</a>
					<v-icon>mdi-facebook</v-icon>
				</div>
			</v-card>
		</v-sheet>
	</div>
</template>
<script>
export default {
	data() {
		return {
			model: 0,
			links: [
				'https://img.letgo.com/images/6e/77/b0/0f/6e77b00fe56972c0ffbeb3a7edba1b8a.jpg?impolicy=img_600',
				'https://img.letgo.com/images/59/7b/f0/19/597bf019424a92bbb974cf7e43e91542.jpg?impolicy=img_600',
				'https://img.letgo.com/images/d1/69/60/c7/d16960c77899a052da7de378ff68f663.jpg?impolicy=img_600',
			],
			items: [
				{
					text: 'Dashboard',
					disabled: false,
					href: 'breadcrumbs_dashboard',
				},
				{
					text: 'Link 1',
					disabled: false,
					href: 'breadcrumbs_link_1',
				},
				{
					text: 'Link 2',
					disabled: true,
					href: 'breadcrumbs_link_2',
				},
			],
		}
	},
	computed: {
		shareLink() {
			return `whatsapp://send?text=https://frontend-git-dev-aahmetcakir.vercel.app${this.$route.fullPath}`
		},
	},
}
</script>
