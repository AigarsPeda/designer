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
      <DisplayCreatedCanvas />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import DisplayCreatedCanvas from "@/components/DisplayCreatedCanvas.vue";
import Modal from "@/components/Modal.vue";
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import { CaSettings } from "@kalimahapps/vue-icons";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isShowModal = ref(false);
const { storedSelectedCanvasName } = useLocalStorageCanvas();

const closeModal = () => {
  isShowModal.value = false;
};
const showModal = () => {
  isShowModal.value = true;
};
</script>

<style scoped>
.link {
  transition: 0.4s;
  padding: 0.3rem 0rem;
  text-decoration: none;
  color: var(--color-text);
  border-bottom: 1.5px solid var(--color-text);
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
