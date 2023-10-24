<template>
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
    @delete-canvas="handleSelectedDeleteCanvasName"
    @export-canvas-select="handleCanvasSceneExportSelect"
  />
</template>

<script setup lang="ts">
import CreateCanvasScene from "@/components/CreateCanvasScene.vue";
import DisplayCreatedCanvasScene from "@/components/DisplayCreatedCanvasScene.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

defineProps<{
  closeModal: () => void;
  handleCanvasSceneExportSelect: (str: string) => void;
  handleSelectedDeleteCanvasName: (name: string) => void;
}>();

const oldCanvasSceneName = ref("");

const setOldCanvasSceneName = (name: string) => {
  oldCanvasSceneName.value = name;
};
</script>

<style scoped>
.link-container {
  display: flex;
  align-items: center;
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

@media (hover: hover) {
  .link:hover {
    border-bottom: 1.5px solid #6d28d9cc;
  }
}
</style>
