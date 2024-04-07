<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-date-picker class="max-w-xs" v-model="selectedRange" placeholder="请选择日期范围" clearable type="daterange"
                    :is-date-disabled="disablePreviousDate" @update:value="handleSelectRange" />
            </template>

            <template #search-controls>
                <n-input placeholder="搜索" v-model:value="searchKeyword" class="max-w-48">
                    <template #suffix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>

            <template #search-actions>
                <n-button round color="#fdda11" text-color="#000" :focusable="false" @click="handleSearch">
                    <template #icon>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
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
import { DateUtils } from '@/utils/dateUtils';

const showDialog = useDialog();
const ordersStore = useOrdersStore()
const ordersList = ref([])
const selectedRange = ref(null)
const searchKeyword = ref('')

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
                    // onClick: () => handleItemClick(row)
                });
            }
            return null; 
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

const handleSelectRange = (v) => {
    if (v && Array.isArray(v) && v.length === 2) {
        selectedRange.value = DateUtils.formatDateRange(v);
    } else {
        // 清空已选择的日期范围或者设置默认值，取决于你的业务需求
        selectedRange.value = [];
    }
}
const handleSearch = async () => {
    if (selectedRange.value && selectedRange.value.length === 2) {
        const startDate = selectedRange.value[0];
        const endDate = selectedRange.value[1];
        await ordersStore.searchByDate(startDate, endDate);
    } else if (searchKeyword.value.trim()) {
        await ordersStore.searchByKey(searchKeyword.value.trim());
    } else {
        // 当两者都为空时，刷新整个列表
        await ordersStore.fetchOrders();
    }
    // 当搜索完成时，确保从 store 获取最新数据
    ordersList.value = ordersStore.orders;
}
onMounted(async () => {
    getOrderList()
})
</script>

<style scoped></style>