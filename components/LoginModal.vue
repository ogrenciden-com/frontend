<template>
  <v-card flat color="primary" max-width="1000" width="100%" height="750">
    <div class="d-flex justify-space-between fill-height">
      <v-sheet class="primary" max-width="495" :style="{ zIndex: '10' }">
        <icon-vektor class="mt-16" />
      </v-sheet>
      <v-card
        max-width="505"
        width="100%"
        height="100%"
        rounded="0"
        flat
        class="pr-5"
      >
        <div class="d-flex justify-space-between align-center">
          <v-spacer></v-spacer>
          <v-btn class="mt-3" icon>
            <v-icon color="black">mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="ml-16">
          <v-card-title class="text-h5 font-weight-bold">
            Giriş yap
          </v-card-title>
          <brand-logo class="ml-4 mt-10 d-block" />
          <v-btn
            outlined
            color="primary"
            width="100%"
            class="font-weight-bold mt-16"
            >Google ile giriş yap</v-btn
          >
          <span
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            minus totam deleniti quaerat! Ut molestias eos labore id numquam
            dolorum reiciendis adipisci recusandae rerum, iusto illum molestiae
            vero rem. Iste.</span
          >
        </div>
      </v-card>
    </div>
    <!-- <v-text-field
      
      solo
      background-color="secondary"
      placeholder="İlan başlığı giriniz."
      height="42"
      color="darkGrey"
      dense
      hide-details
    ></v-text-field> -->
  </v-card>
</template>

<script>
import IconVektor from '@/components/Icons/IconVektor.vue'
import BrandLogo from '@/components/BrandLogo.vue'
export default {
  components: {
    IconVektor,
    BrandLogo,
  },
}
</script>