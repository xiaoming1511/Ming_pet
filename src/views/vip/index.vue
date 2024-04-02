<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-input v-model:value="searchKeyword" placeholder="搜索" class="max-w-48">
                    <template #suffix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>
            <template #search-actions>
                <n-button class="mr-4" text quaternary :focusable="false"
                    @click="publicStore.openAddModal(addItemList)">
                    <template #icon>
                        <n-icon>
                            <IconAdd></IconAdd>
                        </n-icon>
                    </template>
                    <span>添加</span>
                </n-button>
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
        <Table :columns="columns" :data="customersList" :row-key="row => row.customerId"></Table>
        <Modal>
            <template #header>
                <div>{{ publicStore.modalTitle }}</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="姓名：" path="customerName">
                        <n-input v-model:value="publicStore.itemList.customerName" placeholder="请输入姓名" />
                    </n-form-item>
                    <n-form-item label="电话：" path="customerNumber">
                        <n-input v-model:value="publicStore.itemList.customerNumber" placeholder="请输入电话号码" />
                    </n-form-item>
                    <n-form-item label="邮箱：" path="customerEmail">
                        <n-input v-model:value="publicStore.itemList.customerEmail" placeholder="请输入邮箱" />
                    </n-form-item>
                    <n-form-item label="地址：" path="customerAddress">
                        <n-input v-model:value="publicStore.itemList.customerAddress" placeholder="请输入地址" />
                    </n-form-item>
                </div>
            </template>
            <template #action>
                <div>
                    <n-button @click="publicStore.changeShowModal()">取消</n-button>
                    <n-button type="primary" @click="handleSubmit(publicStore.itemList)">提交</n-button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { usecustomersStore } from '@/stores/modules/customers';
import { usePublicStore } from '@/stores/public';
import { NButton } from "naive-ui"

const publicStore = usePublicStore()
const customersStore = usecustomersStore();
const showDialog = useDialog();

const customersList = ref();
const itemList = ref()
const searchKeyword = ref("")
const addItemList = ref(
    {
        customerAddress: "",
        customerEmail: "",
        customerName: "",
        customerNumber: ""
    }
)

const columns = ref([
    {
        title: 'Id',
        key: 'customerId'
    },
    {
        title: '姓名',
        key: 'customerName'
    },
    {
        title: '电话',
        key: 'customerNumber'
    },
    {
        title: '邮箱',
        key: 'customerEmail'
    },
    {
        title: '地址',
        key: 'customerAddress'
    },
    {
        title: '创建时间',
        key: 'createdAt'
    },
    {
        title: '操作',
        key: 'actions',
        render(row) {
            return [
                h(
                    NButton,
                    {
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => handleClose(row)
                    },
                    { default: () => 'Edit' }
                ),
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

const getAllCustomersList = async () => {
    await customersStore.fetchcustomers();
    customersList.value = customersStore.customers
}
onMounted(async () => {
    getAllCustomersList()
})

const handleClose = (row) => {
    publicStore.openEditModal(row)
}

const handleSubmit = async (customersDate) => {
    if (publicStore.isEditMode) {
        await customersStore.upDateCustomersItem(customersDate.customerId, customersDate);
    } else {
        await customersStore.addCustomersItem(customersDate);
    }
    getAllCustomersList()
    publicStore.changeShowModal()
}

function showDeleteConfirm(row) {
    showDialog.warning({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this product?',
        positiveText: 'Confirm',
        negativeText: 'Cancel',
        onPositiveClick: () => handleDeleteClick(row.customerId)
    });
}
const handleDeleteClick = async (id) => {
    await customersStore.deleteCustomersItem(id)
}
const handleSearch = async () => {
    await customersStore.getBySearch(searchKeyword.value)
    customersList.value = customersStore.customers
}
</script>

<style scoped></style>