<template>
  <div class="container" ref="containerRef">
    <canvas id="canvas" ref="canvasReference" />
  </div>
</template>

<script setup lang="ts">
import handleCanvasResize from "@/utils/fabricUtils/handleCanvasResize";
import handleCanvasZoom from "@/utils/fabricUtils/handleCanvasZoom";
import scalingObjAndPreservingCorners from "@/utils/fabricUtils/scalingObjAndPreservingCorners";
import { fabric } from "fabric";
import { onMounted, ref } from "vue";

const canvasRef = ref<fabric.Canvas | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
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
    width: containerRef.value?.offsetWidth || 375,
    height: containerRef.value?.offsetHeight || 667,
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

  canvas.on("object:scaling", (opt) => {
    if (opt.target && opt.target.type === "rect") {
      scalingObjAndPreservingCorners(opt);
      return;
    }
  });

  canvas.on("object:modified", (opt) => {
    emit("object-modified", opt);
    // opt.target?.set({
    //   opacity: 1, // Set opacity back to 1
    // });

    // canvas.renderAll();
  });

  // canvas.on("object:moving", (opt) => {
  //   opt.target?.set({
  //     opacity: 0.75,
  //   });
  //   canvas.renderAll();
  // });

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
  box-shadow: var(--vt-box-shadow);
}
</style>
