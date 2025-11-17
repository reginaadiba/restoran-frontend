<template>
    <!-- NavBar components -->
    <NavBar :name="userName" :role="roleId" />
    <div class="container">
        <h2 class="my-5">Product List</h2>

        <a href="/product-add" class="btn btn-success mb-3">Add Product</a>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>Rp {{ item.price }}</td>
                    <td>
                        <img v-if="item.image" :src="url + item.image" style="width: 100px; height: 100px;"
                            class="object-fit-cover">
                        <img v-else src="@/assets/images/nopict.png" style="width: 100px; height: 100px;"
                            class="object-fit-cover">
                    </td>
                    <td>
                        <RouterLink :to="{ name: 'productUpdate', params: { productId: item.id } }">Edit</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
        <div></div>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import router from '@/router';
import axios from 'axios';

export default {
    components: {
        NavBar
    },
    data() {
        return {
            userName: '',
            roleId: '',
            items: [],
            url: 'http://restoran.test/storage/items/'
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
            // let data = this
            axios.get('http://restoran.test/api/item', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    console.log(response.data.data);
                    // data.items = response.data.data;
                    this.items = response.data.data;
                })
                .catch(function (error) {
                    console.log(error);
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