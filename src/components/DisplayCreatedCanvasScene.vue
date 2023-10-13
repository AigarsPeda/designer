<template>
  <div class="container">
    <p class="info">Saved scenes:</p>

    <TransitionGroup tag="ul" name="fade" class="canvas-container">
      <li
        v-for="(value, key) in storedCanvasSate.storedValue"
        :key="key"
        class="canvas-buttons-container"
      >
        <div class="img-container">
          <img
            v-if="storedScreenShots.storedValue[key.toString()]"
            alt="canvas screenshot"
            :src="storedScreenShots.storedValue[key.toString()]"
          />
        </div>
        <div class="canvas-option-container">
          <div class="canvas-description-container">
            <span class="info">Name</span>
            <span class="canvas-select-name">{{ key }}</span>
          </div>
          <div class="canvas-button-container">
            <button class="button" @click="handleCanvasLoad(key.toString())">
              <AkDownload class="icon" />
              <span class="button-text">Load</span>
            </button>
            <button class="delete" @click="handleDelete(key.toString())">
              <AnOutlinedDelete class="icon" />
              <span class="button-text">Delete</span>
            </button>
          </div>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import { AkDownload, AnOutlinedDelete } from "@kalimahapps/vue-icons";

const emit = defineEmits<{
  (e: "new-canvas-loaded", canvasName: string): void;
}>();

const { storedCanvasSate, storedScreenShots, storedSelectedCanvasName } =
  useLocalStorageCanvas();

const handleDelete = (str: string) => {
  const { [str]: __, ...restScreenShots } = storedScreenShots.storedValue;
  storedScreenShots.updateValue(restScreenShots);

  const { [str]: _, ...rest } = storedCanvasSate.storedValue;
  storedCanvasSate.updateValue(rest);
};

const handleCanvasLoad = (str: string) => {
  storedSelectedCanvasName.updateValue(str);
  emit("new-canvas-loaded", str);
};
</script>

<style scoped>
.info {
  font-weight: 500;
  color: #64748b;
  font-size: 0.6rem;
}

.canvas-container {
  gap: 0.5rem;
  width: 100%;
  display: flex;
  overflow-y: auto;
  max-height: 20rem;
  place-items: start;
  position: relative;
  flex-direction: column;
}

.canvas-buttons-container {
  margin: 0;
  padding: 0;
  width: 100%;
  border: none;
  display: flex;
  text-align: left;
  transition: 0.4s;
  min-height: 100px;
  flex-direction: row;
  border-radius: 0.5rem;
  background-color: var(--color-background-soft);
}

.canvas-buttons-container:hover {
  background-color: var(--color-background-soft);
}

.img-container {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 0.5rem;
  border: var(--vt-c-text-light-1) 1px solid;
}

.img-container img {
  margin: 0rem;
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 0.5rem;
  background-color: var(--color-background);
}

.canvas-button-container {
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  padding: 0rem 0rem 0rem 0.5rem;
  justify-content: space-between;
}

.canvas-option-container {
  display: flex;
  padding: 0.5rem 0rem;
  flex-direction: column;
  justify-content: space-between;
}

.canvas-description-container {
  display: flex;
  padding: 0rem 0.5rem;
  flex-direction: column;
}

.icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}

.button {
  border: none;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #8b5cf6;
  color: var(--color-background);
  border: 1.5px solid transparent;
}

.delete {
  border: none;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #ef4444;
  color: var(--color-background);
  border: 1.5px solid transparent;
}

.button-text {
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--color-background);
}

.canvas-select-name {
  font-size: 1rem;
  font-weight: 500;
}

.container {
  gap: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleX(0.01) translateX(100%);
}

.fade-leave-active {
  position: absolute;
}
</style>
