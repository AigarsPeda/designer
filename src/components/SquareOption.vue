<template>
  <div class="nav-buttons">
    <Button
      isFullWidth
      title="Rounded"
      @click="handleShapeChange('rounded')"
      :isSelect="selectedShape === 'rounded'"
    >
      <template #icon>
        <ReRoundedCorner class="icon" />
      </template>
    </Button>
    <Button
      isFullWidth
      title="Sharp"
      @click="handleShapeChange('sharp')"
      :isSelect="selectedShape === 'sharp'"
    >
      <template #icon>
        <PxSharpCorner class="icon" />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import type { ShapeType } from "@/types/shape.types";
import { PxSharpCorner, ReRoundedCorner } from "@kalimahapps/vue-icons";

defineProps<{
  selectedShape: ShapeType;
  handleShapeChange: (shape: "rounded" | "sharp") => void;
}>();
</script>

<style scoped>
.icon {
  font-size: 2em;
}
.nav-buttons {
  gap: 0.5rem;
  width: 100%;
  gap: 0.5rem;
  display: flex;
  align-items: center;
}
</style>
