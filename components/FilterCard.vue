<template>
  <v-card outlined flat class="px-5 py-3" width="100%">
    <select-box :items="items" label="Sıralama" />
    <select-box
      :items="university"
      label="Üniversite"
      v-model="universityName"
      classes="mb-8 text-caption text-md-body-2"
    />
    <select-box :items="campuses" v-model="campus" label="Kampüs" />

    <div class="d-flex">
      <v-text-field
        placeholder="En Az"
        class="mb-8 mr-1 text-left"
        type="currency"
        append-icon="mdi-currency-try"
        background-color="white"
        color="darkGrey"
        hide-details
        hide-spin-buttons
        flat
        reverse
        dense
        outlined
      ></v-text-field>
      <v-text-field
        placeholder="En Çok"
        append-icon="mdi-currency-try"
        class="mb-8 ml-1"
        type="number"
        reverse
        outlined
        flat
        hide-details
        hide-spin-buttons
        dense
        background-color="white"
        color="darkGrey"
      ></v-text-field>
    </div>
    <select-box :items="items" label="Kategori" />

    <v-btn color="primary" elevation="0" width="100%"> Uygula </v-btn>
  </v-card>
</template>
<script>
import SelectBox from '@/components/SelectBox.vue'

import { mapMutations } from 'vuex'

export default {
  components: {
    SelectBox,
  },
  data() {
    return {
      universityName: '',
      campus: '',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },
  watch: {
    universityName() {
      this.findCampusByUniversityName(this.universityName)
    },
  },
  methods: {
    ...mapMutations({
      findCampusByUniversityName:
        'UniversityAndCampus/findCampusByUniversityName',
    }),
  },
  computed: {
    university() {
      return this.$store.state.university.list
    },
    campuses() {
      return this.$store.state.UniversityAndCampus.selectedCampuses
    },
  },
}
</script>