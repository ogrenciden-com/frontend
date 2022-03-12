<template>
  <v-card flat rounded="lg" class="px-10">
    <div class="d-flex justify-space-between align-center">
      <div>
        <v-card-title class="px-0">Yeni ilan ekle</v-card-title>
        <v-card-subtitle class="px-0"
          >Bu formu kullanarak yeni bir ilan
          oluşturabilirsiniz.</v-card-subtitle
        >
      </div>
      <v-btn icon class="mr-n4 mt-n4" @click="advertToggle">
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
    </div>
    <form>
      <v-row>
        <v-col>
          <v-text-field
            outlined
            flat
            solo
            background-color="secondary"
            placeholder="İlan başlığı giriniz."
            height="42"
            color="darkGrey"
            dense
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field
            placeholder="Fiyat"
            append-icon="mdi-currency-try"
            type="number"
            reverse
            outlined
            flat
            hide-details
            hide-spin-buttons
            dense
            background-color="secondary"
            color="darkGrey"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <select-box label="Kategori" :outlined="true"></select-box>
          <!-- <v-text-field
            outlined
            flat
            solo
            background-color="secondary"
            placeholder="İlan başlığı giriniz."
            height="42"
            color="darkGrey"
            dense
            hide-details
          ></v-text-field> -->
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <select-box label="Şehir" :outlined="true"></select-box>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <select-box label="Üniversite" :outlined="true"></select-box>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <select-box label="Kampüs" :outlined="true"></select-box>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-text-field
            placeholder="(+90) İletişim bilgisi"
            type="number"
            outlined
            flat
            hide-details
            hide-spin-buttons
            dense
            background-color="secondary"
            color="darkGrey"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            auto-grow
            outlined
            flat
            placeholder="İlan açıklaması"
            background-color="white"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn
        color="primary"
        height="40"
        width="160"
        elevation="0"
        class="font-weight-bold mb-8"
        >Yayınla</v-btn
      >
    </form>
  </v-card>
</template>
<script>
import { mapMutations } from 'vuex'
import SelectBox from '@/components/SelectBox.vue'
export default {
  components: {
    SelectBox,
  },
  methods: {
    ...mapMutations({
      advertToggle: 'advertToggle',
    }),
  },
}
</script>