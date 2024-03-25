<template>
    <div>
        <n-data-table :columns="columns" :data="data" />
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/modules/product';

const productStore = useProductStore();
const inputValue = ref('')

const props = defineProps<{
    columns: DataTableColumns,
    data: any[],
    rowKey: string
}>();



</script>

<style scoped></style>