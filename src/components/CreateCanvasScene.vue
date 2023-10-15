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

      <button
        @click="handleButtonClick"
        class="create-scene-button violet"
        :disabled="newCanvasSceneName.length === 0 || isAlreadyCreated"
      >
        {{ isEditing ? "Save" : "Create" }}
      </button>
      <button
        @click="handleCancel"
        class="create-scene-button gray"
        :disabled="newCanvasSceneName.length === 0 || isAlreadyCreated"
      >
        Cancel
      </button>
    </div>
    <div class="error">
      <span v-if="isAlreadyCreated">Scene with this name already exists</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
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
}
.group {
  width: 100%;
  max-width: 300px;
  position: relative;
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

.violet {
  background-color: #6d28d9;
}

.gray {
  background-color: #6b7280;
}

.create-scene-button:disabled {
  color: #e5e7eb;
  background-color: #9ca3af;
}

input {
  width: 100%;
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
  color: #6d28d9;
}
</style>
