<template>
    <div class="container mt-5">
        <div class="report-header">
            <div>
                <p class="eyebrow">Laporan</p>
                <h2 class="mb-3">Order Report</h2>
            </div>

            <div class="report-filter">
                <label for="month" class="form-label">Month</label>
                <select name="month" id="month" class="form-control" v-model="month" @change="getReport()">
                    <option value="">Choose Month Period</option>
                    <option v-for="m in months" :value="m.value" :key="m.value">
                        {{ m.name }}
                    </option>
                </select>
            </div>
        </div>

        <div class="col-12 mb-4">
            <div class="row g-3">
                <div class="col-12 col-sm-4">
                    <div class="box">
                        <label>Order Count</label>
                        <strong>{{ data.orderCount }}</strong>
                    </div>
                </div>
                <div class="col-12 col-sm-4">
                    <div class="box">
                        <label>Min Payment</label>
                        <strong>Rp. {{ data.minPayment }}</strong>
                    </div>
                </div>
                <div class="col-12 col-sm-4">
                    <div class="box">
                        <label>Max Payment</label>
                        <strong>Rp. {{ data.maxPayment }}</strong>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 mt-2">
            <DataTable :items="data.orders || []" :columns="columns" :loading="loading"
                empty-text="Belum ada data laporan pesanan.">
                <template #cell-total="{ value }">
                    Rp {{ value }}
                </template>
                <template #cell-status="{ item }">
                    <span class="status-badge" :class="`status-badge--${item.status}`">
                        {{ item.status }}
                    </span>
                </template>
                <template #cell-waitress="{ item }">
                    {{ item.waitress?.name || '-' }}
                </template>
                <template #cell-cashier="{ item }">
                    {{ item.cashier?.name || '-' }}
                </template>
            </DataTable>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import router from '@/router';
import DataTable from '@/components/DataTable.vue';

export default {
    components: { DataTable },
    data() {
        return {
            userName: '',
            roleId: '',
            orderReport: [],
            loading: false,
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
            columns: [
                { key: 'customer_name', label: 'Customer Name' },
                { key: 'table_no', label: 'Table No.' },
                { key: 'order_date', label: 'Order Date' },
                { key: 'order_time', label: 'Time' },
                { key: 'total', label: 'Total' },
                { key: 'status', label: 'Status' },
                { key: 'waitress', label: 'Waitress' },
                { key: 'cashier', label: 'Cashier' },
            ],
            data: {
                orderCount: 0,
                minPayment: 0,
                maxPayment: 0,
                orders: [],
            }
        }
    },
    mounted() {
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
            this.loading = true
            axios.get(`${import.meta.env.VITE_API_URL}/order-report?month=` + this.month, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    this.data = {
                        ...this.data,
                        ...(response.data.data || {}),
                        orders: response.data.data?.orders || []
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response?.status == 401) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('email')
                        localStorage.removeItem('name')
                        localStorage.removeItem('role_id')
                        router.push({ name: 'login' })
                    }
                })
                .finally(() => {
                    this.loading = false
                });
        }
    },
}
</script>
<style scoped>
.report-header {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.eyebrow {
    margin-bottom: 0.35rem;
    color: #2f86c8;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.report-filter {
    width: min(100%, 220px);
}

.box {
    border: 1px solid #d7eaf8;
    border-radius: 12px;
    padding: 1.25rem 1rem;
    background: linear-gradient(135deg, #ffffff, #f3f9ff);
    box-shadow: 0 8px 24px rgba(41, 93, 145, 0.06);
}

.box label {
    display: block;
    margin-bottom: 0.4rem;
    color: #5d7b95;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.box strong {
    font-size: 1.45rem;
    color: #183b5c;
}

.status-badge {
    display: inline-block;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: capitalize;
}

.status-badge--ordered {
    background: #fff3cd;
    color: #856404;
}

.status-badge--done {
    background: #d1e7dd;
    color: #0f5132;
}

.status-badge--paid {
    background: #dbeafe;
    color: #1d4ed8;
}

@media (max-width: 575.98px) {
    .report-header {
        flex-direction: column;
        align-items: stretch;
    }

    .report-filter {
        width: 100%;
    }
}
</style>