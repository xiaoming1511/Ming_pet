<template>
    <div>
        <n-data-table :columns="formattedColumns" :data="data" :row-key="rowKey"
            v-model:checked-row-keys="internalSelectedRowKeys" @update:checked-row-keys="handleCheckedRowKeysChange" />
    </div>
</template>

<script setup lang="ts">
import { usePublicStore } from '@/stores/public';

const publicStore = usePublicStore()

const props = defineProps({
    columns: Array,
    data: Array,
    rowKey: Function
});
const { columns } = toRefs(props);

const formattedColumns = columns.value.map(column => ({
    ...column,
    align: 'center',
}));


// 内部状态来同步选中的行键
const internalSelectedRowKeys = ref([]);

// 当选中的行键改变时，通知父组件
const handleCheckedRowKeysChange = (keys) => {
    internalSelectedRowKeys.value = keys;
    // 更新公共状态存储中的所选行
    publicStore.setSelectedRows(keys)
};

// 监听来自父组件的 selectedRowKeys 更新
watch(() => props.selectedRowKeys, (newVal) => {
    internalSelectedRowKeys.value = newVal;
    // 可以在这里同步到公共状态存储，如果有必要
    publicStore.setSelectedRows(newVal);
});

</script>

<style scoped lang="scss">
:deep(.n-data-table-td--last-col) {
    .n-button{
        margin: 0 7px 0;
    }
}
</style>