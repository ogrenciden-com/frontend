<template>
  <v-app class="myFont">
    <v-container>
      <v-main>
        <v-app-bar width="1157" color="white" height="72" elevation="0">
          <!-- 
            TODO
            logo tasarımları geldiğinde 
            küçük logo ve büyük logo olarak iki farklı şekilde yapki 
            responsive tasarımda düzgün görünsün
           -->
          <nuxt-link to="/" class="mr-lg-10 mr-3">
            <brand-logo class="d-block" />
          </nuxt-link>
          <search-box class="mr-lg-12 mr-3" />
          <v-btn
            color="primary"
            height="48"
            width="150"
            elevation="0"
            class="rounded-lg d-none d-sm-flex mr-7"
            @click="advertModal = !advertModal"
            >İlan oluştur</v-btn
          >
          <avatar-menu v-if="isThereUser" />
          <v-btn
            v-else
            outlined
            color="primary"
            height="48"
            elevation="0"
            class="rounded-lg"
            @click="loginModal = !loginModal"
            >Giriş yap / Kayıt ol</v-btn
          >
        </v-app-bar>
        <v-sheet
          height="2px"
          color="secondary"
          :style="{ marginBottom: '100px' }"
        ></v-sheet>
        <v-dialog v-model="advertModal" max-width="680" width="100%">
          <advert-modal />
        </v-dialog>
        <v-dialog
          v-model="loginModal"
          max-width="1000"
          class="rounded-xl"
          hide-overlay
        >
          <login-modal />
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
      advertModal: false,
      isThereUser: false,
      loginModal: false,
    }
  },
}
</script>
<style >
.myFont {
  font-family: 'Oxygen';
}
</style>

</style>