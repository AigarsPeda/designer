<template>
  <div class="container">
    <p class="info">Saved scenes:</p>

    <TransitionGroup tag="ul" name="fade" class="canvas-container">
      <li
        v-for="(_value, key) in sortObjKeysAlphabetically(
          storedCanvasSate.storedValue
        )"
        :key="key"
        class="canvas-buttons-container"
      >
        <button
          class="img-container-button"
          @click="handleCanvasLoad(key.toString())"
        >
          <img
            v-if="storedCanvasMetaData.storedValue[key.toString()].screenShot"
            alt="canvas screenshot"
            :src="storedCanvasMetaData.storedValue[key.toString()].screenShot"
          />
        </button>
        <div class="canvas-option-container">
          <div class="canvas-description-container">
            <span class="info">Name</span>
            <span class="canvas-select-name">{{ key }}</span>
          </div>
          <div class="canvas-button-container">
            <button
              class="button"
              v-for="option in menuOptions"
              :key="option.id"
              @click="handleButtonClick(option.onClick(key.toString()))"
            >
              <IconComponent :icon="option.icon" />
              {{ option.title }}
            </button>
          </div>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import IconComponent from "@/components/IconComponent.vue";
import useDisplayCanvasOptions, {
  type EmitEvent,
} from "@/composables/useDisplayCanvasOptions";
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import type { EmitFunction } from "@/types/util.types";
import sortObjKeysAlphabetically from "@/utils/sortObjKeysAlphabetically";

const { menuOptions } = useDisplayCanvasOptions();

const emit = defineEmits<{
  (e: "edit-name", canvasName: string): void;
  (e: "new-canvas-loaded", canvasName: string): void;
  (e: "export-canvas-select", canvasName: string): void;
}>();

const { storedCanvasSate, storedCanvasMetaData, storedSelectedCanvasName } =
  useLocalStorageCanvas();

const handleButtonClick = ({
  name,
  emitEvent,
}: {
  name: string;
  emitEvent: EmitEvent;
}) => {
  const typedEmit = emit as EmitFunction;
  typedEmit(emitEvent, name);
};

const handleCanvasLoad = (str: string) => {
  storedSelectedCanvasName.updateValue(str);
  emit("new-canvas-loaded", str);
};
</script>

<style scoped>
.info {
  font-weight: 500;
  color: #64748b;
  font-size: 0.6rem;
}

.canvas-container {
  gap: 0.6rem;
  width: 100%;
  display: flex;
  overflow-y: auto;
  max-height: 20rem;
  place-items: start;
  position: relative;
  flex-direction: column;
}

.canvas-buttons-container {
  margin: 0;
  padding: 0;
  width: 100%;
  border: none;
  display: flex;
  padding: 0.1rem;
  text-align: left;
  transition: 0.4s;
  border-radius: 0.5rem;
  flex-direction: column;
}

.img-container-button {
  padding: 0;
  width: 90px;
  height: 90px;
  border: none;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #f9fafb;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 1px;
}

.img-container-button img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 0.5rem;
  background-color: var(--color-background);
}

.canvas-button-container {
  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /* justify-content: space-between; */
  padding: 0rem 0rem 0rem 0rem;
}

.canvas-option-container {
  display: flex;
  padding: 0.5rem 0rem;
  flex-direction: column;
  justify-content: space-between;
}

.canvas-description-container {
  display: flex;
  flex-direction: column;
  padding: 0.4rem 0rem 0.6rem 0rem;
}

.icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}

.button {
  border: none;
  display: flex;
  padding: 0.5rem;
  color: #343d4a;
  align-items: center;
  border-radius: 0.5rem;
  border: 1.5px solid transparent;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
}

.canvas-select-name {
  font-weight: 600;
  font-size: 0.8rem;
}

.container {
  gap: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleX(0.01) translateX(100%);
}

.fade-leave-active {
  position: absolute;
}

@media (hover: hover) {
  .red:hover {
    color: #e91517;
  }
}

/* Desktop */
@media (min-width: 768px) {
  .canvas-buttons-container {
    flex-direction: row;
  }

  .canvas-button-container {
    padding: 0rem 0rem 0rem 0.5rem;
  }

  .canvas-description-container {
    padding: 0rem 0.5rem;
  }
}
</style>
