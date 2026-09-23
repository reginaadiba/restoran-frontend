<template>
    <div class="container">
        <h2 class="my-5">Product List</h2>

        <RouterLink :to="{ name: 'productAdd' }" class="btn btn-success mb-3">Add Product</RouterLink>

        <DataTable :items="items" :columns="columns" :loading="loading" empty-text="Belum ada data produk.">
            <template #cell-price="{ value }">
                Rp {{ value }}
            </template>
            <template #cell-image="{ item }">
                <img v-if="item.image" :src="url + item.image" class="product-image" alt="">
                <img v-else src="@/assets/images/nopict.png" class="product-image" alt="Tidak ada gambar">
            </template>
            <template #actions="{ item }">
                <RouterLink class="btn btn-sm btn-outline-primary"
                    :to="{ name: 'productUpdate', params: { productId: item.id } }">
                    Edit
                </RouterLink>
            </template>
        </DataTable>
    </div>
</template>
<script>
import router from '@/router';
import axios from 'axios';
import DataTable from '@/components/DataTable.vue';

export default {
    components: { DataTable },
    data() {
        return {
            userName: '',
            roleId: '',
            items: [],
            url: `${import.meta.env.VITE_BASE_URL}/storage/items/`,
            loading: false,
            columns: [
                { key: 'name', label: 'Name' },
                { key: 'price', label: 'Price' },
                { key: 'image', label: 'Image' },
            ],
        }
    },
    mounted() {
        // jika tidak punya username maka ke login
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == '' || this.userName == null) {
            router.push({ name: 'login' })
        }
        this.roleId = localStorage.getItem('role_id')
        if (this.roleId != 4) {
            router.push({ name: 'home' })
        }
        this.getItems()
    },
    methods: {
        getItems() {
            this.loading = true
            axios.get(`${import.meta.env.VITE_API_URL}/item`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    this.items = response.data.data;
                })
                .catch((error) => {
                    // console.log(error.response.status)
                    if (error.response.status == 401) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('email')
                        localStorage.removeItem('name')
                        localStorage.removeItem('role_id')
                        router.push({ name: 'login' })
                    }
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false
                });
        },
        searchItems() {
            this.filteredItems = this.items.filter(
                item => item.name.toLowerCase().includes(this.keyword.toLowerCase())
            )
        }
    },
}
</script>
<style lang="">

</style>