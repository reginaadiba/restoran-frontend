<template>
    <div class="container mt-3">
        <div class="page-heading">
            <div>
                <p class="eyebrow">Manajemen akses</p>
                <h2>Kelola Pengguna</h2>
                <p class="text-muted mb-0">Daftar pengguna yang memiliki akses ke sistem restoran.</p>
            </div>
            <RouterLink class="btn btn-primary" :to="{ name: 'userCreate' }">Tambah Pengguna</RouterLink>
        </div>

        <DataTable :items="users" :columns="columns" :loading="loading" empty-text="Belum ada data pengguna.">
            <template #cell-role="{ item }">
                {{ item.role?.name || item.role_id }}
            </template>
            <template #actions="{ item }">
                <RouterLink class="btn btn-sm btn-outline-primary me-2"
                    :to="{ name: 'userEdit', params: { userId: item.id } }">
                    Edit
                </RouterLink>
                <button class="btn btn-sm btn-outline-danger" type="button" @click="deleteUser(item)">
                    Delete
                </button>
            </template>
        </DataTable>
    </div>
</template>

<script>
import axios from 'axios'
import DataTable from '@/components/DataTable.vue'

export default {
    components: { DataTable },
    data() {
        return {
            users: [],
            loading: false,
            columns: [
                { key: 'name', label: 'Nama' },
                { key: 'role', label: 'Role' },
                { key: 'email', label: 'Email' },
            ],
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        authConfig() {
            return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        },
        getUsers() {
            this.loading = true
            axios.get(`${import.meta.env.VITE_API_URL}/user`, this.authConfig())
                .then((response) => { this.users = response.data.data || response.data })
                .catch((error) => { console.error(error); alert('Data pengguna gagal dimuat') })
                .finally(() => { this.loading = false })
        },
        deleteUser(user) {
            if (!confirm(`Hapus pengguna ${user.name}?`)) return

            axios.delete(`${import.meta.env.VITE_API_URL}/user/${user.id}`, this.authConfig())
                .then(() => { this.users = this.users.filter((item) => item.id !== user.id) })
                .catch((error) => { console.error(error); alert(error.response?.data?.message || 'Pengguna gagal dihapus') })
        },
    },
}
</script>

<style scoped>
.page-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.eyebrow {
    margin-bottom: 0.35rem;
    color: #2f86c8;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

@media (max-width: 575.98px) {
    .page-heading {
        align-items: stretch;
        flex-direction: column;
    }

}
</style>
