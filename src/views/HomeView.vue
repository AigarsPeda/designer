<template>
  <main>
    <div class="blob-container">
      <!-- <Blob /> -->
      <!-- <RouterLink class="link" to="/design">Start</RouterLink> -->
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
main {
  display: flex;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-image: radial-gradient(#bbbbbb 0.75px, transparent 0.75px),
    radial-gradient(#bbbbbb 0.75px, #ffffff 0.75px);
  background-size: 30px 30px;
  background-position:
    0 0,
    15px 15px;
}

.blob-container {
  opacity: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.blob-container img {
  width: 15rem;
}

.link {
  margin-top: 1rem;
  font-weight: 600;
  color: #2d2d2d;
  font-size: 1.6rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  padding: 0.1rem 0.1rem;
  transition: all 0.2s ease-in-out;
  font-family: "Montserrat", sans-serif;
  border-bottom: 3px solid transparent;
}

@media (hover: hover) {
  .link:hover {
    border-bottom: 3px solid #2d2d2d;
  }
}
</style>
