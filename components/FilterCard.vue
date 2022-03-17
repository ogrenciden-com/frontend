<template>
  <v-card outlined flat class="px-5 py-3" width="100%">
    <!--sort -->
    <select-box
      :items="order"
      v-model="form.sort"
      label="Sıralama"
      classes="mb-8 text-caption text-md-body-2"
    />
    <!-- categories -->
    <select-box
      :items="items"
      v-model="form.category"
      label="Kategori"
      classes="mb-8 text-caption text-md-body-2"
    />
    <!-- university -->
    <select-box
      :items="university"
      v-model="form.universityName"
      label="Üniversite"
      classes="mb-8 text-caption text-md-body-2"
    />
    <!-- university autocomplete -->
    <!-- <v-autocomplete
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
    ></v-autocomplete> -->
    <!-- campuses -->
    <select-box
      classes="mb-8 text-caption text-md-body-2"
      :items="campuses"
      v-model="form.campus"
      label="Kampüs"
    />
    <!-- price inputs -->
    <div class="d-flex">
      <v-text-field
        v-model="form.minPrice"
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
        v-model="form.maxPrice"
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

    <v-btn color="primary" elevation="0" width="100%" @click="submit">
      Uygula
    </v-btn>
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
      form: {
        sort: '',
        category: '',
        universityName: '',
        campus: undefined,
        minPrice: undefined,
        maxPrice: undefined,
      },
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },
  watch: {
    'form.universityName'() {
      this.form.campus = undefined
      this.findCampusByUniversityName(this.form.universityName)
    },
  },

  methods: {
    ...mapMutations({
      findCampusByUniversityName:
        'UniversityAndCampus/findCampusByUniversityName',
    }),
    submit() {
      console.log(this.form)
    },
  },
  computed: {
    order() {
      return this.$store.state.Order?.list
    },
    university() {
      return this.$store.state.university?.list
    },
    campuses() {
      return this.$store.state.UniversityAndCampus?.selectedCampuses
    },
  },
}
</script>