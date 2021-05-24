<template>
  <v-app>
    <v-system-bar dark color="primary">
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>
<!--
    <v-app-bar app color="primary" dark dense>
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
-->
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style>
html {
  overflow: hidden !important;
}
</style>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
