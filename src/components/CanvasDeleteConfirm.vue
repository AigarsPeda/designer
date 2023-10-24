<template>
  <div class="delete-confirm-container">
    <div class="delete-confirm-content">
      <h2 class="delete-confirm-title">Delete Canvas</h2>
      <p class="delete-confirm-text">
        Are you sure you want to delete the canvas named
        <span class="delete-confirm-canvas-name">{{
          selectedDeleteCanvasName
        }}</span>
        ?
      </p>
      <div class="delete-confirm-button-container">
        <button class="button cancel" @click="handleDeleteCancelButtonClick">
          <vue-feather type="arrow-left" size="16" class="icon" />
          Cancel
        </button>
        <button class="button confirm" @click="handleDeleteButtonClick">
          <vue-feather type="trash-2" size="16" class="icon" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueFeather from "vue-feather";

defineProps<{
  selectedDeleteCanvasName: string;
  handleDeleteButtonClick: () => void;
  handleDeleteCancelButtonClick: () => void;
}>();
</script>

<style scoped>
.delete-confirm-button-container {
  gap: 0.5rem;
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
}

.delete-confirm-canvas-name {
  font-weight: 600;
  color: var(--color-text);
}

.delete-confirm-text {
  font-size: 0.8rem;
  color: var(--color-text);
}

.delete-confirm-title {
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--color-text);
}

.button {
  border: none;
  display: flex;
  /* font-weight: 600; */
  font-size: 0.8rem;
  border: transparent;
  align-items: center;
  padding: 0.6rem 0.9rem;
  /* padding: 0.7rem 1rem; */
  border-radius: 0.5rem;
  justify-content: center;
}

.confirm {
  color: #f9fafb;
  background-color: #dc2626;
}

.confirm .icon {
  margin-right: 0.5rem;
  color: #f9fafb;
}

.cancel {
  background-color: var(--color-error);
}

.icon {
  margin-right: 0.5rem;
  color: var(--color-text);
}
</style>
