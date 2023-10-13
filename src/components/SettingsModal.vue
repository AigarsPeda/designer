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

      <div class="create-scene-container">
        <CreateCanvasScene @canvas-created="closeModal" />
      </div>
      <DisplayCreatedCanvasScene @new-canvas-loaded="closeModal" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import CreateCanvasScene from "@/components/CreateCanvasScene.vue";
import DisplayCreatedCanvasScene from "@/components/DisplayCreatedCanvasScene.vue";
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

.create-scene-container {
  padding: 1rem 0rem;
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
  background-color: #8b5cf6;
  transition: all 0.25s ease-in-out;
}

@media (hover: hover) {
  /* on hover over settings-button trigger hover on settings-button-icon   */
  .settings-button:hover .settings-button-icon {
    background-color: #8b5cf6cc;
  }

  .link:hover {
    border-bottom: 1.5px solid #8b5cf6cc;
  }
}
</style>
