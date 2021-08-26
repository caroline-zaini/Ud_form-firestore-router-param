<template>
  <div id="app">
    <router-link to="/">Accueil </router-link> -
    <router-link to="/about">About</router-link>
    <br /><br />
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.router-link-active {
  color: orange;
}
</style>
