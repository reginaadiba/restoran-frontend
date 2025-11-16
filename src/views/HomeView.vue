<template lang="">
  <div>
    
  </div>
</template>
<script>
import router from '@/router';

export default {
  data() {
    return {
      userName: ''
    }
  },
  mounted() {
    // jika tidak punya username maka ke login
    this.userName = localStorage.getItem('name')
    if (!this.userName || this.userName == '' || this.userName == null) {
      router.push({ name: 'login' })
    }
  },
}
</script>
<style lang="">

</style>