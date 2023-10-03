<template>
  <div class="nav-buttons">
    <Button
      isFullWidth
      title="Send to back"
      @click="console.log('send to back')"
    >
      <template #icon>
        <BsLayersHalf class="icon" />
      </template>
    </Button>
    <Button
      isFullWidth
      title="Bring to front"
      @click="console.log('bring to front')"
    >
      <template #icon>
        <BsLayersFill class="icon" />
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
import {
  AnOutlinedDelete,
  BsLayersFill,
  BsLayersHalf,
} from "@kalimahapps/vue-icons";
import handleDeleteSelectedCanvasObj from "@/utils/fabricUtils/handleDeleteSelectedCanvasObj";

const canvasStore = useCanvasStore();
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
