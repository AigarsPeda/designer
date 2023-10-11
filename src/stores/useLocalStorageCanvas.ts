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

type StoredScreenShots = {
  [key: string]: string;
};

const useLocalStorageCanvas = defineStore("localStorageCanvas", () => {
  const canvasStore = useCanvasStore();
  const { storedValue: storedObjects, updateValue: updateStoredObjects } =
    useLocalStorage<fabric.Object[]>("storedObjects", []);

  const { storedValue: storedCanvasSate, updateValue: updateStoredCanvasSate } =
    useLocalStorage<StoredCanvasSate>("storedCanvas", {});

  const {
    storedValue: storedCanvasScreenShots,
    updateValue: updateStoredCanvasScreenShots,
  } = useLocalStorage<StoredScreenShots>("storedCanvasNames", {});

  const addCanvasStateToLocalStorage = ({
    name,
    state,
  }: {
    name: string;
    state: CanvasState;
  }) => {
    const png = canvasStore.getSelectedCanvas?.toDataURL({
      format: "png",
      quality: 0.5,
    });

    if (!png) {
      return;
    }

    // On every save, update the storedCanvasScreenShots
    updateStoredCanvasScreenShots({
      ...storedCanvasScreenShots.value,
      [name]: png,
    });

    if (!storedCanvasSate.value) {
      updateStoredCanvasSate({
        [name]: [state],
      });
      return;
    }

    const arr = storedCanvasSate.value[name];

    if (!arr) {
      updateStoredCanvasSate({
        ...storedCanvasSate.value,
        [name]: [state],
      });
      return;
    }

    // store only 10 states
    if (arr.length >= 10) {
      arr.shift();
    }

    updateStoredCanvasSate({
      ...storedCanvasSate.value,
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
    storedCanvasScreenShots,
    copyCanvasActiveObjects,
    pasteCanvasActiveObjects,
    addCanvasStateToLocalStorage,
    deleteCanvasStateFromLocalStorage,
  };
});

export default useLocalStorageCanvas;
