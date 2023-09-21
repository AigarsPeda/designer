<template>
  <Button
    isFullWidth
    title="Back"
    @click="
      uiStore.setCanvasMode({
        canvasMode: 'mainMenu',
      })
    "
  >
    <template #icon>
      <vue-feather type="arrow-left" size="16" class="icon" />
    </template>
  </Button>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import useUIStore from "@/stores/useUIStore";
import VueFeather from "vue-feather";

const uiStore = useUIStore();
</script>

<style scoped></style>
