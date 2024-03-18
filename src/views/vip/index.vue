<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-input placeholder="搜索" class="max-w-48">
                    <template #suffix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>
            <template #search-controls>
                <n-date-picker class="max-w-xs" placeholder="请选择日期范围" clearable type="daterange"
                    :is-date-disabled="disablePreviousDate" />
            </template>
            <template #search-actions>
                <n-button class="mr-4" text quaternary :focusable="false" @click="addcustomers">
                    <template #icon>
                        <n-icon>
                            <IconAdd></IconAdd>
                        </n-icon>
                    </template>
                    <span>添加</span>
                </n-button>
                <n-button round color="#fdda11" text-color="#000" :focusable="false">
                    <template #icon>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                    搜索
                </n-button>
            </template>
        </SearchBar>
        <Table :columns="columns" :data="customersList"></Table>
        <AddModal>
            <template #header>
                <div>添加信息</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="姓名：" path="customerName">
                        <n-input v-model:value="addItemList.customerName" placeholder="请输入姓名" />
                    </n-form-item>
                    <n-form-item label="电话：" path="customerNumber">
                        <n-input v-model:value="addItemList.customerNumber" placeholder="请输入电话号码" />
                    </n-form-item>
                    <n-form-item label="邮箱：" path="customerEmail">
                        <n-input v-model:value="addItemList.customerEmail" placeholder="请输入邮箱" />
                    </n-form-item>
                    <n-form-item label="地址：" path="customerAddress">
                        <n-input v-model:value="addItemList.customerAddress" placeholder="请输入地址" />
                    </n-form-item>
                </div>
            </template>
            <template #action>
                <div>
                    <n-button @click="publicStore.changeAddShowModal()">取消</n-button>
                    <n-button type="primary" @click="addHandleSubmit">提交</n-button>
                </div>
            </template>
        </AddModal>
        <EditModal>
            <template #header>
                <div>编辑信息</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="姓名：" path="customerName">
                        <n-input v-model:value="itemList.customerName" placeholder="请输入姓名" />
                    </n-form-item>
                    <n-form-item label="电话：" path="customerNumber">
                        <n-input v-model:value="itemList.customerNumber" placeholder="请输入电话号码" />
                    </n-form-item>
                    <n-form-item label="邮箱：" path="customerEmail">
                        <n-input v-model:value="itemList.customerEmail" placeholder="请输入邮箱" />
                    </n-form-item>
                    <n-form-item label="地址：" path="customerAddress">
                        <n-input v-model:value="itemList.customerAddress" placeholder="请输入地址" />
                    </n-form-item>
                </div>
            </template>
            <template #action>
                <div>
                    <n-button @click="publicStore.changeEditShowModal()">取消</n-button>
                    <n-button type="primary" @click="editHandleSubmit(itemList)">提交</n-button>
                </div>
            </template>
        </EditModal>
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
onMounted(async () => {
    await customersStore.fetchcustomers();
    customersList.value = customersStore.customers
})

const handleClose = (row) => {
    publicStore.changeEditShowModal()
    itemList.value = row
}

const addcustomers = async () => {
    publicStore.changeAddShowModal()
}
const addHandleSubmit = async () => {
    await customersStore.addCustomersItem(addItemList.value)
}
const editHandleSubmit = async (customersDate) => {
    const { customerAddress, customerEmail, customerName, customerNumber, customerId } = customersDate;
    const formattedData = {
        customerAddress,
        customerEmail,
        customerName,
        customerNumber
    };
    await customersStore.upDateCustomersItem(customerId, formattedData)
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
</script>

<style scoped></style>