<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-input v-model:value="searchKeyword" placeholder="请输入店员名称/手机号" clearable>
                    <template #prefix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>
            <template #search-actions>
                <n-button class="mr-4" quaternary :focusable="false" @click="publicStore.openAddModal(addItemList)">
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
        <Table :columns="columns" :data="employeeList" :row-key="row => row.employeeId"></Table>
        <Modal>
            <template #header>
                <div>{{ publicStore.modalTitle }}</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="姓名：" path="productName">
                        <n-input v-model:value="publicStore.itemList.employeeName" placeholder="请输入姓名" />
                    </n-form-item>
                    <n-form-item label="电话：" path="category">
                        <n-input v-model:value="publicStore.itemList.employeePhone" placeholder="请输入电话号码" />
                    </n-form-item>
                    <n-form-item label="邮箱：" path="productDescription">
                        <n-input v-model:value="publicStore.itemList.employeeEmail" placeholder="请输入地址" />
                    </n-form-item>
                    <n-form-item label="地址：" path="productDescription">
                        <n-input v-model:value="publicStore.itemList.employeePosition" placeholder="请输入地址" />
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
import { useemployeeStore } from '@/stores/modules/employee';
import { usePublicStore } from '@/stores/public';
import { NButton, useDialog } from "naive-ui"
import { Store } from "pinia"

const publicStore: Store<typeof publicStore> = usePublicStore()
const employeeStore = useemployeeStore();
const showDialog = useDialog();
const message = useMessage();
const employeeList = ref([]);
const searchKeyword = ref('')
const addItemList = ref(
    {
        employeeEmail: "",
        employeeName: "",
        employeePhone: "",
        employeePosition: ""
    }
)


const columns = ref([
    {
        title: 'Id',
        key: 'employeeId'
    },
    {
        title: '姓名',
        key: 'employeeName'
    },
    {
        title: '电话',
        key: 'employeePhone'
    },
    {
        title: '邮箱',
        key: 'employeeEmail'
    },
    {
        title: '地址',
        key: 'employeePosition'
    },
    {
        title: '入职时间',
        key: 'hireDate'
    },
    {
        title: '状态',
        key: 'status'
    },
    {
        title: '创建时间',
        key: 'createdAt'
    },
    {
        title: '操作',
        key: 'actions',
        render(row: any) {
            return [
                h(
                    NButton,
                    {
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => handleEdit(row)
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

const getAllEmployeeList = async () => {
    await employeeStore.fetchemployee();
    employeeList.value = employeeStore.employee
}

onMounted(async () => {
    getAllEmployeeList()
})

const handleEdit = (row: any) => {
    const { ...rest } = row
    publicStore.openEditModal(rest)
}
const handleSubmit = async (EmployeeDate: any) => {
    if (publicStore.isEditMode) {
        await employeeStore.updateEmployeeInfo(EmployeeDate.employeeId, EmployeeDate)
        message.success("保存成功")
    } else {
        await employeeStore.addEmployee(EmployeeDate)
        message.success("添加成功")
    }
    getAllEmployeeList()
    publicStore.changeShowModal()
}
const showDeleteConfirm = async (row: any) => {
    showDialog.warning({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this product?',
        positiveText: 'Confirm',
        negativeText: 'Cancel',
        onPositiveClick: () => handleDeleteClick(row.employeeId)
    });
}
const handleDeleteClick = async (id: number) => {
    await employeeStore.deleteEmployeeInfo(id)
    message.success("删除成功")
    getAllEmployeeList()
}
const handleSearch = async () => {
    await employeeStore.getBySearch(searchKeyword.value)
    employeeList.value = employeeStore.employee
}
</script>

<style scoped>
:deep(.n-button) {
    margin: 0 7px 0;
}
</style>