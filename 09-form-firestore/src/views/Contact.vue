<template>
  <!-- on récupère l'information en paramètre de la route contact dans router/index.js -->
  <!-- ( SI on rentre dans l'url : http://localhost:8082/contact/1
Alors ça affiche contact 1 ) -->
  <div>contact {{ $route.params.id }}</div>
</template>

<script>
export default {};
</script>

<style></style>
