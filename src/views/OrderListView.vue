<template>

    <div class="container mt-5">
        <!-- NavBar components -->
        <NavBar :name="userName" :role="roleId" />

        <h2 class="text-center mb-3">Order List</h2>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Table No.</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                    <th scope="col">Waitress</th>
                    <th scope="col">Cashier</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ order.customer_name }}</td>
                    <td>{{ order.table_no }}</td>
                    <td>{{ order.order_date }}</td>
                    <td>{{ order.order_time }}</td>
                    <td>{{ order.total }}</td>
                    <td>{{ order.status }}</td>
                    <td>{{ order.waitress.name }}</td>
                    <td>{{ order.cashier ? order.cashier.name : '' }}</td>
                    <td>
                        <RouterLink :to="{ name: 'orderDetail', params: { orderId: order.id } }">View Detail
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
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
            orders: []
        }
    },
    mounted() {
        // jika tidak punya username maka ke login
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == '' || this.userName == null) {
            router.push({ name: 'login' })
        }
        this.getOrders()
    },
    methods: {
        getOrders() {
            axios.get('http://restoran.test/api/order', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    this.orders = response.data.data;
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