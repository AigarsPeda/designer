import { ref, watch, type Ref, computed } from 'vue'

const useElementSize = <T extends HTMLElement>(element: Ref<T | null>) => {
  const elementSize = ref({
    width: 0,
    height: 0
  })

  const width = computed(() => elementSize.value.width)
  const height = computed(() => elementSize.value.height)

  let observer: ResizeObserver | null = null

  const disconnect = () => {
    if (observer !== null) {
      observer.disconnect()
      observer = null
    }
  }

  const connect = (element: T) => {
    if (!element) return

    disconnect()
    observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (rect) {
        elementSize.value.width = rect.width
        elementSize.value.height = rect.height
      }
    })

    observer.observe(element)
  }

  watch(element, (el) => {
    if (el) connect(el)
    else disconnect()
  })

  return {
    width,
    height
  }
}

export default useElementSize
