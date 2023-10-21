import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";

const getStoredCanvasStateByName = (name: string) => {
  const { storedCanvasSate } = useLocalStorageCanvas();

  const state = storedCanvasSate.storedValue[name];

  // if (!state) {
  //   return;
  // }

  const length = state.length;
  // const s = state[name][length - 1];

  return state[length - 1] || [];

  // return s;
};

export default getStoredCanvasStateByName;
