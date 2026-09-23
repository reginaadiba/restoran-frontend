<script>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

export default {
  components: { RouterView, NavBar },
}
</script>

<template>
  <div class="app-shell">
    <NavBar v-if="$route.name !== 'login'" />
    <main class="page-content" :class="{ 'page-content--login': $route.name === 'login' }">
      <RouterView />
    </main>
  </div>
</template>

<style>
html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  background: #f4f9ff;
}

.app-shell {
  min-height: 100vh;
}

.page-content {
  padding: 2rem 1rem 3rem;
}

.page-content--login {
  padding: 0;
}

@media (min-width: 768px) {
  .page-content {
    padding: 2.5rem 2rem 4rem;
  }
}
</style>
