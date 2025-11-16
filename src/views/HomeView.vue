<template lang="">
  <!-- NavBar components -->
   <NavBar :name="userName" :role="roleId" />
  <div>
    
  </div>
</template>
<script>
import router from '@/router';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      userName: '',
      roleId: ''
    }
  },
  mounted() {
    // jika tidak punya username maka ke login
    this.userName = localStorage.getItem('name')
    this.roleId = localStorage.getItem('role_id')
    if (!this.userName || this.userName == '' || this.userName == null) {
      router.push({ name: 'login' })
    }
    this.roleId = localStorage.getItem('role_id')
    if (this.roleId != 1 && this.roleId != 4) {
      router.push({ name: 'home' })
    }
  },
}
</script>
<style lang="">

</style>