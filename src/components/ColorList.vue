<template>
  <ul class="color-container">
    <li v-for="(color, index) in colors">
      <button
        :key="index"
        @click="handleColorClick(color)"
        :style="{
          backgroundColor: color,
          // boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)`,
        }"
        :class="{
          'color-btn': true,
          'color-btn_active': selectedColor === color,
        }"
      ></button>
    </li>
    <li>
      <button
        @click="handleColorClick(TRANSPARENT_COLOR)"
        :style="{ backgroundColor: TRANSPARENT_COLOR }"
        :class="{
          'color-btn': true,
          'color-btn_transparent': true,
          'color-btn_active': selectedColor === TRANSPARENT_COLOR,
        }"
      ></button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { TRANSPARENT_COLOR } from "@/hardcoded";

defineProps<{
  colors: string[];
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
  gap: 0.4rem;
  display: flex;
  flex-wrap: wrap;
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
  box-shadow: var(--vt-box-shadow);
}

.color-btn_transparent {
  background-size: 6.5px 6.5px;
  background-image: linear-gradient(to right, #cbd5e1 1px, transparent 1px),
    linear-gradient(to bottom, #cbd5e1 1px, transparent 1px);
}

.color-btn_active {
  opacity: 1;
  border: 1.5px solid #374151;
}

@media (hover: hover) {
  .color-btn:hover {
    opacity: 1;
    cursor: pointer;
  }
}
</style>
