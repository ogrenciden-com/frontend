<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        outlined
        elevation="0"
        height="48"
        class="rounded-lg pr-3 pl-4"
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
      <v-list>
        <v-sheet
          height="1"
          width="129"
          color="secondary"
          class="ml-4"
        ></v-sheet>
        <v-list-item
          color="primary"
          dense
          to="/profile"
          :style="{
            color: '#2D7BF0',
            textAlign: 'center',
            fontSize: '14px',
          }"
        >
          <span class="mx-auto"> Profil Düzenle </span>
        </v-list-item>
        <v-sheet
          height="1"
          width="129"
          color="secondary"
          class="ml-4"
        ></v-sheet>
        <v-list-item
          color="primary"
          dense
          to="/ilan"
          :style="{
            color: '#2D7BF0',
            textAlign: 'center',
            fontSize: '14px',
          }"
        >
          <span class="mx-auto"> İlan oluştur </span>
        </v-list-item>
        <v-sheet
          height="1"
          width="129"
          color="secondary"
          class="ml-4"
        ></v-sheet>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
