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
                <n-button class="mr-4" text quaternary :focusable="false">
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
    </div>
</template>

<script setup lang="ts">
import { useemployeeStore } from '@/stores/modules/employee';

const employeeStore = useemployeeStore();
const employeeList = ref([]);

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
    }
]);

onMounted(async () => {
    await employeeStore.fetchemployee();
    employeeList.value = employeeStore.employee
})

</script>

<style scoped></style>