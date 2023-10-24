import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";

const getStoredCanvasStateByName = (name: string) => {
  const { storedCanvasSate } = useLocalStorageCanvas();

  const state = storedCanvasSate.storedValue[name];
  const length = state ? state.length : undefined;

  return length ? state[state.length - 1] : [];
};

export default getStoredCanvasStateByName;
