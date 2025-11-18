<template>

    <div class="container mt-5">
        <!-- NavBar components -->
        <NavBar :name="userName" :role="roleId" />

        <h2 class="text-center mb-3">Order Detail</h2>

        <div class="table-responsive">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>Customer Name: {{ order.customer_name }}</td>
                        <td>Table No.: {{ order.table_no }}</td>
                        <td>Order Date: {{ order.order_date }}</td>
                        <td>Status: {{ order.status }}</td>
                    </tr>
                    <tr>
                        <td>Waitress: {{ order.waitress ? order.waitress.name : '-' }}</td>
                        <td>Cashier: {{ order.cashier ? order.cashier.name : '-' }}</td>
                        <td>Order Time: {{ order.order_time }}</td>
                        <td>Grand Total: {{ order.total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <hr class="my-5" />

        <table class="table table-striped">
            <thead>
                <tr>
                    <td>#</td>
                    <td>Item Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in order.order_detail" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.item ? item.item.name : '-' }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.qty * item.price }}</td>
                </tr>
            </tbody>
        </table>

        <!--  -->
        <div class="mt-3"></div>
        <button v-if="(order.status == 'ordered') && (roleId == 2)" class="btn btn-primary"
            @click="setAsDone(order.id)">Done</button>
        <button v-if="(order.status == 'done') && (roleId == 3 || roledId == 4)" class="btn btn-primary"
            @click="setAsPaid(order.id)">Paid</button>
    </div>
</template>
<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import router from '@/router';

export default {
    components: {
        NavBar
    },
    data() {
        return {
            userName: '',
            roleId: '',
            orderId: '',
            order: '',
            orderDetails: []
        }
    },
    mounted() {
        // jika tidak punya username maka ke login
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == '' || this.userName == null) {
            router.push({ name: 'login' })
        }
        this.roleId = localStorage.getItem('role_id')
        // if (this.roleId != 4) {
        //     router.push({ name: 'home' })
        // }
        this.getOrder()
    },
    methods: {
        getOrder() {
            this.orderId = this.$route.params.orderId
            axios.get('http://restoran.test/api/order/' + this.orderId, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    this.order = response.data.data;
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
        setAsDone(orderId) {
            axios.get('http://restoran.test/api/order/' + orderId + '/set-as-done', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        alert('ubah status order menjadi done berhasil')
                    }

                    this.order = response.data.data
                    console.log(this.order)
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
        setAsPaid(orderId) {
            axios.get('http://restoran.test/api/order/' + orderId + '/payment', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        alert('ubah status order menjadi paid berhasil')
                    }

                    this.order = response.data.data
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
        }
    },
}
</script>
<style></style>