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
import type { CustomObjI } from "@/types/fabric.types";

const canvasStore = useCanvasStore();

console.log("canvasStore --->", canvasStore);

const getSelectedObjInCanvas = () => {
  const selectedObjIds = canvasStore.getSelectedObjectIds;
  const canvasObj = canvasStore.getSelectedCanvas?.getObjects() as CustomObjI[];

  const selectedObj = canvasObj.filter((obj) => {
    return selectedObjIds.includes(obj.id);
  });

  console.log("selectedObj --->", selectedObj);
  // return selectedObj;
};

getSelectedObjInCanvas();

// watch(canvasStore, (newVal) => {
//   console.log("newVal --->", newVal);
// });
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
