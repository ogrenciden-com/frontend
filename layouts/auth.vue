<template>
  <v-app>
    <v-container fluid class="fill-height d-flex justify-center gradient">
      <Nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'auth',
}
</script>

<style>
.gradient {
  background: rgb(45, 123, 240);
  background: linear-gradient(
    45deg,
    rgba(45, 123, 240, 1) 0%,
    rgba(9, 9, 121, 1) 51%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>