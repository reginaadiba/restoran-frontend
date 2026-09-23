<template>
    <div class="data-table-container">
        <div class="data-table-wrapper">
            <table class="table data-table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
                        <th v-if="$slots.actions" class="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedItems" :key="item[rowKey]">
                        <td v-for="column in columns" :key="column.key" :data-label="column.label">
                            <slot :name="`cell-${column.key}`" :item="item" :value="item[column.key]">
                                {{ item[column.key] }}
                            </slot>
                        </td>
                        <td v-if="$slots.actions" class="data-table-actions text-end" data-label="Action">
                            <slot name="actions" :item="item" />
                        </td>
                    </tr>
                    <tr v-if="!loading && paginatedItems.length === 0">
                        <td :colspan="columnCount" class="text-center text-muted py-4">{{ emptyText }}</td>
                    </tr>
                    <tr v-if="loading">
                        <td :colspan="columnCount" class="text-center text-muted py-4">Memuat data...</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="data-table-footer">
            <small class="text-muted">Menampilkan {{ firstItem }}-{{ lastItem }} dari {{ items.length }} data</small>
            <nav v-if="pageCount > 1" aria-label="Pagination data">
                <ul class="pagination pagination-sm mb-0">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" type="button" :disabled="currentPage === 1"
                            @click="goToPage(currentPage - 1)">
                            Sebelumnya
                        </button>
                    </li>
                    <li v-for="page in pageCount" :key="page" class="page-item"
                        :class="{ active: currentPage === page }">
                        <button class="page-link" type="button" @click="goToPage(page)">{{ page }}</button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === pageCount }">
                        <button class="page-link" type="button" :disabled="currentPage === pageCount"
                            @click="goToPage(currentPage + 1)">
                            Berikutnya
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: { type: Array, default: () => [] },
        columns: { type: Array, required: true },
        rowKey: { type: String, default: 'id' },
        pageSize: { type: Number, default: 10 },
        loading: { type: Boolean, default: false },
        emptyText: { type: String, default: 'Tidak ada data.' },
    },
    data() {
        return { currentPage: 1 }
    },
    computed: {
        columnCount() {
            return this.columns.length + (this.$slots.actions ? 1 : 0)
        },
        pageCount() {
            return Math.max(1, Math.ceil(this.items.length / this.pageSize))
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.pageSize
            return this.items.slice(start, start + this.pageSize)
        },
        firstItem() {
            return this.items.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1
        },
        lastItem() {
            return Math.min(this.currentPage * this.pageSize, this.items.length)
        },
    },
    watch: {
        items() {
            if (this.currentPage > this.pageCount) this.currentPage = this.pageCount
        },
    },
    methods: {
        goToPage(page) {
            if (page >= 1 && page <= this.pageCount) this.currentPage = page
        },
    },
}
</script>

<style scoped>
.data-table-container {
    width: 100%;
}

.data-table-wrapper {
    overflow-x: auto;
    border: 1px solid #d7eaf8;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(41, 93, 145, 0.08);
    -webkit-overflow-scrolling: touch;
}

.data-table {
    min-width: 620px;
}

.data-table th,
.data-table td {
    padding: 0.85rem 1rem;
}

.data-table thead {
    background: #e8f5ff;
}

.data-table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1rem;
}

.pagination {
    flex-wrap: wrap;
    justify-content: end;
}

@media (max-width: 575.98px) {
    .data-table-wrapper {
        overflow: visible;
        border: 0;
        background: transparent;
        box-shadow: none;
    }

    .data-table {
        display: block;
        min-width: 0;
    }

    .data-table thead {
        display: none;
    }

    .data-table tbody {
        display: grid;
        gap: 0.85rem;
    }

    .data-table tr {
        display: block;
        padding: 0.85rem 1rem;
        border: 1px solid #d7eaf8;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 4px 14px rgba(41, 93, 145, 0.07);
    }

    .data-table td {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 1rem;
        min-width: 0 !important;
        padding: 0.45rem 0;
        border: 0;
        font-size: 0.9rem;
        text-align: right;
        overflow-wrap: anywhere;
    }

    .data-table td::before {
        flex: 0 0 auto;
        color: #52758f;
        content: attr(data-label);
        font-size: 0.75rem;
        font-weight: 700;
        text-align: left;
        text-transform: uppercase;
    }

    .data-table .data-table-actions {
        justify-content: flex-end;
        gap: 0.5rem;
        padding-top: 0.75rem;
    }

    .data-table .data-table-actions::before {
        display: none;
    }

    .data-table tr:has(td[colspan]) {
        display: table-row;
        box-shadow: none;
    }

    .data-table-footer {
        align-items: flex-start;
        flex-direction: column;
    }

    .pagination {
        justify-content: start;
    }
}
</style>
