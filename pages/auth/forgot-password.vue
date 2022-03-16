<template>
  <v-card
    flat
    color="white"
    rounded="lg"
    max-width="510"
    width="100%"
    height="210"
    class="px-4 py-2"
  >
    <v-card-title class="justify-center mt-2">
      <brand-logo />
    </v-card-title>
    <v-form>
      <v-text-field
        v-model="email"
        outlined
        autofocus
        solo
        flat
        placeholder="Lütfen E-posta adresinizi girin"
        height="32"
        color="darkGrey"
        class="text-body-2 mb-5 mt-5"
        type="email"
        dense
        hide-details
      >
        <template slot="append">
          <mail-icon />
        </template>
      </v-text-field>
      <!-- <small class="d-block">
        <nuxt-link
          to="/auth/login"
          class="
            primary--text
            text-decoration-underline text-caption
            font-weight-light
            mt-2
            text-right
          "
          >Giriş yap</nuxt-link
        >
      </small> -->
      <div class="d-flex justify-center mt-4">
        <v-btn
          class="text-body-1 text-transform-none py-4"
          width="100%"
          color="primary"
          elevation="0"
          @click="submit"
        >
          E-mail gönder
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script>
import MailIcon from '@/components/Icons/MailIcon.vue'
import EyeIcon from '@/components/Icons/EyeIcon.vue'
import EyeHiddenIcon from '@/components/Icons/EyeHiddenIcon.vue'
import BrandLogo from '@/components/BrandLogo.vue'
export default {
  layout: 'auth',
  components: {
    BrandLogo,
    MailIcon,
    EyeHiddenIcon,
    EyeIcon,
  },
  data() {
    return {
      email: '',
    }
  },
  methods: {
    submit() {
      console.log(this.email)
    },
  },
}
</script>

<style>
.text-transform-none {
  text-transform: none !important;
}
</style>