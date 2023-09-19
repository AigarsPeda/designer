<template>
  <RouterLink class="logo" to="/">
    <img src="@/assets/images/logo.webp" alt="logo" />
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.logo {
  width: 100%;
  object-fit: cover;
}

.logo img {
  width: 100%;
  height: 100%;
  border-radius: 10%;
}
</style>
