<template>
  <v-app>
    <v-container class="">
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
            >İlan oluştur</v-btn
          >
          <avatar-menu />
        </v-app-bar>
        <Nuxt />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import BrandLogo from '@/components/BrandLogo.vue'
import SearchBox from '@/components/SearchBox.vue'
import AvatarMenu from '@/components/AvatarMenu.vue'
export default {
  name: 'DefaultLayout',
  components: {
    BrandLogo,
    SearchBox,
    AvatarMenu,
  },
}
</script>
