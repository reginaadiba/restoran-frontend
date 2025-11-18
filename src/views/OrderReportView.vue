<template>
    <!-- NavBar components -->
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
        <h2 class="text-center mb-3">Order Report</h2>
        <div class="mb-3 w-25">
            <label for="month" class="form-label">Month</label>
            <select name="month" id="month" class="form-control" v-model="month">
                <option value="">Choose Month Period</option>
                <option v-for="month in months" :value=month.value>{{ month.name }}</option>
            </select>
        </div>

        <div class="col-12">
            <div class="row">
                <div class="col-12 col-sm-4">
                    <div class="box">
                        <label>Order Count</label>
                        <label></label>
                    </div>
                </div>
                <div class="col-12 col-sm-4">
                    <div class="box">
                        <label>Min Payment</label>
                        <label></label>
                    </div>
                </div>
                <div class="col-12 col-sm-4">
                    <div class="box">
                        <label>Max Payment</label>
                        <label></label>
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
                    <tr>
                        <td colspan="9" class="text-center">No Data</td>
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
                {'value': 1, 'name': 'January'},
                {'value': 2, 'name': 'February'},
                {'value': 3, 'name': 'March'},
                {'value': 4, 'name': 'April'},
                {'value': 5, 'name': 'May'},
                {'value': 6, 'name': 'June'},
                {'value': 7, 'name': 'July'},
                {'value': 8, 'name': 'August'},
                {'value': 9, 'name': 'September'},
                {'value': 10, 'name': 'October'},
                {'value': 11, 'name': 'November'},
                {'value': 12, 'name': 'December'},
            ],
            month: ''
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
        this.getOrderReport()
    },
    methods: {
        
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