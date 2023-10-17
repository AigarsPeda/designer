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
        <label>Name</label>
      </div>

      <div class="action-button-container">
        <button
          class="button blue"
          @click="handleButtonClick"
          :disabled="newCanvasSceneName.length === 0 || isAlreadyCreated"
        >
          <CaSave class="icon" />
          {{ isEditing ? "Save" : "Create" }}
        </button>
        <button
          class="button"
          @click="handleCancel"
          :disabled="newCanvasSceneName.length === 0 || isAlreadyCreated"
        >
          Cancel
        </button>
      </div>
    </div>
    <div class="error">
      <span v-if="isAlreadyCreated">Scene with this name already exists</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import { CaSave } from "@kalimahapps/vue-icons";
import { ref, watch } from "vue";

const emit = defineEmits<{
  (e: "canvas-created", canvasName: string): void;
}>();

const props = defineProps<{
  oldCanvasSceneName: string;
}>();

const isEditing = ref(false);
const newCanvasSceneName = ref("");
const isAlreadyCreated = ref(false);
const isEditingSceneName = ref(false);

const { storedScreenShots, storedCanvasSate, storedSelectedCanvasName } =
  useLocalStorageCanvas();

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

const handleCanvasNameChange = (key: string, newName: string) => {
  // change storedScreenShots key name with the new name
  const { [key]: screenShot, ...restScreenShots } =
    storedScreenShots.storedValue;
  storedScreenShots.updateValue({
    ...restScreenShots,
    [newName]: screenShot,
  });

  // change storedCanvasSate key name with the new name
  const { [key]: canvas, ...restCanvasSate } = storedCanvasSate.storedValue;
  storedCanvasSate.updateValue({
    ...restCanvasSate,
    [newName]: canvas,
  });

  if (isEditingSceneName.value) {
    storedSelectedCanvasName.updateValue(newName);
  }
};

const handleCancel = () => {
  isEditing.value = false;
  newCanvasSceneName.value = "";
  isAlreadyCreated.value = false;
};

const handleButtonClick = () => {
  if (isEditing.value) {
    handleCanvasNameChange(props.oldCanvasSceneName, newCanvasSceneName.value);
    isEditing.value = false;
  } else {
    handleCrete();
  }
};

watch(
  () => props.oldCanvasSceneName,
  (oldCanvasSceneName) => {
    isEditing.value = Boolean(oldCanvasSceneName);
    isEditingSceneName.value =
      oldCanvasSceneName === storedSelectedCanvasName.storedValue;
    newCanvasSceneName.value = oldCanvasSceneName;
  }
);
</script>

<style scoped>
.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.group {
  width: 100%;
  max-width: 300px;
  position: relative;
}

.button {
  border: none;
  display: flex;
  color: #343d4a;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  border: 1.5px solid transparent;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}

.error {
  height: 1rem;
  color: #ef4444;
  font-size: 0.7rem;
  padding: 0.2rem 0rem;
}
.create-scene-button {
  border: none;
  min-width: 5rem;
  margin-left: 1rem;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: var(--color-background);
}

.action-button-container {
  gap: 0.5rem;
  display: flex;
  width: 100%;
  padding: 0.5rem 0rem;
  justify-content: flex-end;
}

input {
  width: 100%;
  border: none;
  display: block;
  font-size: 1rem;
  padding: 10px 10px 10px 0px;
  border-bottom: 1.5px solid #9ca3af;
}
input:focus {
  outline: none;
}

/* LABEL ======================================= */
label {
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
  color: #6366f1;
}

/* @media (hover: hover) {
  .blue:hover {
    color: #6366f1;
  }
} */

/* Desktop */
@media (min-width: 768px) {
  .form-container {
    flex-direction: row;
  }
}
</style>
