<template>
  <nav>
    ObjContextMenu
    <MenuBackButton />
    <div>
      <p>Not implemented yet</p>
      <p>{{ canvasStore.getSelectedObjectIds }}</p>
    </div>
  </nav>
</template>

<script setup lang="ts">
import MenuBackButton from "@/components/contextMenus/MenuBackButton.vue";
import useCanvasStore from "@/stores/useCanvasStore";
import { watch } from "vue";

const canvasStore = useCanvasStore();

watch(canvasStore, (newVal) => {
  console.log("newVal", newVal);
});
</script>

<style scoped>
nav {
  gap: 0.5rem;
  /* width: 5.5rem; */
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
}
</style>
