<template>

    <div class="container mt-5">
        <!-- NavBar components -->
        <NavBar :name="userName" :role="roleId" />

        <h2 class="text-center mb-3">Order Report</h2>
        <div class="mb-3 w-25">
            <label for="month" class="form-label">Month</label>
            <select name="month" id="month" class="form-control" v-model="month" @change="getReport()">
                <option value="">Choose Month Period</option>
                <option v-for="m in months" :value="m.value">
                    {{ m.name }}
                </option>
            </select>
        </div>

        <div class="col-12">
            <div class="row">
                <div class="col-12 col-sm-4">
                    <div class="box">
                        <label>Order Count</label>
                        <label>{{ data.orderCount }}</label>
                    </div>
                </div>
                <div class="col-12 col-sm-4">
                    <div class="box">
                        <label>Min Payment</label>
                        <label>Rp. {{ data.minPayment }}</label>
                    </div>
                </div>
                <div class="col-12 col-sm-4">
                    <div class="box">
                        <label>Max Payment</label>
                        <label>Rp. {{ data.maxPayment }}</label>
                    </div>
                </div>
            </div>
        </div>

        <hr class="my-5">

        <div class="col-12 mt-5">
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in data.orders" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ order.customer_name }}</td>
                        <td>{{ order.table_no }}</td>
                        <td>{{ order.order_date }}</td>
                        <td>{{ order.order_time }}</td>
                        <td>{{ order.total }}</td>
                        <td>{{ order.status }}</td>
                        <td>{{ order.waitress.name }}</td>
                        <td>{{ order.cashier ? order.cashier.name : '' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            orderReport: [],
            months: [
                { 'value': 1, 'name': 'January' },
                { 'value': 2, 'name': 'February' },
                { 'value': 3, 'name': 'March' },
                { 'value': 4, 'name': 'April' },
                { 'value': 5, 'name': 'May' },
                { 'value': 6, 'name': 'June' },
                { 'value': 7, 'name': 'July' },
                { 'value': 8, 'name': 'August' },
                { 'value': 9, 'name': 'September' },
                { 'value': 10, 'name': 'October' },
                { 'value': 11, 'name': 'November' },
                { 'value': 12, 'name': 'December' },
            ],
            month: '',
            data: {
                orderCount: 0,
                minPayment: 0,
                maxPayment: 0
            }
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
        this.getReport()
    },
    methods: {
        getReport() {
            console.log(this.month)
            axios.get('http://restoran.test/api/order-report?month=' + this.month, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    console.log(response.data.data)
                    this.data = response.data.data
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
<style scoped>
.box {
    border: solid 1px;
    border-radius: 4px;
    padding: 30px;
    font-size: 24px;
}

.box label {
    display: block;
}
</style>