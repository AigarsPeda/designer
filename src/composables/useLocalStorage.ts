import { ref, watch, type Ref } from "vue";

// type ValueTypes = string | number | boolean | null | undefined

function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue: Ref<T | null> = ref(null);

  // Get the initial value from localStorage or use the provided initial value
  if (localStorage.getItem(key) !== null) {
    storedValue.value = JSON.parse(localStorage.getItem(key) || "") as T;
  } else {
    storedValue.value = initialValue;
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

  return { storedValue, updateValue };
}

export default useLocalStorage;
