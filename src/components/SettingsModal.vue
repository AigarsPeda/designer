<template>
  <button type="button" class="settings-button" @click="showModal">
    <CaSettings />
  </button>

  <Modal :closeModal="closeModal" :isShowModal="isShowModal">
    <template #modal-content>
      <RouterLink class="link" to="/about">About</RouterLink>
      <div class="canvas-container">
        <p class="info">Saved Canvas:</p>
        <div class="canvas-buttons-container">
          <button
            v-for="(value, key) in storedCanvasSate.storedValue"
            :key="key"
            class="canvas-select-button"
          >
            <img
              v-if="storedScreenShots.storedValue"
              alt="canvas screenshot"
              :src="storedScreenShots.storedValue[key.toString()]"
            />
            <div class="canvas-select-info">
              <span class="info">Name</span>
              <span class="canvas-select-name">{{ key }}</span>
            </div>
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import { CaSettings } from "@kalimahapps/vue-icons";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isShowModal = ref(false);
const { storedCanvasSate, storedScreenShots } = useLocalStorageCanvas();

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

.canvas-buttons-container {
  gap: 0.5rem;
  width: 100%;
  display: flex;
  overflow-y: auto;
  max-height: 20rem;
  place-items: start;
  flex-direction: column;
}

.canvas-select-button {
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

.canvas-select-button:hover {
  background-color: var(--color-background-soft);
}

.canvas-select-button img {
  margin: 0rem;
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 0.5rem;
  border: var(--vt-c-text-light-1) 1px solid;
  background-color: var(--color-background);
}

.canvas-select-info {
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
}

.canvas-select-name {
  font-weight: 500;
  font-size: 1.2rem;
}
.link {
  transition: 0.4s;
  padding: 0.5rem 0rem;
  text-decoration: none;
  color: var(--color-text);
  border-bottom: 1px solid transparent;
}

.canvas-container {
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
  padding: 0.4rem;
  font-size: 1.2rem;
  position: absolute;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: center;
  color: var(--color-background);
  border: 1.5px solid transparent;
  background-color: rgba(105, 101, 219, 1);
}

@media (hover: hover) {
  .settings-button:hover {
    background-color: rgba(105, 101, 219, 0.8);
  }

  .link:hover {
    border-bottom: 1px solid var(--color-text);
  }
}
</style>
