<template>
	<v-sheet outlined rounded>
		<v-skeleton-loader
			class="pa-3"
			:min-width="card ? 232 : 398"
			:height="card ? 344 : 120"
			:type="
				card
					? 'card,list-item-three-line'
					: 'heading,  list-item-three-line'
			"
		></v-skeleton-loader>
	</v-sheet>
</template>
<script>
export default {
	props: {
		card: {
			type: Boolean,
			default: true,
		},
	},
}
</script>
