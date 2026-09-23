<template>
  <div class="container mt-3">
    <div class="user-form col-12 col-lg-6">
      <div class="mb-4">
        <p class="eyebrow">Manajemen akses</p>
        <h2>Tambah Pengguna</h2>
      </div>

      <form @submit.prevent="createUser">
        <div class="mb-3"><label for="name" class="form-label">Nama</label><input id="name" v-model.trim="form.name" type="text" class="form-control" required></div>
        <div class="mb-3"><label for="email" class="form-label">Email</label><input id="email" v-model.trim="form.email" type="email" class="form-control" required></div>
        <div class="mb-3"><label for="password" class="form-label">Password</label><input id="password" v-model="form.password" type="password" class="form-control" minlength="6" required></div>
        <div class="mb-4">
          <label for="roleId" class="form-label">Role</label>
          <select id="roleId" v-model.number="form.role_id" class="form-select" required>
            <option :value="null" disabled>Pilih role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
        </div>
        <div class="d-flex gap-2"><button class="btn btn-primary" type="submit" :disabled="submitting">{{ submitting ? 'Menyimpan...' : 'Simpan' }}</button><RouterLink class="btn btn-outline-secondary" :to="{ name: 'userAdd' }">Batal</RouterLink></div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
  data() {
    return { form: { name: '', email: '', password: '', role_id: null }, roles: [], submitting: false }
  },
  mounted() { this.getRoles() },
  methods: {
    authConfig() { return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } } },
    getRoles() {
      axios.get(`${import.meta.env.VITE_API_URL}/role`, this.authConfig())
        .then((response) => { this.roles = response.data.data || response.data })
        .catch((error) => { console.error(error); alert('Data role gagal dimuat') })
    },
    createUser() {
      this.submitting = true
      axios.post(`${import.meta.env.VITE_API_URL}/user`, this.form, this.authConfig())
        .then(() => router.push({ name: 'userAdd' }))
        .catch((error) => { console.error(error); alert(error.response?.data?.message || 'Pengguna gagal ditambahkan') })
        .finally(() => { this.submitting = false })
    },
  },
}
</script>

<style scoped>
.user-form { padding: 2rem; border: 1px solid #d7eaf8; border-radius: 12px; background: #fff; box-shadow: 0 8px 24px rgba(41, 93, 145, 0.08); }
.eyebrow { margin-bottom: 0.35rem; color: #2f86c8; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
</style>
