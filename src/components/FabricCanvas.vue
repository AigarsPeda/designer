<template>
  <div class="container" ref="containerRef">
    <canvas id="canvas" ref="canvasReference" :width="500" :height="500" />
  </div>
</template>

<script setup lang="ts">
import handleCanvasResize from "@/utils/fabricUtils/handleCanvasResize";
import handleCanvasZoom from "@/utils/fabricUtils/handleCanvasZoom";
import { fabric } from "fabric";
import { onMounted, ref } from "vue";

const props = defineProps<{
  id: string;
}>();

const canvasRef = ref<fabric.Canvas | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const lastContainerSizeRef = ref({ width: 0, height: 0 });
const canvasReference = ref<HTMLCanvasElement | null>(null);

const emit = defineEmits<{
  // (e: "mouse:dblclick"): void;
  (e: "canvas-created", canvas: fabric.Canvas): void;
  (e: "selection-created", opt: fabric.IEvent): void;
  (e: "selection-cleared", opt: fabric.IEvent): void;
  (e: "selection-updated", opt: fabric.IEvent): void;
}>();

onMounted(() => {
  const canvas = new fabric.Canvas(canvasReference.value, {
    width: containerRef.value?.offsetWidth || 500,
    height: containerRef.value?.offsetHeight || 500,
  });

  if (!canvas) {
    return;
  }

  canvasRef.value = canvas;
  emit("canvas-created", canvas);

  canvas.on("selection:created", (opt) => {
    emit("selection-created", opt);
  });

  canvas.on("selection:updated", (opt) => {
    emit("selection-updated", opt);
  });

  canvas.on("selection:cleared", (opt) => {
    emit("selection-cleared", opt);
  });

  lastContainerSizeRef.value = {
    width: containerRef.value?.offsetWidth || 500,
    height: containerRef.value?.offsetHeight || 500,
  };

  handleCanvasZoom({ canvas });

  window.addEventListener("resize", () => {
    handleCanvasResize({
      canvas,
      containerRef: containerRef.value,
    });
  });
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

#canvas {
  border-radius: 0.5rem;
  background-color: var(--color-background-soft);
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
../utils/fabricUtils/resetCanvasMouseMoveUpDown
