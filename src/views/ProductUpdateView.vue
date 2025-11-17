<template>
    <!-- NavBar components -->
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
        <div class="col-12 col-lg-6">
            <h3>Edit Product</h3>
            <form @submit.prevent="updateProduct">
                <div class="mb-3">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" v-model="item.name" id="name" placeholder="Product Name">
                </div>
                <div class="mb-3">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" v-model="item.price" id="price" placeholder="Product Price">
                </div>
                <div class="mb-3">
                    <label for="image">Current Image</label>
                    <img v-if="item.image" :src="url + item.image" style="width: 100px; height: 100px;"
                        class="object-fit-cover">
                    <img v-else src="@/assets/images/nopict.png" style="width: 100px; height: 100px;"
                        class="object-fit-cover">
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
import axios from 'axios';;

export default {
    components: {
        NavBar
    },
    data() {
        return {
            userName: '',
            roleId: '',
            url: 'http://restoran.test/storage/items/',
            productId:'',
            item:'',
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
        this.getItem()
    },
    methods: {
        getItem() {
            // console.log(this.$route.params.productId)
            this.productId = this.$route.params.productId
            axios.get('http://restoran.test/api/item/'+this.productId, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    this.item = response.data.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        updateProduct() {
            if(this.item.name == '' || this.item.price == '') {
                alert('data cannot empty')
                return;
            }

            let formData = new FormData();
            formData.append('name', this.name)
            formData.append('price', this.price)
            formData.append('method', 'patch')
            formData.append('image_file', this.file)
            formData.append('category', 'Food')

            axios.post('http://restoran.test/api/item/'+this.productId,
                formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then((response) => {
                    router.push({name: 'product'})
                    // this.item = response.data.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        imageChanged() {
            let file = e.target.files[0]
            this.file = file
        }
    },
}
</script>
<style>

</style>