<template>
  <component class="icon" :is="icon" />
</template>

<script setup lang="ts">
defineProps<{
  icon: () => JSX.Element;
}>();
</script>

<style scoped>
.icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}
</style>
