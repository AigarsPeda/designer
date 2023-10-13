<template>
  <div class="container" ref="containerRef">
    <canvas id="canvas" ref="canvasReference" />
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
  (e: "canvas-created", canvas: fabric.Canvas): void;
  (e: "mouse-down", opt: fabric.IEvent<MouseEvent>): void;
  (e: "object-added", opt: fabric.IEvent<MouseEvent>): void;
  (e: "mouse-dblclick", opt: fabric.IEvent<MouseEvent>): void;
  (e: "object-removed", opt: fabric.IEvent<MouseEvent>): void;
  (e: "object-modified", opt: fabric.IEvent<MouseEvent>): void;
  (e: "selection-created", opt: fabric.IEvent<MouseEvent>): void;
  (e: "selection-cleared", opt: fabric.IEvent<MouseEvent>): void;
  (e: "selection-updated", opt: fabric.IEvent<MouseEvent>): void;
}>();

onMounted(() => {
  const canvas = new fabric.Canvas(canvasReference.value, {
    preserveObjectStacking: true,
    width: containerRef.value?.offsetWidth || 500,
    height: containerRef.value?.offsetHeight || 500,
    backgroundColor: "#fff",
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

  canvas.on("mouse:dblclick", (opt) => {
    emit("mouse-dblclick", opt);
  });

  canvas.on("mouse:down:before", (opt) => {
    emit("mouse-down", opt);
  });

  canvas.on("object:added", (opt) => {
    emit("object-added", opt);
  });

  canvas.on("object:removed", (opt) => {
    emit("object-removed", opt);
  });

  canvas.on("object:modified", (opt) => {
    emit("object-modified", opt);
    opt.target?.set({
      opacity: 1, // Set opacity back to 1
    });

    canvas.renderAll();
  });

  canvas.on("object:moving", (opt) => {
    opt.target?.set({
      opacity: 0.75,
    });
    canvas.renderAll();
  });

  // canvas.on("object:scaling", (opt) => {
  //   console.log(opt);
  // });

  // lastContainerSizeRef.value = {
  //   width: containerRef.value?.offsetWidth || 500,
  //   height: containerRef.value?.offsetHeight || 500,
  // };

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
