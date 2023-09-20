<template>
  <RouterLink class="logo" to="/">
    <Blob />
  </RouterLink>
</template>

<script setup lang="ts">
import Blob from "@/components/Blob.vue";
import { RouterLink } from "vue-router";
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
