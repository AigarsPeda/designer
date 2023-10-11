import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";

const getStoredCanvasStateByName = (name: string) => {
  const { storedCanvasSate } = useLocalStorageCanvas();

  const state = storedCanvasSate.storedValue;

  if (state) {
    const length = state[name].length;
    const s = state[name][length - 1];

    return s;
  }
};

export default getStoredCanvasStateByName;
