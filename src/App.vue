<template>
  <v-app id="app">

      <router-view :key="$route.fullPath"/>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
