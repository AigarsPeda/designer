<template>
  <nav>
    <div class="nav-navigation">
      <Logo />
    </div>
    <div class="nav-buttons">
      <Button
        v-for="option in menuOptions"
        isFullWidth
        :key="option.id"
        :title="option.title"
        :onClick="option.onClick"
        :isSelect="uiStore.getCanvasMode === option.canvasMode"
      >
        <template #icon>
          <vue-feather :type="option.icon" size="16" class="icon" />
        </template>
        <template #info>
          <p class="info">{{ option.keyShortCut }}</p>
        </template>
      </Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue";
import useMenuOptions from "@/composables/useMenuOptions";
import useUIStore from "@/stores/useUIStore";
import VueFeather from "vue-feather";

const uiStore = useUIStore();
const { menuOptions } = useMenuOptions();
</script>

<style scoped>
.nav-buttons {
  gap: 0.5rem;
  width: 100%;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.nav-navigation {
  gap: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.info {
  font-weight: 500;
  color: #64748b;
  font-size: 0.6rem;
}

nav {
  width: 5.5rem;
  gap: 0.5rem;
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
}
</style>
