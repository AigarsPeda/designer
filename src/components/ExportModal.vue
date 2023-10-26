<template>
  <div class="button-container">
    <button class="back-button" @click="handleBackButtonClick">
      <BxArrowBack class="icon" />
      Back
    </button>
  </div>
  <div class="container">
    <div class="canvas-container-side" ref="divRef">
      <FabricCanvas @canvas-created="handleCanvasCreated" />
    </div>
    <div class="settings-container-side">
      <p class="title">Export image:</p>
      <div class="settings-container">
        <div class="setting">
          <p class="info">Background</p>
          <Switch :isChecked="isBackground" :handleChecked="handleChecked" />
        </div>
      </div>
      <div class="settings-button-container">
        <button
          class="button"
          @click="
            downloadCanvasAsPNGorJPEG({
              canvas: canvas,
              fileExtension: 'png',
              selectedCanvasName: props.selectedCanvasName,
            })
          "
        >
          <AkDownload class="icon" />
          PNG
        </button>
        <button
          class="button"
          @click="
            downloadCanvasAsPNGorJPEG({
              canvas: canvas,
              fileExtension: 'jpeg',
              selectedCanvasName: props.selectedCanvasName,
            })
          "
        >
          <AkDownload class="icon" />
          JPEG
        </button>
        <button
          class="button"
          @click="
            downloadCanvasAsSvg({
              canvas: canvas,
              selectedCanvasName: props.selectedCanvasName,
            })
          "
        >
          <AkDownload class="icon" />
          SVG
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FabricCanvas from "@/components/FabricCanvas.vue";
import Switch from "@/components/Switch.vue";
import downloadCanvasAsPNGorJPEG from "@/utils/fabricUtils/downloadCanvasAsPNGorJPEG";
import downloadCanvasAsSvg from "@/utils/fabricUtils/downloadCanvasAsSvg";
import handleCanvasBackgroundColor from "@/utils/fabricUtils/handleCanvasBackgroundColor";
import getStoredCanvasStateByName from "@/utils/getStoredCanvasStateByName";
import { AkDownload, BxArrowBack } from "@kalimahapps/vue-icons";
import { fabric } from "fabric";
import { ref, watch } from "vue";
import { SAFETY_MARGIN_FOR_CANVAS } from "@/hardcoded";

const props = defineProps<{
  selectedCanvasName: string;
  handleBackButtonClick: () => void;
}>();

const isBackground = ref(false);
const canvas = ref<fabric.Canvas | null>(null);
const divRef = ref<HTMLDivElement | null>(null);

const handleChecked = () => {
  isBackground.value = !isBackground.value;
};

const handleCanvasCreated = (fabricCanvas: fabric.Canvas) => {
  if (!divRef.value) {
    return;
  }

  canvas.value = fabricCanvas;

  isBackground.value =
    fabricCanvas.backgroundColor === "transparent" ? false : true;

  const state = getStoredCanvasStateByName(props.selectedCanvasName);

  if (state && fabricCanvas) {
    fabricCanvas.loadFromJSON(state, () => {
      const objects = fabricCanvas.getObjects();
      const boundingBox = new fabric.Group(objects).getBoundingRect();

      for (let i = 0; i < objects.length; i++) {
        objects[i].set({
          evented: false,
          selectable: false,
        });
      }

      const newWidth = boundingBox.width + SAFETY_MARGIN_FOR_CANVAS;
      const newHeight = boundingBox.height + SAFETY_MARGIN_FOR_CANVAS;

      const scale = Math.min(
        fabricCanvas.getWidth() / newWidth,
        fabricCanvas.getHeight() / newHeight
      );

      // move canvas to center so that it is not cropped take into account the zoom
      fabricCanvas.absolutePan({
        y: boundingBox.top - SAFETY_MARGIN_FOR_CANVAS / 2,
        x: boundingBox.left - SAFETY_MARGIN_FOR_CANVAS / 2,
      });

      fabricCanvas.setZoom(scale);
    });
  }
};

watch(
  () => {
    return {
      isBackground: isBackground.value,
    };
  },
  async (newSate) => {
    const { isBackground } = newSate;

    handleCanvasBackgroundColor({
      canvas: canvas.value,
      backgroundColorType: isBackground ? "pattern" : "transparent",
    });
  }
);
</script>

<style scoped>
.button-container {
  display: flex;
  padding-bottom: 1rem;
}
.container {
  gap: 1rem;
  display: grid;
}
.canvas-container-side {
  width: 315px;
  display: flex;
  height: 230px;
  border-radius: 5px;
  position: relative;
  justify-content: center;
  background-size: 16px 16px;
  background-position: 8px 10px;
}

.back-button {
  border: none;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  background-color: transparent;
}

.settings-button-container {
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0rem;
  justify-content: flex-start;
}

.settings-container {
  gap: 0.5rem;
  height: 100%;
  display: flex;
  padding: 0.5rem 0rem;
  flex-direction: column;
  justify-content: flex-start;
}

.setting {
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button {
  border: none;
  display: flex;
  padding: 0.5rem;
  color: #343d4a;
  background-color: #f3f4f6;
  align-items: center;
  border-radius: 0.5rem;
  border: 1.5px solid transparent;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
}

.settings-container-side {
  width: 100%;
  display: flex;
  /* padding-left: 1rem; */
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--color-text);
}

.icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}

@media (hover: hover) {
  .button:hover {
    background-color: #d1d5db;
  }
}

/* Desktop */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }

  .container {
    grid-template-columns: repeat(auto-fit, minmax(320px, 48%));
  }
}
</style>
