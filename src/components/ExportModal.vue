<template>
  <div class="button-container">
    <button class="button" @click="handleBackButtonClick">
      <BxArrowBack class="icon" />
      Back
    </button>
  </div>
  <div class="container">
    <div class="canvas-container"></div>
    <div class="settings-container">
      <h1>Under construction {{ selectedCanvasName }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BxArrowBack } from "@kalimahapps/vue-icons";

defineProps<{
  selectedCanvasName: string;
  handleBackButtonClick: () => void;
}>();
</script>

<style scoped>
.button-container {
  display: flex;
  padding-bottom: 1rem;
}
.container {
  display: grid;
  gap: 1rem;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-columns: repeat(auto-fit, minmax(300px, 35%));
}
.canvas-container {
  width: 100%;
  height: 305px;
  border-radius: 5px;
  position: relative;
  background-color: #fff;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
}

.button {
  border: none;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  background-color: transparent;
}

.settings-container {
  width: 100%;
  padding-left: 1rem;
}

.icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}

/* Desktop */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
</style>
