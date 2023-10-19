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
        <button class="button" @click="console.log('--->')">
          <AkDownload class="icon" />
          PNG
        </button>
        <button class="button" @click="console.log('--->')">
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
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import calculateScale from "@/utils/calculateScale";
import getStoredCanvasStateByName from "@/utils/getStoredCanvasStateByName";
import { AkDownload, BxArrowBack } from "@kalimahapps/vue-icons";
import { ref } from "vue";

const divRef = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  selectedCanvasName: string;
  handleBackButtonClick: () => void;
}>();

const isBackground = ref(false);
const { storedCanvasMetaData } = useLocalStorageCanvas();

const handleChecked = () => {
  isBackground.value = !isBackground.value;
};

const handleCanvasCreated = (fabricCanvas: fabric.Canvas) => {
  if (!divRef.value) {
    return;
  }

  const meta = storedCanvasMetaData.storedValue[props.selectedCanvasName];

  const scale2 = calculateScale(
    {
      width: meta.dimensions.width,
      height: meta.dimensions.height,
    },
    {
      width: fabricCanvas.getWidth(),
      height: fabricCanvas.getHeight(),
    }
  );

  const scale = Math.min(
    fabricCanvas.getWidth() / meta.dimensions.width,
    fabricCanvas.getHeight() / meta.dimensions.height
  );

  console.log("scale", scale.toFixed(2));
  console.log("scale2", scale2.toFixed(2));

  // set canvas zoom so that all objects are visible

  // fabricCanvas.setZoom(parseFloat(scale.toFixed(2)));
  fabricCanvas.setZoom(0.3);
  const state = getStoredCanvasStateByName(props.selectedCanvasName);

  if (state && fabricCanvas) {
    fabricCanvas.loadFromJSON(state, fabricCanvas.renderAll.bind(fabricCanvas));

    fabricCanvas.forEachObject((obj) => {
      obj.setOptions({
        evented: false,
        selectable: false,
      });
    });

    fabricCanvas.renderAll();
  }
};
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
  height: 305px;
  border-radius: 5px;
  position: relative;
  background-color: #fff;
  box-shadow: var(--vt-box-shadow);
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
