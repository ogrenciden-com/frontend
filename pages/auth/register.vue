<template>
  <v-card
    flat
    color="white"
    rounded="lg"
    max-width="410"
    width="100%"
    height="600"
    class="px-4 py-2"
  >
    <v-card-title class="justify-center mt-8">
      <brand-logo />
    </v-card-title>
    <v-btn
      outlined
      color="primary"
      width="100%"
      class="font-weight-bold mt-2 text-transform-none"
      :style="{ position: 'relative' }"
    >
      <google-icon :style="{ position: 'absolute', left: '4px' }" />
      Google ile giriş yap</v-btn
    >
    <div class="mt-8 mb-2">
      <v-divider></v-divider>
      <span
        class="text-caption darkGrey--text white px-2"
        :style="{ position: 'relative', top: '-13px', left: '170px' }"
        >Veya</span
      >
    </div>
    <form>
      <div>
        <v-text-field
          v-model="form.name"
          outlined
          solo
          flat
          placeholder="Ad"
          height="32"
          color="darkGrey"
          class="text-body-2 mb-5"
          type="text"
          dense
          hide-details
        >
        </v-text-field>
        <v-text-field
          v-model="form.lastname"
          outlined
          solo
          flat
          placeholder="Soyad"
          height="32"
          color="darkGrey"
          class="text-body-2 mb-5"
          type="text"
          dense
          hide-details
        >
        </v-text-field>
      </div>
      <v-text-field
        v-model="form.email"
        outlined
        solo
        flat
        placeholder="Lütfen E-posta adresinizi girin"
        height="32"
        color="darkGrey"
        class="text-body-2 mb-5"
        type="email"
        dense
        hide-details
      >
        <template slot="append">
          <mail-icon />
        </template>
      </v-text-field>
      <v-text-field
        outlined
        solo
        flat
        placeholder="Lütfen şifrenizi oluşturunuz."
        v-model="form.password"
        :append-icon="isShow ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        height="32"
        color="darkGrey"
        class="text-body-2"
        :type="isShow ? 'text' : 'password'"
        dense
        hide-details
        @click:append="isShow = !isShow"
      >
      </v-text-field>
      <div class="d-flex justify-center mt-8">
        <v-btn
          class="text-body-1 font-weight-bold text-transform-none py-6 px-10"
          color="primary"
          elevation="0"
          @click="submit()"
        >
          Giriş yap
        </v-btn>
      </div>
    </form>
    <span
      class="text-body-2 font-weight-bold"
      :style="{ position: 'absolute', bottom: '30px' }"
    >
      Hesabın var mı?
      <nuxt-link to="/auth/login" class="primary--text text-decoration-none">
        Giriş yap.
      </nuxt-link>
    </span>
  </v-card>
</template>
<script>
import MailIcon from '@/components/Icons/MailIcon.vue'
import EyeIcon from '@/components/Icons/EyeIcon.vue'
import EyeHiddenIcon from '@/components/Icons/EyeHiddenIcon.vue'
import BrandLogo from '@/components/BrandLogo.vue'
import GoogleIcon from '@/components/Icons/GoogleIcon.vue'

export default {
  layout: 'auth',
  components: {
    BrandLogo,
    MailIcon,
    GoogleIcon,
    EyeHiddenIcon,
    EyeIcon,
  },
  data() {
    return {
      isShow: false,
      form: {
        name: '',
        lastname: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    submit() {
      console.log(this.form)
    },
  },
}
</script>

<style>
.text-transform-none {
  text-transform: none !important;
}
</style>