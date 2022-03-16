<template>
  <v-card outlined flat class="px-5 py-3" width="100%">
    <select-box
      :items="items"
      label="Sıralama"
      classes="mb-8 text-caption text-md-body-2"
    />
    <select-box
      :items="university"
      v-model="universityName"
      label="Üniversite"
      classes="mb-8 text-caption text-md-body-2"
    />

    <v-autocomplete
      :items="university"
      v-model="universityName"
      label="Üniversite"
      class="mb-8 text-caption text-md-body-2"
      background-color="secondary"
      color="darkGrey"
      hide-details
      flat
      solo
      dense
    ></v-autocomplete>

    <select-box
      classes="mb-8 text-caption text-md-body-2"
      :items="campuses"
      v-model="campus"
      label="Kampüs"
    />

    <div class="d-flex">
      <v-text-field
        placeholder="En Az"
        class="mb-8 mr-1 text-caption text-md-body-2"
        type="number"
        append-icon="mdi-currency-try"
        background-color="white"
        color="darkGrey"
        dense
        hide-details
        hide-spin-buttons
        flat
        outlined
      ></v-text-field>
      <v-text-field
        placeholder="En Çok"
        append-icon="mdi-currency-try"
        class="mb-8 ml-1 text-caption text-md-body-2"
        type="number"
        outlined
        flat
        hide-details
        hide-spin-buttons
        dense
        background-color="white"
        color="darkGrey"
      ></v-text-field>
    </div>
    <select-box
      :items="items"
      label="Kategori"
      classes="mb-8 text-caption text-md-body-2"
    />

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