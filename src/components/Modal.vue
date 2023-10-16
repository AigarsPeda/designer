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
  isShowModal: boolean;
  closeModal: () => void;
}>();
</script>

<style>
.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 9999;
  position: fixed;
  align-items: center;
  justify-content: center;
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
  max-width: 500px;
  border-radius: 5px;
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  padding: 1rem;
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
  padding: 1rem;
}

.modal-footer {
  display: flex;
  padding: 1rem;
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
  padding: 0.5rem 1rem;
  background-color: #374151;
}

@media (hover: hover) {
  .modal-button:hover {
    background-color: #374151cc;
  }
}
</style>
