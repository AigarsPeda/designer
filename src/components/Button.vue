<template>
  <button class="btn" :type="type || 'button'" @click="onClick">
    <slot name="icon"></slot>
    {{ title }}
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  title: string;
  isSelect?: boolean;
  onClick: () => void;
  isFullWidth?: boolean;
  color?: "green" | "purple" | "red";
  type?: "button" | "submit" | "reset";
}>();

const stylesRef = ref({
  color: "#0f172a",
  hover: "#cbd5e1",
  backgroundColor: "transparent",
  selectedBackgroundColor: "#cbd5e1",
});

onMounted(() => {
  if (props.color === "green") {
    stylesRef.value = {
      color: "#fff",
      hover: "#15803d",
      backgroundColor: "#059669",
      selectedBackgroundColor: "#15803d",
    };
  }

  if (props.color === "purple") {
    stylesRef.value = {
      color: "#fff",
      hover: "#7e22ce",
      backgroundColor: "#7e22ce",
      selectedBackgroundColor: "#7e22ce",
    };
  }

  if (props.color === "red") {
    stylesRef.value = {
      color: "#fff",
      hover: "#b91c1c",
      backgroundColor: "#dc2626",
      selectedBackgroundColor: "#b91c1c",
    };
  }
});
</script>

<style scoped>
.btn {
  gap: 0.5rem;
  border: none;
  display: flex;
  cursor: pointer;
  font-size: 0.7rem;
  border-radius: 5px;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem 0.7rem;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  color: v-bind("`${stylesRef.color}`");
  width: v-bind("`${props.isFullWidth ? " 100% " : " auto "}`");
  font-weight: v-bind("`${props.isSelect ? " bold " : " normal "}`");
  background-color: v-bind(
    "`${props.isSelect ? stylesRef.selectedBackgroundColor : stylesRef.backgroundColor }`"
  );
}

@media (hover: hover) {
  .btn:hover {
    background-color: v-bind("`${stylesRef.hover}`");
  }
}

/* TODO: If dark mode */
/* @media (prefers-color-scheme: dark) {
  .btn {
    color: #fff;
    background-color: v-bind('`${props.isSelect ? "#27272a": "var(--color-background)" }`');
  }
  .btn:hover {
    background-color: #3f3f46;
  }
} */
</style>
