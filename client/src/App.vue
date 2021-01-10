<template>
  <v-app>
    <v-app-bar app color="deep-purple darken-4" dark>
      <div class="d-flex align-center">
        <img style="width: 50px" src="@/assets/cat-64.png" alt="logo">
        <h1 class="pink--text text--accent-2">Kanbanya</h1>
      </div>
    </v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from '@/views/Home'

export default {
  name: 'App',

  components: { Home },

  data: () => ({
    //
  })
}
</script>
