<template>

    <div>
        <!-- NavBar components -->
        <NavBar :name="userName" :role="roleId" />

        <div class="container-fluid mt-5">
            <!-- Item List -->
            <div class="row">
                <div class="col-12 col-sm-8 mb-3">
                    <!-- Search box -->
                    <div class="col-12">
                        <input type="text" v-model="keyword" class="form-control" placeholder="Search Here"
                            :onchange="searchItem()">
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
                                        <p><button class="btn btn-primary" @click="orderItem(item.id)">Order</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-4 order-box">
                    <h2>Order List</h2>
                    <div class="mb-5">
                        <div class="mb-3">
                            <label for="customerName" class="form-label">Customer Name</label>
                            <input type="text" v-model="customerName" name="customerName" id="customerName"
                                class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="tableNo" class="form-label">Table No.</label>
                            <input type="text" v-model="tableNo" name="tableNo" id="tableNo" class="form-control">
                        </div>
                    </div>
                    <hr />
                    <div class="item-box">
                        <div v-for="order in orders" class="mb-3">
                            <div class="d-flex justify-content-between">
                                <span>{{ order.name }} (x{{ order.qty }})</span>
                                <span>Rp. {{ order.price }}</span>
                            </div>
                            <div>
                                <span style="font-size: 14px;" class="text-muted">{{ order.eachPrice }}</span>
                                <div>
                                    <button class="btn btn-sm btn-outline-info me-2"
                                        @click="decreaseItemQty(order)">-</button>
                                    <button class="btn btn-sm btn-outline-success me-2"
                                        @click="increaseItemQty(order)">+</button>
                                    <button class="btn btn-sm btn-outline-danger me-2"
                                        @click="deleteItem(order)">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="total-box">
                        <div class="d-flex justify-content-between">
                            <span>Total</span>
                            <span>Rp. {{ total }}</span>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-success form-control" :disabled="processing" @click="submitOrder()">{{
                            processing ? 'Processing Order...' : 'Submit' }}</button>
                    </div>
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
            url: 'http://restoran.test/storage/items/',
            orders: [],
            total: 0,
            customerName: '',
            tableNo: '',
            processing: false
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
                        router.push({ name: 'login' })
                    }
                });
        },
        searchItem() {
            this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(this.keyword.toLowerCase())
            )
        },
        orderItem(id) {
            // console.log(id)
            let item = this.filteredItems.filter(item => item.id == id)[0]
            let orderItem = Object.assign({}, item)
            orderItem.eachPrice = item.price

            let indexOfItem = this.orders.map(e => e.id).indexOf(orderItem.id)
            if (indexOfItem != -1) { //jika item sudah ada di keranjang => tambah qty & hitung jumlah price 
                this.orders[indexOfItem].qty++
                this.orders[indexOfItem].price = this.orders[indexOfItem].eachPrice * this.orders[indexOfItem].qty
            } else {
                orderItem.qty = 1
                this.orders.push(orderItem)
            }

            let orderPrice = this.orders.map(order => order.price)
            let totalPrice = 0
            orderPrice.forEach(price => {
                totalPrice += price
            })

            this.total = totalPrice
        },
        decreaseItemQty(item) {
            if (item.qty <= 1) {
                return
            }

            let indexOfItem = this.orders.map(e => e.id).indexOf(item.id)
            this.orders[indexOfItem].qty--
            this.orders[indexOfItem].price = this.orders[indexOfItem].eachPrice * this.orders[indexOfItem].qty

            let orderPrice = this.orders.map(order => order.price)
            let totalPrice = 0
            orderPrice.forEach(price => {
                totalPrice += price
            })
            this.total = totalPrice
        },
        increaseItemQty(item) {
            let indexOfItem = this.orders.map(e => e.id).indexOf(item.id)
            this.orders[indexOfItem].qty++
            this.orders[indexOfItem].price = this.orders[indexOfItem].eachPrice * this.orders[indexOfItem].qty

            let orderPrice = this.orders.map(order => order.price)
            let totalPrice = 0
            orderPrice.forEach(price => {
                totalPrice += price
            })
            this.total = totalPrice
        },
        deleteItem(item) {
            let indexOfItem = this.orders.map(e => e.id).indexOf(item.id)
            this.orders.splice(indexOfItem, 1)

            let orderPrice = this.orders.map(order => order.price)
            let totalPrice = 0
            orderPrice.forEach(price => {
                totalPrice += price
            })
            this.total = totalPrice
        },
        submitOrder() {
            // console.log(this.orders);
            if (this.customerName == '' || this.tableNo == '') {
                alert('customer name and table no cannot be empty')
            }

            let items = this.orders.map(item => {
                return {
                    'id': item.id,
                    'qty': item.qty
                }
            })

            this.processing = true
            axios.post('http://restoran.test/api/order', {
                'customer_name': this.customerName,
                'table_no': this.tableNo,
                'items': items
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    console.log(response.data.data);
                    alert('order saved successfully')
                    this.orders = []
                    this.customerName = ''
                    this.tableNo = ''
                    this.total = 0
                    // this.items = response.data.data;
                })
                .catch(function (error) {
                    console.log(error);
                    if (error.response.status == 401) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('email')
                        localStorage.removeItem('name')
                        localStorage.removeItem('role_id')
                        router.push({ name: 'login' })
                    }
                })
                .finally(() => this.processing = false);
        }
    },
}
</script>
<style>
.bordered {
    border: solid 1px;
}

.order-box {
    border-left: solid 1px #ccc;
}

.total-box {
    font-size: 26px;
    font-weight: bold;
}
</style>