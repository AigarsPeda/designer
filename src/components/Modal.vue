<template>
  <Transition name="fade" mode="out-in">
    <div class="modal" v-if="isShowModal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-container">
        <div class="modal-header">
          <div>
            <!-- <h3>{{ title }}</h3> -->
          </div>
          <button class="modal-close" @click="closeModal">
            <ClCloseLg />
          </button>
        </div>
        <div class="modal-body">
          <slot name="modal-content" />
        </div>
        <div class="modal-footer">
          <button class="modal-button" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ClCloseLg } from "@kalimahapps/vue-icons";
defineProps<{
  zIndex?: number;
  maxwidth?: number;
  isShowModal: boolean;
  closeModal: () => void;
}>();
</script>

<style scoped>
.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: v-bind("`${zIndex || 900}`");
}

.modal-overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  width: 90%;
  border-radius: 5px;
  position: relative;
  background-color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: v-bind("`${maxwidth || 500}px`");
}

.modal-header {
  display: flex;
  padding: 0.7rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

.modal-header h3 {
  margin: 0;
}

.modal-close {
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  background-color: transparent;
}

.modal-body {
  padding: 0.7rem;
  transition: all 0.3s ease;
  /* max-height: 25rem; */
}

.modal-footer {
  display: flex;
  padding: 0.7rem;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #ccc;
}

.modal-button {
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 5px;
  padding: 0.7rem 1rem;
  background-color: #374151;
}

@media (hover: hover) {
  .modal-button:hover {
    background-color: #374151cc;
  }
}

/* Desktop */
@media (min-width: 768px) {
  .modal-header {
    padding: 1rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    padding: 1rem;
  }
}
</style>
