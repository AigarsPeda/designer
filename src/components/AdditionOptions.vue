<template>
  <div class="nav-buttons">
    <Button
      isFullWidth
      title="Send to back"
      @click="handleSendToBack(canvasStore.getSelectedCanvas)"
    >
      <template #icon>
        <BsLayersHalf class="icon" />
      </template>
    </Button>
    <Button
      isFullWidth
      title="Bring to front"
      @click="handleBringToFront(canvasStore.getSelectedCanvas)"
    >
      <template #icon>
        <BsLayersFill class="icon" />
      </template>
    </Button>
    <Button isFullWidth title="Copy" @click="copyPasta.copyCanvasActiveObjects">
      <template #icon>
        <AkCopy class="icon" />
      </template>
    </Button>
    <Button
      isFullWidth
      title="Paste"
      @click="copyPasta.pasteCanvasActiveObjects"
    >
      <template #icon>
        <LuClipboardPaste class="icon" />
      </template>
    </Button>
    <Button
      isFullWidth
      title="Delete"
      color="red-text"
      @click="handleDeleteSelectedCanvasObj(canvasStore.getSelectedCanvas)"
    >
      <template #icon>
        <AnOutlinedDelete class="icon" />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import useCanvasStore from "@/stores/useCanvasStore";
import useCopyPastaCanvasObj from "@/stores/useCopyPastaCanvasObj";
import handleDeleteSelectedCanvasObj from "@/utils/fabricUtils/handleDeleteSelectedCanvasObj";
import {
  AkCopy,
  AnOutlinedDelete,
  BsLayersFill,
  BsLayersHalf,
  LuClipboardPaste,
} from "@kalimahapps/vue-icons";

const canvasStore = useCanvasStore();
const copyPasta = useCopyPastaCanvasObj();

const handleBringToFront = (canvas: fabric.Canvas | null) => {
  const activeObj = canvas?.getActiveObject();
  if (activeObj) {
    activeObj.bringForward();
    canvas?.renderAll();
  }
};

const handleSendToBack = (canvas: fabric.Canvas | null) => {
  const activeObj = canvas?.getActiveObject();
  if (activeObj) {
    activeObj.sendBackwards();
    canvas?.renderAll();
  }
};
</script>

<style scoped>
.icon {
  font-size: 2em;
}
.nav-buttons {
  gap: 0.5rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
}
</style>
../stores/useCopyPastaCanvasObj
