<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-input placeholder="请输入店员名称/手机号" clearable>
                    <template #prefix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>
            <template #search-actions>
                <n-button class="mr-4" text quaternary :focusable="false" @click="addEmployee">
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
        <Table :columns="columns" :data="employeeList"></Table>
        <AddModal>
            <template #header>
                <div>编辑信息</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="姓名：" path="employeeName">
                        <n-input v-model:value="addItemList.employeeName" placeholder="请输入姓名" />
                    </n-form-item>
                    <n-form-item label="电话：" path="employeePhone">
                        <n-input v-model:value="addItemList.employeePhone" placeholder="请输入电话号码" />
                    </n-form-item>
                    <n-form-item label="邮箱：" path="employeeEmail">
                        <n-input v-model:value="addItemList.employeeEmail" placeholder="请输入邮箱" />
                    </n-form-item>
                    <n-form-item label="地址：" path="employeePosition">
                        <n-input v-model:value="addItemList.employeePosition" placeholder="请输入地址" />
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
                    <n-form-item label="姓名：" path="productName">
                        <n-input v-model:value="itemList.employeeName" placeholder="请输入姓名" />
                    </n-form-item>
                    <n-form-item label="电话：" path="category">
                        <n-input v-model:value="itemList.employeePhone" placeholder="请输入电话号码" />
                    </n-form-item>
                    <n-form-item label="邮箱：" path="productDescription">
                        <n-input v-model:value="itemList.employeeEmail" placeholder="请输入地址" />
                    </n-form-item>
                    <n-form-item label="地址：" path="productDescription">
                        <n-input v-model:value="itemList.employeePosition" placeholder="请输入地址" />
                    </n-form-item>
                </div>
            </template>
            <template #action>
                <div>
                    <n-button @click="publicStore.changeEditShowModal()">取消</n-button>
                    <n-button type="primary" @click="edithandleSubmit(itemList)">提交</n-button>
                </div>
            </template>
        </EditModal>
    </div>
</template>

<script setup lang="ts">
import { useemployeeStore } from '@/stores/modules/employee';
import { usePublicStore } from '@/stores/public';
import { NButton, useDialog } from "naive-ui"

const publicStore = usePublicStore()
const employeeStore = useemployeeStore();
const showDialog = useDialog();
const employeeList = ref([]);
const itemList = ref()
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
        render(row) {
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

onMounted(async () => {
    await employeeStore.fetchemployee();
    employeeList.value = employeeStore.employee
})
const addEmployee = () => {
    publicStore.changeAddShowModal()
}
const addHandleSubmit = () => {
    employeeStore.addEmployee(addItemList.value)
}

const handleEdit = (row) => {
    publicStore.changeEditShowModal()
    itemList.value = row
}
const edithandleSubmit = async (EmployeeDate) => {
    const { employeeEmail, employeeName, employeePhone, employeePosition, employeeId } = EmployeeDate
    const formattedData = {
        employeeEmail,
        employeeName,
        employeePhone,
        employeePosition
    };
    await employeeStore.updateEmployeeInfo(employeeId, formattedData)
}
const showDeleteConfirm = async (row) => {
    showDialog.warning({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this product?',
        positiveText: 'Confirm',
        negativeText: 'Cancel',
        onPositiveClick: () => handleDeleteClick(row.employeeId)
    });
}
const handleDeleteClick = async (id) => {
    await employeeStore.deleteEmployeeInfo(id)
}
</script>

<style scoped></style>