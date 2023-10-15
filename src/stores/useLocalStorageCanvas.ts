import useLocalStorage from "@/composables/useLocalStorage";
import { DEFAULT_CANVAS_NAME } from "@/hardcoded";
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

  const storedSelectedCanvasName = useLocalStorage(
    "storedSelectedCanvasName",
    DEFAULT_CANVAS_NAME
  );

  const storedObjects = useLocalStorage<fabric.Object[]>("storedObjects", []);

  const storedCanvasSate = useLocalStorage<StoredCanvasSate>(
    "storedCanvas",
    {}
  );

  const storedScreenShots = useLocalStorage<StoredScreenShots>(
    "storedScreenShots",
    {}
  );

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

    storedScreenShots.updateValue({
      ...storedScreenShots.storedValue.value,
      [name]: png,
    });

    if (!storedCanvasSate.storedValue.value) {
      storedCanvasSate.updateValue({
        [name]: [state],
      });
      return;
    }

    // const arr = storedCanvasSate.value[name];
    const arr = storedCanvasSate.storedValue.value[name];

    if (!arr) {
      storedCanvasSate.updateValue({
        ...storedCanvasSate.storedValue.value,
        [name]: [state],
      });
      return;
    }

    // store only 10 states
    if (arr.length >= 10) {
      arr.shift();
    }

    // arr.push(state);

    storedCanvasSate.updateValue({
      ...storedCanvasSate.storedValue.value,
      [name]: [...arr, state],
    });
  };

  const deleteCanvasStateFromLocalStorage = ({ name }: { name: string }) => {
    if (!storedCanvasSate.storedValue.value) {
      return;
    }

    storedScreenShots.updateValue({
      ...storedScreenShots.storedValue.value,
      [name]: "",
    });

    storedCanvasSate.updateValue({
      ...storedCanvasSate.storedValue.value,
      [name]: [],
    });

    canvasStore.getSelectedCanvas?.clear();
  };

  const copyCanvasActiveObjects = () => {
    const clonedArray = copyActiveObjects({
      canvas: canvasStore.getSelectedCanvas,
    });

    storedObjects.updateValue(clonedArray);
  };

  const pasteCanvasActiveObjects = () => {
    const array = storedObjects.storedValue.value;
    const canvas = canvasStore.getSelectedCanvas;

    addObjToCanvasFromArray({
      canvas,
      objectsArray: array,
    });
  };

  return {
    storedCanvasSate,
    storedScreenShots,
    storedSelectedCanvasName,
    copyCanvasActiveObjects,
    pasteCanvasActiveObjects,
    addCanvasStateToLocalStorage,
    deleteCanvasStateFromLocalStorage,
  };
});

export default useLocalStorageCanvas;
