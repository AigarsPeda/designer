<template>
  <ul class="color-container">
    <li v-for="(color, index) in COLORS">
      <button
        :key="index"
        @click="handleColorClick(opacity ? `${color}${opacity}` : color)"
        :style="{ backgroundColor: opacity ? `${color}${opacity}` : color }"
        :class="{
          'color-btn': true,
          'color-btn_active': opacity
            ? removeLastTwoCharFromString(selectedColor) === color
            : selectedColor === color,
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
import { COLORS, TRANSPARENT_COLOR } from "@/hardcoded";
import removeLastTwoCharFromString from "@/utils/removeLastTwoCharFromString";

defineProps<{
  opacity?: string;
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
}

.color-btn_transparent {
  border: 1.5px solid #cbd5e1;
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
