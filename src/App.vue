<script setup>
import IndexPage from './pages/IndexPage.vue'
</script>

<template>
  <div class="global-container">
    <IndexPage />
  </div>
</template>

<style scoped>
.global-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-color);
  overflow: auto;
}
</style>
