<template>
  <ul class="color-container">
    <li v-for="(color, index) in COLORS">
      <button
        :key="index"
        :style="{ backgroundColor: color }"
        @click="handleColorClick(color)"
        :class="{
          'color-btn': true,
          'color-btn_active': selectedColor === color,
        }"
      ></button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { COLORS } from "@/hardcoded";

const props = defineProps<{
  selectedColor: string;
  handleColorClick: (color: string) => void;
}>();
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  margin: 0;
  padding: 0;
}
.nav-buttons {
  gap: 0.5rem;
  width: 100%;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.color-container {
  gap: 0.5rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
}

.color-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  opacity: 0.9;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

.color-btn_active {
  border: 2px solid #374151;
  opacity: 1;
}

@media (hover: hover) {
  .color-btn:hover {
    opacity: 1;
    cursor: pointer;
  }
}
</style>
