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

type StoredCanvasMetaDataType = {
  [key: string]: {
    screenShot: string;
    dimensions: {
      width: number;
      height: number;
    };
  };
};

const useLocalStorageCanvas = defineStore("localStorageCanvas", () => {
  const canvasStore = useCanvasStore();

  const storedSelectedCanvasName = useLocalStorage(
    "storedSelectedCanvasName",
    DEFAULT_CANVAS_NAME
  );

  const storedObjects = useLocalStorage<fabric.Object[]>("storedObjects", []);

  const storedCanvasSate = useLocalStorage<StoredCanvasSate>("storedCanvas", {
    [DEFAULT_CANVAS_NAME]: [],
  });

  const storedCanvasMetaData = useLocalStorage<StoredCanvasMetaDataType>(
    "storedCanvasMetaData",
    {
      [DEFAULT_CANVAS_NAME]: {
        screenShot: "",
        dimensions: {
          width: 0,
          height: 0,
        },
      },
    }
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

    const storedCanvasMeta = storedCanvasMetaData.storedValue.value[name];
    const dimensions = storedCanvasMeta?.dimensions;

    storedCanvasMetaData.updateValue({
      ...storedCanvasMetaData.storedValue.value,
      [name]: {
        screenShot: png,
        dimensions: {
          width: dimensions?.width ?? canvasStore.getSelectedCanvas?.width ?? 0,
          height:
            dimensions?.height ?? canvasStore.getSelectedCanvas?.height ?? 0,
        },
      },
    });

    const arr = storedCanvasSate.storedValue.value[name];

    // store only 10 states
    if (arr && arr.length >= 10) {
      arr.shift();
    }

    storedCanvasSate.updateValue({
      ...storedCanvasSate.storedValue.value,
      [name]: [...(arr || []), state],
    });
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
    storedCanvasMetaData,
    storedSelectedCanvasName,
    copyCanvasActiveObjects,
    pasteCanvasActiveObjects,
    addCanvasStateToLocalStorage,
  };
});

export default useLocalStorageCanvas;
