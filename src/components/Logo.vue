<template>
  <RouterLink class="logo" to="/">
    <!-- <Blob /> -->
    <!-- <img src="@/assets/images/logo.webp" alt="logo" /> -->
    <img :src="svg" alt="my-logo" />
    <!-- <svg></svg> -->
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import Blob from "./Blob.vue";
import svg from "../assets/svg/blob.svg";
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
