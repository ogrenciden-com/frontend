<template>
	<div ref="cardContainer">
		<v-dialog
			v-model="model"
			max-width="680"
			width="100%"
			@click:outside="closeModal"
			@keydown.esc="closeModal"
		>
			<profile-modal />
		</v-dialog>
	</div>
</template>
<script>
// import { mapMutations } from 'vuex'
import ProfileModal from '@/components/ProfileModal.vue'

export default {
	components: {
		ProfileModal,
	},
	middleware: 'auth',
	data() {
		return {
			model: true,
		}
	},

	methods: {
		closeModal() {
			this.$router.replace('/')
		},
	},
}
</script>
