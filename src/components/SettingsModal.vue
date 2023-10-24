<template>
  <button type="button" class="menu-button" @click="showModal">
    {{ storedSelectedCanvasName.storedValue }}
    <vue-feather type="menu" size="24" class="menu-icon" />
  </button>

  <Modal
    :z-index="200"
    :closeModal="closeModal"
    :isShowModal="isShowModal"
    :maxwidth="Boolean(exportCanvasName) ? 800 : 480"
  >
    <template #modal-content>
      <ExportModal
        v-if="Boolean(exportCanvasName)"
        :selectedCanvasName="exportCanvasName"
        :handleBackButtonClick="handleBackButtonClick"
      />

      <CanvasDeleteConfirm
        v-if="Boolean(selectedDeleteCanvasName)"
        :handleDeleteButtonClick="handleDeleteButtonClick"
        :selectedDeleteCanvasName="selectedDeleteCanvasName"
        :handleDeleteCancelButtonClick="handleDeleteCancelButtonClick"
      />

      <CreatedAndDisplayCanvas
        v-if="!Boolean(exportCanvasName) && !Boolean(selectedDeleteCanvasName)"
        :closeModal="closeModal"
        :handleCanvasSceneExportSelect="handleCanvasSceneExportSelect"
        :handleSelectedDeleteCanvasName="handleSelectedDeleteCanvasName"
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import CanvasDeleteConfirm from "@/components/CanvasDeleteConfirm.vue";
import CreatedAndDisplayCanvas from "@/components/CreatedAndDisplayCanvas.vue";
import ExportModal from "@/components/ExportModal.vue";
import Modal from "@/components/Modal.vue";
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import { ref } from "vue";
import VueFeather from "vue-feather";
import { DEFAULT_CANVAS_NAME } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";

const isShowModal = ref(false);
const exportCanvasName = ref("");
const oldCanvasSceneName = ref("");
const canvasStore = useCanvasStore();
const selectedDeleteCanvasName = ref("");

const { storedSelectedCanvasName, storedCanvasSate, storedCanvasMetaData } =
  useLocalStorageCanvas();

const handleBackButtonClick = () => {
  exportCanvasName.value = "";
};

const handleDeleteButtonClick = () => {
  const name = selectedDeleteCanvasName.value;
  const canvas = canvasStore.getSelectedCanvas;

  if (!canvas) {
    return;
  }

  canvas.clear();

  const { [name]: __, ...restScreenShots } = storedCanvasMetaData.storedValue;
  storedCanvasMetaData.updateValue(restScreenShots);
  const { [name]: _, ...rest } = storedCanvasSate.storedValue;
  storedCanvasSate.updateValue(rest);

  const selectedName = Object.keys(rest)[0] ?? DEFAULT_CANVAS_NAME;

  storedSelectedCanvasName.updateValue(selectedName);

  isShowModal.value = false;
  selectedDeleteCanvasName.value = "";
};

const handleSelectedDeleteCanvasName = (name: string) => {
  selectedDeleteCanvasName.value = name;
};

const handleDeleteCancelButtonClick = () => {
  selectedDeleteCanvasName.value = "";
};

const handleCanvasSceneExportSelect = (str: string) => {
  exportCanvasName.value = str;
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
  z-index: 100;
  border: none;
  display: flex;
  right: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  position: absolute;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
  justify-content: center;
  color: var(--color-text);
  backdrop-filter: blur(6px);
  box-shadow: var(--vt-box-shadow);
  background-color: rgba(238, 240, 244, 0.2);
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
