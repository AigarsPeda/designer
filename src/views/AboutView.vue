<template>
  <div class="main">
    <button class="back-button" @click="gobBack">
      <ClArrowLeftLg class="back-button-icon" />
      Go back
    </button>
    <div class="main-info">
      <h1>This is project is created to learn Vue.js and canvas.</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ClArrowLeftLg } from "@kalimahapps/vue-icons";

const gobBack = () => {
  router.go(-1);
};
</script>

<style>
.back-button {
  border: none;
  display: flex;
  padding: 0.4rem 1rem;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: center;
  color: var(--color-background);
  border: 1.5px solid transparent;
  background-color: rgba(105, 101, 219, 1);
}

.back-button-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
  color: var(--color-background);
}

.main {
  padding: 1rem;
}

.main-info {
  margin-top: 1rem;
}

@media (hover: hover) {
  .back-button:hover {
    background-color: rgba(105, 101, 219, 0.8);
  }
}
</style>
