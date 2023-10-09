import useLocalStorage from "@/composables/useLocalStorage";
import useCanvasStore from "@/stores/useCanvasStore";
import addObjToCanvasFromArray from "@/utils/fabricUtils/addObjToCanvasFromArray";
import copyActiveObjects from "@/utils/fabricUtils/copyActiveObjects";
import { fabric } from "fabric";
import { defineStore } from "pinia";

const useCopyPastaCanvasObj = defineStore("cart", () => {
  const canvasStore = useCanvasStore();
  const { storedValue, updateValue } = useLocalStorage<fabric.Object[]>(
    "savedObj",
    []
  );

  const copyCanvasActiveObjects = () => {
    const clonedArray = copyActiveObjects({
      canvas: canvasStore.getSelectedCanvas,
    });

    updateValue(clonedArray);
  };

  const pasteCanvasActiveObjects = () => {
    const array = storedValue.value || [];
    const canvas = canvasStore.getSelectedCanvas;

    addObjToCanvasFromArray({
      canvas,
      objectsArray: array,
    });
  };

  return { copyCanvasActiveObjects, pasteCanvasActiveObjects };
});

export default useCopyPastaCanvasObj;
