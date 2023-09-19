<template>
  <div class="main-container">
    <div v-show="isNavBarVisible()">
      <button type="button" class="menu-button" @click="handleMenuOpen">
        <vue-feather type="menu" size="24" class="menu" />
      </button>
      <header ref="headerRef">
        <div v-if="uiStore.getCanvasMode === 'mainMenu'" :key="uiStore.getCanvasMode">
          <MainMenu />
        </div>
        <div v-if="uiStore.getCanvasMode === 'square'" :key="uiStore.getCanvasMode">
          <SquareMenu />
        </div>
        <div v-if="uiStore.getCanvasMode === 'drawing'" :key="uiStore.getCanvasMode">
          <DrawingMenu />
        </div>
      </header>

      <button class="over-lay" @click="handleMenuOpen"></button>
    </div>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import MainMenu from '@/components/MainMenu.vue'
import DrawingMenu from '@/components/contextMenus/DrawingMenu.vue'
import SquareMenu from '@/components/contextMenus/SquareMenu.vue'
import useUIStore from '@/stores/useUIStore'
import { ref } from 'vue'
import VueFeather from 'vue-feather'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const uiStore = useUIStore()
const isMenuOpen = ref(false)

const isNavBarVisible = () => {
  return route.path !== '/' && route.path !== '/about'
}

const handleMenuOpen = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
header {
  top: 1rem;
  left: 1rem;
  z-index: 100;
  position: absolute;
  border-radius: 0.5rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
  background-color: var(--color-background);
  box-shadow: var(--vt-c-shadow);
}

.menu-button {
  top: 0.5rem;
  left: 0.5rem;
  z-index: 100;
  border: none;
  display: none;
  padding: 0.4rem;
  position: absolute;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: center;
  color: var(--color-text);
  background-color: transparent;
  border: 1.5px solid var(--color-border);
}

.over-lay {
  top: 0;
  left: 0;
  z-index: 98;
  width: 100vw;
  height: 100vh;
  display: none;
  position: absolute;
  transition: all 0.2s ease-in-out;
  background: rgba(51, 65, 85, 0.403);
}

@media (max-width: 768px) {
  .menu-button {
    display: flex;
  }

  header {
    top: 0;
    left: 0;
    margin: 0;
    z-index: 100;
    height: 100vh;
    position: absolute;
    border-radius: 0 0.5rem 0.5rem 0;
    transition: all 0.3s ease-in-out;
    background: var(--color-background);
    transform: v-bind('`${isMenuOpen ? ' translateX(0) ' : ' translateX(-100%) '}`');
  }

  .over-lay {
    opacity: v-bind('`${isMenuOpen ? ' 1 ' : ' 0 '}`');
    display: v-bind('`${isMenuOpen ? ' block ' : ' none '}`');
  }
}
</style>
