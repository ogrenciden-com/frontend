<template>
  <v-sheet outlined color="darkGrey" rounded max-width="232px">
    <v-card outlined color="secondary" flat class="px-2 py-3">
      <v-carousel
        v-model="model"
        hide-delimiters
        show-arrows-on-hover
        touch
        height="190"
      >
        <v-carousel-item v-for="link in links" :key="link">
          <v-img
            width="210"
            height="190"
            class="mx-auto rounded"
            :src="link"
          ></v-img>
        </v-carousel-item>
      </v-carousel>

      <v-card-title class="pa-0 pt-1 text-body-2 font-weight-medium">
        İyi durumda damacana pompası
      </v-card-title>
      <v-card-subtitle
        class="pa-0 pt-3 text-caption font-weight-medium dark-grey--text"
      >
        Ev eşyası
      </v-card-subtitle>
      <v-card-subtitle
        class="pa-0 pt-2 text-body-1 font-weight-bold primary--text"
      >
        250 TL
      </v-card-subtitle>
      <v-card-text
        class="
          pa-0
          pt-1
          text-caption
          font-weight-light
          dark-grey--text
          d-flex
          align-center
          justify-space-between
        "
      >
        <span>Farabi</span>
        <v-btn icon @click="saveFavorite = !saveFavorite">
          <v-icon color="red"
            >{{ saveFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      saveFavorite: false,
      model: 0,
      links: [
        'https://img.letgo.com/images/55/f6/84/55/55f684554bf3a8e081f43c75b99e1c99.jpeg?impolicy=img_384',
        'https://img.letgo.com/images/b2/a2/56/33/b2a25633c0a006d317ac510297d9dd7f.jpeg?impolicy=img_384',
        'https://img.letgo.com/images/29/b2/43/1b/29b2431b61a851c7fd9b347f886ef18c.jpeg?impolicy=img_256',
        'https://img.letgo.com/images/a8/1d/ba/ab/a81dbaab44ec87ba295d550d0f518aea.jpeg?impolicy=img_256',
      ],
    }
  },
}
</script>