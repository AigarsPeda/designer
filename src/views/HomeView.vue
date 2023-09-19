<script setup lang="ts"></script>

<template>
  <main>
    <!-- <h1>Start designing</h1> -->
    <p>Siple and easy way to create</p>
    <RouterLink class="link" to="/design">Start</RouterLink>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

p {
  font-size: 1rem;
  font-weight: 700;
}

.link {
  margin-top: 1rem;
  padding: 0.3rem 3rem;
  border: 2px solid #000;
  border-radius: 0.3rem;
  text-decoration: none;
  font-weight: 500;
  color: #000;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

@media (hover: hover) {
  .link:hover {
    background-color: #000;
    color: #fff;
  }
}
</style>
