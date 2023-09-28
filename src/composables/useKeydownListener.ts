import { onMounted, onBeforeUnmount, ref } from "vue";

const useKeydownListener = (handler: (event: KeyboardEvent) => void) => {
  const savedHandler = ref<((event: KeyboardEvent) => void) | null>(null);

  const addListener = () => {
    if (!savedHandler.value) {
      return;
    }

    window.addEventListener("keydown", savedHandler.value);
  };

  const removeListener = () => {
    if (!savedHandler.value) {
      return;
    }
    window.removeEventListener("keydown", savedHandler.value);
  };

  onMounted(() => {
    savedHandler.value = handler;
  });

  onBeforeUnmount(() => {
    removeListener();
  });

  return { addListener, removeListener };
};

export default useKeydownListener;
