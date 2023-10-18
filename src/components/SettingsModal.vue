<template>
  <button type="button" class="menu-button" @click="showModal">
    {{ storedSelectedCanvasName.storedValue }}
    <vue-feather type="menu" size="24" class="menu-icon" />
  </button>

  <Modal
    :z-index="200"
    :closeModal="closeModal"
    :isShowModal="isShowModal"
    :maxwidth="Boolean(exportCanvasName) ? 800 : 467"
  >
    <template #modal-content>
      <ExportModal
        v-if="Boolean(exportCanvasName)"
        :selectedCanvasName="exportCanvasName"
        :handleBackButtonClick="handleBackButtonClick"
      />

      <CreatedAndDisplayCanvas
        :closeModal="closeModal"
        v-if="!Boolean(exportCanvasName)"
        :handleCanvasSceneExportSelect="handleCanvasSceneExportSelect"
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import CreatedAndDisplayCanvas from "@/components/CreatedAndDisplayCanvas.vue";
import ExportModal from "@/components/ExportModal.vue";
import Modal from "@/components/Modal.vue";
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import { ref } from "vue";
import VueFeather from "vue-feather";

const isShowModal = ref(false);
const exportCanvasName = ref("");
const oldCanvasSceneName = ref("");
const { storedSelectedCanvasName } = useLocalStorageCanvas();

const setOldCanvasSceneName = (name: string) => {
  oldCanvasSceneName.value = name;
};

const handleBackButtonClick = () => {
  exportCanvasName.value = "";
};

const handleCanvasSceneExportSelect = (str: string) => {
  exportCanvasName.value = str;
  // isShowModal.value = false;
  console.log("handleCanvasExport", str);
};

const closeModal = () => {
  isShowModal.value = false;
  exportCanvasName.value = "";
  oldCanvasSceneName.value = "";
};
const showModal = () => {
  isShowModal.value = true;
};
</script>

<style scoped>
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
  box-shadow: var(--vt-box-shadow);
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
}
</style>
