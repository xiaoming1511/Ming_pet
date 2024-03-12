<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-date-picker class="max-w-xs" placeholder="请选择日期范围" clearable type="daterange"
                    :is-date-disabled="disablePreviousDate" />
            </template>

            <template #search-controls>
                <n-input placeholder="搜索" class="max-w-48">
                    <template #suffix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>

            <template #search-actions>
                <n-button round>
                    搜索
                </n-button>
            </template>
        </SearchBar>
        <Table :columns="columns" :data="ordersList"></Table>
    </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from '@/stores/modules/orders';
import { NAvatarGroup, NAvatar } from "naive-ui"
const ordersStore = useOrdersStore()
const ordersList = ref([])

const columns = ref([
    {
        title: 'Id',
        key: 'orderId'
    },
    {
        title: '顾客',
        key: 'customerName'
    },
    {
        title: '商品',
        key: 'orderItems',
        render(row) {
            return h(
                'div',
                {},
                row.orderItems.map((item) =>
                    h(NAvatar, {
                        src: item.imageUrl,
                        size: 'medium',
                        style: 'margin-right: 10px;',
                    })
                )
            );
        },
    },
    {
        title: '操作人',
        key: 'employeeName'
    },
    {
        title: '状态',
        key: 'status'
    },
    {
        title: '总金额',
        key: 'totalPrice'
    },
    {
        title: '操作时间',
        key: 'createdAt'
    }
]);

const disablePreviousDate = (ts: number) => {
    return ts > Date.now()
}
function aaa(row) {
    console.log(row);
}

onMounted(async () => {
    await ordersStore.fetchOrders()
    ordersList.value = ordersStore.orders
})
</script>

<style scoped></style>