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
import { NAvatarGroup, NAvatar, NButton } from "naive-ui"
import AvatarGroup from '@/components/AvatarGroup/index.vue'

const showDialog = useDialog();
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
            if (Array.isArray(row.orderItems) && row.orderItems.length > 0) {
                const imageUrls = row.orderItems.map(item => item.imageUrl);
                const productNames = row.orderItems.map(item => item.productName);
                // 同时将imageUrls和orderIds作为prop传递给AvatarGroup组件
                return h(AvatarGroup, {
                    imageUrls: imageUrls,
                    productNames: productNames,
                    onClick: () => handleItemClick(row)
                });
            }
            return null; // 如果没有数据，不渲染组件
        }
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
    },
    {
        title: '操作',
        key: 'actions',
        render(row) {
            return [
                h(NButton, {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => showDeleteConfirm(row)
                }, { default: () => 'Delete' })
            ]
        },
    }
]);

const disablePreviousDate = (ts: number) => {
    return ts > Date.now()
}

const showDeleteConfirm = (row) => {
    showDialog.warning({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this product?',
        positiveText: 'Confirm',
        negativeText: 'Cancel',
        onPositiveClick: () => handleDeleteClick(row.orderId)
    });
}
const handleDeleteClick = async (orderId) => {
    await ordersStore.deleteOrder(orderId)
    getOrderList()
}

const handleItemClick = (row) => {
    // 创建一个包含订单ID和订单项信息的对象
    const productInfo = {
        orderId: row.orderId,
        orderItems: row.orderItems
    };
    
}

const getOrderList = async () => {
    await ordersStore.fetchOrders()
    ordersList.value = ordersStore.orders
}

onMounted(async () => {
    getOrderList()
})
</script>

<style scoped></style>