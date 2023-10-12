<template>
  <button type="button" class="settings-button" @click="showModal">
    {{ storedSelectedCanvasName.storedValue }}
    <span class="settings-button-icon">
      <CaSettings />
    </span>
  </button>

  <Modal :closeModal="closeModal" :isShowModal="isShowModal">
    <template #modal-content>
      <RouterLink class="link" to="/about">About</RouterLink>
      <div class="container">
        <p class="info">Saved Canvas:</p>
        <div class="canvas-container">
          <div
            v-for="(value, key) in storedCanvasSate.storedValue"
            :key="key"
            class="canvas-buttons-container"
          >
            <img
              v-if="storedScreenShots.storedValue"
              alt="canvas screenshot"
              :src="storedScreenShots.storedValue[key.toString()]"
            />
            <div class="canvas-option-container">
              <div class="canvas-description-container">
                <span class="info">Name</span>
                <span class="canvas-select-name">{{ key }}</span>
              </div>
              <div class="canvas-button-container">
                <button
                  class="button"
                  @click="handleCanvasLoad(key.toString())"
                >
                  <AkDownload class="icon" />
                  <span class="button-text">Load</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";

import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import { AkDownload, CaSettings } from "@kalimahapps/vue-icons";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isShowModal = ref(false);
const { storedCanvasSate, storedScreenShots, storedSelectedCanvasName } =
  useLocalStorageCanvas();

const handleCanvasLoad = (str: string) => {
  isShowModal.value = false;
  storedSelectedCanvasName.updateValue(str);
};

const closeModal = () => {
  isShowModal.value = false;
};
const showModal = () => {
  isShowModal.value = true;
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
  flex-direction: row;
  border-radius: 0.5rem;
  background-color: var(--color-background-soft);
}

.canvas-buttons-container:hover {
  background-color: var(--color-background-soft);
}

.canvas-buttons-container img {
  margin: 0rem;
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 0.5rem;
  border: var(--vt-c-text-light-1) 1px solid;
  background-color: var(--color-background);
}

.canvas-button-container {
  display: flex;
  padding: 0rem 0rem 0rem 0.5rem;
  flex-direction: row;
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
  /* font-size: 0.9rem; */
  align-items: center;
  border-radius: 0.5rem;
  color: var(--color-background);
  border: 1.5px solid transparent;
  background-color: rgba(105, 101, 219, 1);
}

.button-text {
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.05rem;
  color: var(--color-background);
}

.canvas-select-name {
  font-size: 1rem;
  font-weight: 500;
}
.link {
  transition: 0.4s;
  padding: 0.3rem 0rem;
  text-decoration: none;
  color: var(--color-text);
  border-bottom: 1.5px solid var(--color-text);
}

.container {
  gap: 0.5rem;
  display: flex;
  width: 100%;
  padding-top: 1rem;
  flex-direction: column;
}
.settings-button {
  top: 0.5rem;
  z-index: 100;
  border: none;
  display: flex;
  right: 0.5rem;
  font-size: 1rem;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  background-color: transparent;
}

.settings-button-icon {
  display: flex;
  padding: 0.4rem;
  font-size: 1.2rem;
  margin-left: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: center;
  color: var(--color-background);
  background-color: rgba(105, 101, 219, 1);
  transition: all 0.25s ease-in-out;
}

@media (hover: hover) {
  /* on hover over settings-button trigger hover on settings-button-icon   */
  .settings-button:hover .settings-button-icon {
    background-color: rgba(105, 101, 219, 0.8);
  }

  .link:hover {
    border-bottom: 1.5px solid rgba(105, 101, 219, 1);
  }
}
</style>
