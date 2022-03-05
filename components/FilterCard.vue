<template>
  <v-card outlined flat class="px-5 py-3" width="100%">
    <v-select
      :items="items"
      label="Sıralama"
      background-color="secondary"
      color="darkGrey"
      class="mb-8"
      hide-details
      flat
      solo
      dense
    ></v-select>
    <v-select
      :items="university"
      label="Üniversite"
      background-color="secondary"
      color="darkGrey"
      class="mb-8 text-caption"
      flat
      hide-details
      solo
      dense
    ></v-select>
    <v-select
      :items="items"
      label="Kampüs"
      background-color="secondary"
      color="darkGrey"
      class="mb-8"
      hide-details
      flat
      solo
      dense
    ></v-select>
    <div class="d-flex">
      <v-text-field
        placeholder="En Az"
        class="mb-8 mr-1 text-left"
        flat
        type="currency"
        hide-details
        hide-spin-buttons
        reverse
        append-icon="mdi-currency-try"
        dense
        outlined
        background-color="white"
        color="darkGrey"
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

    <v-select
      :items="items"
      label="Kategori"
      background-color="secondary"
      hide-details
      color="darkGrey"
      class="mb-8"
      flat
      solo
      dense
    ></v-select>
    <v-btn color="primary" elevation="0" width="100%"> Uygula </v-btn>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },
  computed: {
    university() {
      return this.$store.state.university.list
    },
  },
}
</script>