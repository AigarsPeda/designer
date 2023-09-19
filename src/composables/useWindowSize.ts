import { computed, onMounted, onUnmounted, ref } from 'vue'

const useWindowSize = () => {
  let windowSize = ref({
    type: 'lg',
    width: window.innerWidth,
    height: window.innerHeight
  })

  const width = computed(() => windowSize.value.width)
  const height = computed(() => windowSize.value.height)
  const type = computed(() => {
    if (windowSize.value.width < 550) return 'xs'
    if (windowSize.value.width >= 550 && windowSize.value.width < 1200) return 'md'
    else return 'lg'
  })

  onMounted(() =>
    window.addEventListener('resize', () => {
      onWidthChange()
      onHeightChange()
    })
  )
  onUnmounted(() =>
    window.removeEventListener('resize', () => {
      onWidthChange()
      onHeightChange()
    })
  )

  const onWidthChange = () => (windowSize.value.width = window.innerWidth)
  const onHeightChange = () => (windowSize.value.height = window.innerHeight)

  return { width, height, type: type }
}

export default useWindowSize
