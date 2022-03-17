<template>
  <v-app>
    <v-container>
      <v-main>
        <nuxt-link to="/">
          <brand-logo
            class="d-flex justify-start mx-auto mt-6 mb-4 d-sm-none ma-sm-0"
          />
        </nuxt-link>
        <v-app-bar width="1157" color="white" height="72" elevation="0">
          <!-- 
            TODO
            logo tasarımları geldiğinde 
            küçük logo ve büyük logo olarak iki farklı şekilde yapki 
            responsive tasarımda düzgün görünsün
           -->
          <nuxt-link to="/" class="mr-lg-10 mr-3">
            <brand-logo class="d-none d-sm-block" />
          </nuxt-link>
          <search-box class="mr-lg-12 mr-3" />
          <v-btn
            color="primary"
            height="48"
            width="150"
            elevation="0"
            class="rounded-lg d-none d-sm-flex mr-7"
            @click="advertToggle"
            >İlan oluştur</v-btn
          >
          <avatar-menu v-if="isThereUser" />
          <v-btn
            v-else
            outlined
            nuxt
            to="/auth/login"
            color="primary"
            height="48"
            elevation="0"
            class="rounded-lg"
            >Giriş yap / Kayıt ol</v-btn
          >
        </v-app-bar>
        <v-sheet
          height="2px"
          color="secondary"
          :style="{ marginBottom: '100px' }"
        ></v-sheet>
        <v-btn
          v-scroll="onScroll"
          v-show="fab"
          fab
          dark
          fixed
          bottom
          right
          color="primary"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-dialog
          v-model="advertModal"
          max-width="680"
          width="100%"
          @click:outside="advertToggle"
          @keydown.esc="advertToggle"
        >
          <advert-modal />
        </v-dialog>
        <Nuxt />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import BrandLogo from '@/components/BrandLogo.vue'
import SearchBox from '@/components/SearchBox.vue'
import AvatarMenu from '@/components/AvatarMenu.vue'
import AdvertModal from '@/components/AdvertModal.vue'
import LoginModal from '@/components/LoginModal.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'DefaultLayout',
  components: {
    BrandLogo,
    SearchBox,
    AvatarMenu,
    AdvertModal,
    LoginModal,
  },
  data() {
    return {
      isThereUser: true,
      fab: false,
    }
  },
  methods: {
    ...mapMutations({
      advertToggle: 'advertToggle',
    }),
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
  },
  computed: {
    advertModal() {
      return this.$store.state.advertModal
    },
  },
}
</script>
