<template>
  <div class="button-container">
    <button class="back-button" @click="handleBackButtonClick">
      <BxArrowBack class="icon" />
      Back
    </button>
  </div>
  <div class="container">
    <div class="canvas-container-side"></div>
    <div class="settings-container-side">
      <p class="title">Export image:</p>
      <div class="settings-container">
        <p class="info">All setting</p>
        <p class="info">All setting</p>
        <p class="info">All setting</p>
      </div>
      <div class="settings-button-container">
        <button class="button" @click="console.log('--->')">
          <AkDownload class="icon" />
          PNG
        </button>
        <button class="button" @click="console.log('--->')">
          <AkDownload class="icon" />
          SVG
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BxArrowBack, AkDownload } from "@kalimahapps/vue-icons";

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
.canvas-container-side {
  width: 100%;
  height: 305px;
  border-radius: 5px;
  position: relative;
  background-color: #fff;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
}

.back-button {
  border: none;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  background-color: transparent;
}

.settings-button-container {
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0rem;
  justify-content: flex-start;
}

.settings-container {
  gap: 0.5rem;
  height: 100%;
  display: flex;
  padding: 0.5rem 0rem;
  flex-direction: column;
  justify-content: flex-start;
}

.button {
  border: none;
  display: flex;
  padding: 0.5rem;
  color: #343d4a;
  align-items: center;
  border-radius: 0.5rem;
  border: 1.5px solid transparent;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
}

.settings-container-side {
  width: 100%;
  display: flex;
  padding-left: 1rem;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--color-text);
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
