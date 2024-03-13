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
                <n-select class="max-w-48" v-model:value="selectedValue" filterable clearable placeholder="选择分类"
                    :options="options" />
            </template>
            <template #search-actions>
                <n-button round>
                    搜索
                </n-button>
            </template>
        </SearchBar>
        <Table :columns="columns" :data="PetsList" :row-key="rowKeyProp"></Table>
    </div>
</template>

<script setup lang="ts">
import { usePetsStore } from '@/stores/modules/pets';
import { NButton, useModal } from 'naive-ui';
import { usePublicStore } from '@/stores/public';

const publicStore = usePublicStore();
const PetsStore = usePetsStore();
const PetsList = ref([])
const rowKeyProp = 'id'

const disablePreviousDate = (ts: number) => {
    return ts > Date.now()
}
const selectedValue = ref(null)
const showDialog = useDialog();
const modal = useModal();

const breed = ref([
    {
        label: 'Dog',
        value: 'dog'
    },
    {
        label: 'Cat',
        value: 'cat'
    },
])
const gender = ref([
    {
        label: '弟弟',
        value: 'GG'
    },
    {
        label: '妹妹',
        value: 'MM'
    },
])
const options = [
    {
        label: 'Drive My Car',
        value: 'song1'
    },
    {
        label: 'Norwegian Wood',
        value: 'song2'
    },
]
const columns = ref([
    {
        title: 'Id',
        key: 'id'
    },
    {
        title: '宠物名称',
        key: 'petName'
    },
    {
        title: '种类',
        key: 'breed'
    },
    {
        title: '性别',
        key: 'gender'
    },
    {
        title: '年龄',
        key: 'age'
    },
    {
        title: '健康',
        key: 'healthStatus'
    },
    {
        title: '状态',
        key: 'saleStatus'
    },
    {
        title: '价格',
        key: 'price'
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
    await PetsStore.fetchPets()
    PetsList.value = PetsStore.pets
})

function showDeleteConfirm(row) {
    showDialog.warning({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this product?',
        positiveText: 'Confirm',
        negativeText: 'Cancel',
        onPositiveClick: () => handleDelete(row.id)
    });
}

function handleEdit(row) {
    console.log('Edit clicked', row);
    publicStore.editShowModal = !publicStore.editShowModal
    publicStore.itemList = row
    publicStore.listType = 'pet'
}

async function handleDelete(Id) {
    console.log('Confirmed delete', Id);
    // await productStore.deleteProduct(productId);
    // await productStore.fetchProductList();
    // productList.value = productStore.products;
}

function changeStatus(row, newVal) {
    console.log(`Product ID: ${row} New Status: ${newVal}`);
}
</script>

<style scoped></style>