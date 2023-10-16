<template>
  <button type="button" class="menu-button" @click="showModal">
    {{ storedSelectedCanvasName.storedValue }}
    <vue-feather type="menu" size="24" class="menu-icon" />
  </button>

  <Modal :closeModal="closeModal" :isShowModal="isShowModal">
    <template #modal-content>
      <div class="link-container">
        <RouterLink class="link" to="/about">About</RouterLink>
      </div>
      <div class="create-scene-container">
        <CreateCanvasScene
          @canvas-created="closeModal"
          :oldCanvasSceneName="oldCanvasSceneName"
        />
      </div>
      <DisplayCreatedCanvasScene
        @new-canvas-loaded="closeModal"
        @edit-name="setOldCanvasSceneName"
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import CreateCanvasScene from "@/components/CreateCanvasScene.vue";
import DisplayCreatedCanvasScene from "@/components/DisplayCreatedCanvasScene.vue";
import Modal from "@/components/Modal.vue";
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import { ref } from "vue";
import VueFeather from "vue-feather";
import { RouterLink } from "vue-router";

const isShowModal = ref(false);
const oldCanvasSceneName = ref("");
const { storedSelectedCanvasName } = useLocalStorageCanvas();

const setOldCanvasSceneName = (name: string) => {
  oldCanvasSceneName.value = name;
};

const closeModal = () => {
  isShowModal.value = false;
};
const showModal = () => {
  isShowModal.value = true;
};
</script>

<style scoped>
.link-container {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
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
  color: var(--color-text);
  background-color: transparent;
}

.menu-button {
  top: 0.5rem;
  right: 0.5rem;
  z-index: 100;
  border: none;
  padding: 0.4rem 0.6rem;
  display: flex;
  font-size: 0.8rem;
  font-weight: 600;
  position: absolute;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: center;
  color: var(--color-text);
  backdrop-filter: blur(6px);
  background-color: rgba(238, 240, 244, 0.2);
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
}

.menu-icon {
  margin-left: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

@media (hover: hover) {
  /* on hover over settings-button trigger hover on settings-button-icon   */
  .menu-button:hover .menu-icon {
    color: #6d28d9cc;
  }

  .link:hover {
    border-bottom: 1.5px solid #6d28d9cc;
  }
}
</style>
