<template>
    <!-- NavBar components -->
    <NavBar :name="userName" :role="roleId" />
    <div>
        <div class="container-fluid mt-5">
            <!-- Item List -->
            <div class="row">
                <div class="col-12 col-sm-8 mb-3">
                    <!-- Search box -->
                    <div class="col-12">
                        <input type="text" v-model="keyword" class="form-control" placeholder="Search Here"
                            :onchange="searchItems()">
                    </div>
                    <hr />
                    <!-- Item List Box class="" -->
                    <div class="col-12">
                        <div class="row">
                            <div v-for="item in filteredItems" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div class="card">
                                    <img :src="url + item.image" height="200px" class="card-img-top objet-fit-over"
                                        alt="...">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">{{ item.name }}</h5>
                                        <p class="card-text">Rp. {{ item.price }}</p>
                                        <p><button class="btn btn-primary">Order</button></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-4 bordered">
                    List Order
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
import router from '@/router';

export default {
    components: {
        NavBar
    },
    data() {
        return {
            userName: '',
            roleId: '',
            items: [],
            filteredItems: [],
            keyword: '',
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
        if (this.roleId != 1 && this.roleId != 4) {
            router.push({ name: 'home' })
        }
        this.getItems();
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
                    if (error.response.status == 401) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('email')
                        localStorage.removeItem('name')
                        localStorage.removeItem('role_id')
                        router.push({name: 'login'})
                    }
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
<style>
.bordered {
    border: solid 1px;
}
</style>