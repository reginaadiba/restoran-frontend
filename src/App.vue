<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      userName: localStorage.getItem('name')
    }
  },
}
</script>

<template>

  <RouterView />
</template>

<style scoped></style>
