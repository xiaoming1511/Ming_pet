<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-input placeholder="请输入商品名称">
                    <template #prefix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>

            <template #search-controls>
                <n-date-picker type="daterange" :is-date-disabled="disablePreviousDate" />
            </template>

            <template #search-actions>
                <n-button round color="#fdda11" text-color="#000" :focusable="false">
                    <template #icon>
                        <n-icon>
                            <iconSearch></iconSearch>
                        </n-icon>
                    </template>
                    搜索
                </n-button>
            </template>
        </SearchBar>
        <Table :columns="columns" :data="recordsList"></Table>
    </div>
</template>

<script setup lang="ts">
import { useRecordsStore } from '@/stores/modules/records';

const recordsStore = useRecordsStore();
const recordsList = ref([])

const columns = ref([
    {
        title: 'Id',
        key: 'recordId'
    },
    {
        title: '操作记录',
        key: 'typeName'
    },
    {
        title: '商品名称',
        key: 'productName'
    },
    {
        title: '操作人',
        key: 'employeeName'
    },
    {
        title: '操作时间',
        key: 'changedAt'
    }
]);

function disablePreviousDate(ts: number) {
    return ts > Date.now()
}

onMounted(async () => {
    await recordsStore.fetchRecords();
    recordsList.value = recordsStore.records;
    //   console.log(recordsList);
});
</script>

<style scoped></style>