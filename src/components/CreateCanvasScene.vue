<template>
  <div class="container">
    <div class="form-container">
      <div class="group">
        <input
          required
          type="text"
          v-model="newCanvasSceneName"
          @input="handleCanvasLoad(newCanvasSceneName)"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Name</label>
      </div>
      <button
        @click="handleCrete"
        class="create-scene-button"
        :disabled="newCanvasSceneName.length === 0 || isAlreadyCreated"
      >
        Create
      </button>
    </div>
    <div class="error">
      <span v-if="isAlreadyCreated">Scene with this name already exists</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "canvas-created", canvasName: string): void;
}>();

const newCanvasSceneName = ref("");
const isAlreadyCreated = ref(false);
const { storedSelectedCanvasName, storedCanvasSate } = useLocalStorageCanvas();

const handleCanvasLoad = (str: string) => {
  newCanvasSceneName.value = str;
  isAlreadyCreated.value = Boolean(storedCanvasSate.storedValue[str]);
};

const handleCrete = () => {
  if (isAlreadyCreated.value) {
    return;
  }

  storedSelectedCanvasName.updateValue(newCanvasSceneName.value);
  storedCanvasSate.updateValue({
    ...storedCanvasSate.storedValue,
    [newCanvasSceneName.value]: [],
  });
  emit("canvas-created", newCanvasSceneName.value);
};
</script>

<style scoped>
.form-container {
  /* padding: 1rem 0rem; */
  display: flex;
}
.group {
  position: relative;
}

.error {
  padding: 0.2rem 0rem;
  color: #ef4444;
  height: 1rem;
  font-size: 0.7rem;
}
.create-scene-button {
  margin-left: 1rem;
  border: none;
  font-size: 0.85rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0.5rem;
  background-color: #8b5cf6;
  color: var(--color-background);
}

.create-scene-button:hover {
  background-color: #8b5cf6cc;
}

.create-scene-button:disabled {
  background-color: #9ca3af;
  color: #e5e7eb;
}

input {
  width: 300px;
  border: none;
  display: block;
  font-size: 1rem;
  padding: 10px 10px 10px 0px;
  border-bottom: 1.5px solid var(--color-text);
}
input:focus {
  outline: none;
}

/* LABEL ======================================= */
label {
  /* left: 5px; */
  top: 10px;
  color: #999;
  font-size: 1rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label,
input:valid ~ label {
  top: -10px;
  font-size: 0.7rem;
  color: #8b5cf6;
}
</style>