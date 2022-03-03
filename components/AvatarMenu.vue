<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        outlined
        elevation="0"
        height="48"
        class="rounded-lg pr-2 pl-2"
        :style="{ lineHeight: '18px' }"
        v-bind="attrs"
        v-on="on"
      >
        <div class="mr-2 font-weight-bold d-none d-md-block">Ahmet ÇAKIR</div>
        <v-avatar size="38">
          <v-img
            src="https://pbs.twimg.com/profile_images/1322853331073671169/bcNaQF8Y_400x400.jpg"
          ></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card elevation="0">
      <v-list class="text-center">
        <v-list-item
          color="primary"
          dense
          to="/profile"
          class="text-primary text-center"
        >
          Profil Düzenle
        </v-list-item>
        <v-sheet height="1" color="secondary"></v-sheet>
        <v-list-item color="primary" dense to="/ilan">
          İlan Oluştur
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          color="primary"
          dense
          to="/profile"
          class="text-primary text-center"
        >
          Profil Düzenle
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item color="primary" dense to="/ilan">
          İlan Oluştur
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
