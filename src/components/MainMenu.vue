<template>
  <nav>
    <div class="nav-navigation">
      <Logo />
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/about">About</RouterLink>
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
import { RouterLink } from "vue-router";

const uiStore = useUIStore();
const { menuOptions } = useMenuOptions();
</script>

<style scoped>
header {
  top: 1rem;
  left: 1rem;
  z-index: 100;
  position: absolute;
  border-radius: 0.5rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
  box-shadow: var(--vt-c-shadow);
  background-color: var(--color-background);
}

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

.link {
  transition: 0.4s;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--color-text);
  border-bottom: 1px solid transparent;
}
.info {
  font-weight: 500;
  color: #64748b;
  /* color: red; */
  font-size: 0.6rem;
  /* padding-left: 0.5rem; */
}

nav {
  width: 5.5rem;
  gap: 0.5rem;
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
}

@media (hover: hover) {
  .link:hover {
    border-bottom: 1px solid var(--color-text);
  }
}
</style>
