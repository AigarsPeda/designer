import useLocalStorage from "@/composables/useLocalStorage";
import useCanvasStore from "@/stores/useCanvasStore";
import addObjToCanvasFromArray from "@/utils/fabricUtils/addObjToCanvasFromArray";
import copyActiveObjects from "@/utils/fabricUtils/copyActiveObjects";
import { fabric } from "fabric";
import { defineStore } from "pinia";

type CanvasState = {
  version: string;
  objects: fabric.Object[];
};

type StoredCanvasSate = {
  [key: string]: CanvasState[];
};

const useLocalStorageCanvas = defineStore("localStorageCanvas", () => {
  const canvasStore = useCanvasStore();
  const { storedValue: storedObjects, updateValue: updateStoredObjects } =
    useLocalStorage<fabric.Object[]>("storedObjects", []);

  const { storedValue: storedCanvasSate, updateValue: updateStoredCanvasSate } =
    useLocalStorage<StoredCanvasSate>("storedCanvas", {});

  const addCanvasStateToLocalStorage = ({
    name,
    state,
  }: {
    name: string;
    state: CanvasState;
  }) => {
    if (!storedCanvasSate.value) {
      updateStoredCanvasSate({
        [name]: [state],
      });
      return;
    }

    const arr = storedCanvasSate.value[name];

    // store only 10 states
    if (arr.length >= 10) {
      arr.shift();
    }

    updateStoredCanvasSate({
      [name]: [...arr, state],
    });
  };

  const deleteCanvasStateFromLocalStorage = ({ name }: { name: string }) => {
    if (!storedCanvasSate.value) {
      return;
    }

    // const arr = storedCanvasSate.value[name];

    // if (arr.length > 1) {
    //   arr.pop();
    // }

    updateStoredCanvasSate({
      [name]: [],
    });

    canvasStore.getSelectedCanvas?.clear();
  };

  const copyCanvasActiveObjects = () => {
    const clonedArray = copyActiveObjects({
      canvas: canvasStore.getSelectedCanvas,
    });

    updateStoredObjects(clonedArray);
  };

  const pasteCanvasActiveObjects = () => {
    const array = storedObjects.value || [];
    const canvas = canvasStore.getSelectedCanvas;

    addObjToCanvasFromArray({
      canvas,
      objectsArray: array,
    });
  };

  return {
    storedCanvasSate,
    copyCanvasActiveObjects,
    pasteCanvasActiveObjects,
    addCanvasStateToLocalStorage,
    deleteCanvasStateFromLocalStorage,
  };
});

export default useLocalStorageCanvas;
