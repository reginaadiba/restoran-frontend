<template>
    <div class="container mt-5">
        <div class="page-heading">
            <div>
                <p class="eyebrow">Pesanan</p>
                <h2>Order List</h2>
            </div>
        </div>

        <DataTable :items="orders" :columns="columns" :loading="loading" empty-text="Belum ada data pesanan.">
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
            <template #actions="{ item }">
                <RouterLink class="btn btn-sm btn-outline-primary"
                    :to="{ name: 'orderDetail', params: { orderId: item.id } }">
                    Detail
                </RouterLink>
            </template>
        </DataTable>
    </div>
</template>
<script>
import axios from 'axios';
import router from '@/router';
import DataTable from '@/components/DataTable.vue'

export default {
    components: { DataTable },
    data() {
        return {
            userName: '',
            roleId: '',
            orders: [],
            loading: false,
            columns: [
                { key: 'customer_name', label: 'Customer Name' },
                { key: 'table_no', label: 'Table No.' },
                { key: 'order_date', label: 'Order Date' },
                { key: 'order_time', label: 'Order Time' },
                { key: 'total', label: 'Total' },
                { key: 'status', label: 'Status' },
                { key: 'waitress', label: 'Waitress' },
                { key: 'cashier', label: 'Cashier' },
            ],
        }
    },
    mounted() {
        this.userName = localStorage.getItem('name')
        if (!this.userName || this.userName == '' || this.userName == null) {
            router.push({ name: 'login' })
        }
        this.getOrders()
    },
    methods: {
        getOrders() {
            this.loading = true
            axios.get(`${import.meta.env.VITE_API_URL}/order`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    this.orders = response.data.data || []
                })
                .catch((error) => {
                    console.log(error)
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
                })
        }
    },
}
</script>
<style scoped>
.page-heading {
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
</style>