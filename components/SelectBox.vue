<template>
  <v-select
    :items="items"
    :label="label"
    background-color="secondary"
    color="darkGrey"
    :class="classes"
    hide-details
    flat
    solo
    dense
  ></v-select>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: undefined,
    },
    label: {
      type: String,
      default: '',
    },
    classes: {
      type: String,
      default: 'mb-8',
    },
  },
}
</script>