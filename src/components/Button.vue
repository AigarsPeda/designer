<template>
  <button class="btn" :type="type || 'button'" @click="onClick">
    <slot name="icon"></slot>

    {{ title }}
    <span class="info">
      <slot name="info"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  title: string;
  isSelect?: boolean;
  onClick: () => void;
  isFullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  color?: "green" | "purple" | "red" | "red-text";
}>();

const stylesRef = ref({
  textColor: "#0f172a",
  bgHover: "#cbd5e1",
  textHaverColor: "#0f172a",
  textHoverDarkTheme: "#fff",
  backgroundColor: "transparent",
  selectedBackgroundColor: "#cbd5e1",
});

onMounted(() => {
  if (props.color === "green") {
    stylesRef.value = {
      textColor: "#fff",
      bgHover: "#15803d",
      textHaverColor: "#fff",
      textHoverDarkTheme: "#fff",
      backgroundColor: "#059669",
      selectedBackgroundColor: "#15803d",
    };
  }

  if (props.color === "purple") {
    stylesRef.value = {
      textColor: "#fff",
      bgHover: "#7e22ce",
      textHaverColor: "#fff",
      textHoverDarkTheme: "#fff",
      backgroundColor: "#7e22ce",
      selectedBackgroundColor: "#7e22ce",
    };
  }

  if (props.color === "red") {
    stylesRef.value = {
      textColor: "#fff",
      bgHover: "#b91c1c",
      textHaverColor: "#fff",
      textHoverDarkTheme: "#fff",
      backgroundColor: "#dc2626",
      selectedBackgroundColor: "#b91c1c",
    };
  }

  if (props.color === "red-text") {
    stylesRef.value = {
      textColor: "#dc2626",
      bgHover: "#dc2626",
      textHaverColor: "#fff",
      textHoverDarkTheme: "#fff",
      backgroundColor: "transparent",
      selectedBackgroundColor: "#f87171",
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
  position: relative;
  font-size: 0.7rem;
  border-radius: 5px;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem 0.7rem;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  color: v-bind("`${stylesRef.textColor}`");
  width: v-bind("`${props.isFullWidth ? " 100% " : " auto "}`");
  font-weight: v-bind("`${props.isSelect ? " bold " : " normal "}`");
  background-color: v-bind(
    "`${props.isSelect ? stylesRef.selectedBackgroundColor : stylesRef.backgroundColor }`"
  );
}

.info {
  top: 0.4rem;
  right: 0.4rem;
  font-weight: 500;
  color: #e5e7eb;
  font-size: 0.65rem;
  position: absolute;
}

.title {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

@media (hover: hover) {
  .btn:hover {
    color: v-bind("`${stylesRef.textHaverColor}`");
    background-color: v-bind("`${stylesRef.bgHover}`");
  }
}

/* TODO: If dark mode */
/* @media (prefers-color-scheme: dark) {
  .btn {
    color: #fff;
    background-color: v-bind(
      '`${props.isSelect ? "#27272a": "var(--color-background)" }`'
    );
  }
  .btn:hover {
    background-color: #3f3f46;
    color: v-bind("`${stylesRef.textHoverDarkTheme}`");
  }
} */
</style>
