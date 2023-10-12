import { ref, watch, type Ref } from "vue";

function useLocalStorage<T>(key: string, initialValue: T) {
  let storedValue: Ref<T>;

  // Get the initial value from localStorage or use the provided initial value
  if (localStorage.getItem(key) !== null) {
    storedValue = ref(JSON.parse(localStorage.getItem(key) || ""));
  } else {
    storedValue = ref(initialValue) as Ref<T>;
    localStorage.setItem(key, JSON.stringify(initialValue));
  }

  // Function to update the stored value and localStorage
  const updateValue = (newValue: T) => {
    storedValue.value = newValue;
  };

  // Watch for changes to the stored value and update localStorage accordingly
  watch(storedValue, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });

  return {
    storedValue,
    updateValue,
  };
}

export default useLocalStorage;
