<template>
  <main>
    <div class="blob-container">
      <Blob />
      <div class="blob-content">
        <RouterLink class="link" to="/design">Start</RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import Blob from "@/components/Blob.vue";
</script>

<style scoped>
main {
  display: flex;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

p {
  font-weight: 700;
  color: #f9fafb;
  font-size: 1.2rem;
}

.blob-container {
  position: relative;
  background-color: #f8fafc;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blob-content {
  top: 50%;
  left: 50%;
  display: flex;
  position: absolute;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transform: translate(-50%, -50%);
}

.blob-container svg {
  width: 35rem;
}

.link {
  margin-top: 1rem;
  font-weight: 600;
  color: #ffffff;
  font-size: 1.4rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  padding: 0.3rem 0.5rem;
  transition: all 0.2s ease-in-out;
  font-family: "Nunito", sans-serif;
  border-bottom: 3px solid transparent;
}

@media (hover: hover) {
  .link:hover {
    border-bottom: 3px solid #f9fafb;
  }
}
</style>
