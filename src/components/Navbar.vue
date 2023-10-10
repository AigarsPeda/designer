<template>
  <div class="main-container">
    <div v-show="isNavBarVisible()">
      <button type="button" class="menu-button" @click="handleMenuOpen">
        <vue-feather type="menu" size="24" class="menu" />
      </button>
      <header ref="headerRef">
        <Transition name="fade" mode="out-in">
          <component :is="activeComponent"></component>
        </Transition>
      </header>

      <button class="over-lay" @click="handleMenuOpen"></button>
    </div>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import MainMenu from "@/components/MainMenu.vue";
import DrawingMenu from "@/components/contextMenus/DrawingMenu.vue";
import ObjContextMenu from "@/components/contextMenus/ObjContextMenu.vue";
import SquareMenu from "@/components/contextMenus/SquareMenu.vue";
import useMenuOptions from "@/composables/useMenuOptions";
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import useUIStore from "@/stores/useUIStore";
import { onMounted, ref, shallowRef, watch } from "vue";
import VueFeather from "vue-feather";
import { RouterView, useRoute } from "vue-router";

const activeComponent = shallowRef(MainMenu);

const route = useRoute();
const uiStore = useUIStore();
const isMenuOpen = ref(false);
const { menuOptions } = useMenuOptions();
const localStorageCanvas = useLocalStorageCanvas();

const isNavBarVisible = () => {
  return route.path !== "/" && route.path !== "/about";
};

const handleMenuOpen = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  // add listener for escape key to close menu
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      uiStore.setCanvasMode({
        canvasMode: "mainMenu",
      });
    }

    for (const option of menuOptions) {
      if (e.key === option.keyShortCut) {
        option.onClick();
      }
    }

    // on command + c or ctrl + c copy selected object
    if ((e.metaKey || e.ctrlKey) && e.key === "c") {
      localStorageCanvas.copyCanvasActiveObjects();
    }

    // on command + v or ctrl + v paste selected object
    if ((e.metaKey || e.ctrlKey) && e.key === "v") {
      localStorageCanvas.pasteCanvasActiveObjects();
    }
  };

  window.addEventListener("keydown", handleKeyPress);

  return () => {
    window.removeEventListener("keydown", handleKeyPress);
  };
});

watch(
  () => {
    return {
      getCanvasMode: uiStore.getCanvasMode,
    };
  },
  (newSate) => {
    const { getCanvasMode } = newSate;

    if (getCanvasMode === "mainMenu") {
      activeComponent.value = MainMenu;
    } else if (
      getCanvasMode === "square" ||
      getCanvasMode === "arrow" ||
      getCanvasMode === "line"
    ) {
      activeComponent.value = SquareMenu;
    } else if (getCanvasMode === "drawing") {
      activeComponent.value = DrawingMenu;
    } else if (getCanvasMode === "ObjContextMenu") {
      activeComponent.value = ObjContextMenu;
    }
  }
);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.over-lay {
  top: 0;
  left: 0;
  z-index: 98;
  width: 100vw;
  height: 100vh;
  display: none;
  position: absolute;
  transition: all 0.25s ease-in-out;
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
    transform: v-bind(
      "`${isMenuOpen ?  'translateX(0)'  :  'translateX(-100%)' }`"
    );
  }

  .over-lay {
    opacity: v-bind("`${isMenuOpen ? ' 1 ' : ' 0 '}`");
    display: v-bind("`${isMenuOpen ? ' block ' : ' none '}`");
  }
}
</style>
