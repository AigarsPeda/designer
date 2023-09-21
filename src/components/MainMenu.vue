<template>
  <nav>
    <div class="nav-navigation">
      <Logo />
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/about">About</RouterLink>
    </div>
    <div class="nav-buttons">
      <Button
        isFullWidth
        title="Draw"
        :isSelect="uiStore.getCanvasMode === 'drawing'"
        @click="
          uiStore.setCanvasMode({
            canvasMode:
              uiStore.getCanvasMode === 'drawing' ? 'mainMenu' : 'drawing',
          })
        "
      >
        <template #icon>
          <vue-feather type="edit-2" size="16" class="icon" />
        </template>
      </Button>
      <Button
        isFullWidth
        title="Square"
        :isSelect="uiStore.getCanvasMode === 'square'"
        @click="
          uiStore.setCanvasMode({
            canvasMode:
              uiStore.getCanvasMode === 'square' ? 'mainMenu' : 'square',
          })
        "
      >
        <template #icon>
          <vue-feather type="square" size="16" class="icon" />
        </template>
      </Button>
      <Button
        isFullWidth
        title="Move"
        :isSelect="uiStore.getCanvasMode === 'panning'"
        @click="
          uiStore.setCanvasMode({
            canvasMode:
              uiStore.getCanvasMode === 'panning' ? 'mainMenu' : 'panning',
          })
        "
      >
        <template #icon>
          <vue-feather type="crosshair" size="16" class="icon" />
        </template>
      </Button>
      <Button
        isFullWidth
        title="Background"
        :isSelect="uiStore.getIsDotBackground"
        @click="
          uiStore.setIsDotBackground({
            isDotBackground: !uiStore.getIsDotBackground,
          })
        "
      >
        <template #icon>
          <vue-feather type="grid" size="16" class="icon" />
        </template>
      </Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue";
import useUIStore from "@/stores/useUIStore";
import VueFeather from "vue-feather";
import { RouterLink } from "vue-router";

const uiStore = useUIStore();
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
