<template>
    <div class="container mt-5">
        <!-- NavBar components -->
        <NavBar :name="userName" :role="roleId" />

        <div class="col-12 col-lg-6">
            <h3>Add New Product</h3>
            <form @submit.prevent="createProduct">
                <div class="mb-3">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" v-model="name" id="name" placeholder="Product Name">
                </div>
                <div class="mb-3">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" v-model="price" id="price" placeholder="Product Price">
                </div>
                <div class="mb-3">
                    <label for="image">Image</label>
                    <input type="file" class="form-control" @change="imageChanged($event)" id="image">
                </div>
                <div class="mb-3">
                    <button class="btn btn-success form-control" type="submit">Save</button>
                </div>
            </form>
        </div>
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
            url: 'http://restoran.test/storage/items/',
            name: '',
            price: '',
            file: ''
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
    },
    methods: {
        createProduct() {
            if (this.name == '' || this.price == '') {
                alert('data cannot empty')
                return;
            }
            let formData = new FormData();
            formData.append('name', this.name)
            formData.append('price', this.price)
            formData.append('image_file', this.file)
            formData.append('category', 'Snacks')

            axios.post('http://restoran.test/api/item',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        // 'content-type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    router.push({ name: 'product' })
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        imageChanged(e) {
            let file = e.target.files[0]
            this.file = file
        }
    },
}
</script>
<style></style>