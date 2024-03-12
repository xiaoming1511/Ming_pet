<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-input placeholder="请输入商品名称" clearable>
                    <template #prefix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>

            <template #search-controls>
                <n-select v-model:value="selectedValue" filterable clearable placeholder="选择分类" :options="options" />
            </template>

            <template #search-actions>
                <n-button class="mr-4" text quaternary :focusable="false" @click="addProduct">
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
        <Table :columns="columns" :data="productList" :row-key="rowKeyProp"></Table>
        <ProductAdd></ProductAdd>
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/modules/product';
import { Navigate } from '@vicons/ionicons5';
import { NButton, NSwitch, NAvatar, useDialog, useModal } from 'naive-ui';
import { usePublicStore } from '@/stores/public';

const publicStore = usePublicStore();
const productStore = useProductStore();
const productList = ref([])
const selectedValue = ref(null)

const rowKeyProp = 'productId'
const showDialog = useDialog();
const modal = useModal();
const message = useMessage();

const columns = ref([
    {
        title: 'productId',
        key: 'productId'
    },
    {
        title: '商品图片',
        key: 'imageUrl',
        render(row) {
            return h(NAvatar, {
                size: 'large',
                src: row.imageUrl
            });
        }
    },
    {
        title: '商品名称',
        key: 'productName'
    },
    {
        title: '分类',
        key: 'category'
    },
    {
        title: '商品描述',
        key: 'productDescription'
    },
    {
        title: '商品状态',
        key: 'status',
        render(row) {
            return h(
                NSwitch,
                {
                    value: row.status,
                    onUpdateValue: (newVal) => {
                        row.status = !row.status
                        // 可以在这里调用一个方法来发送状态更新到服务器
                        changeStatus(row.productId, newVal);
                    }
                }
            );
        }
    },
    {
        title: '库存数量',
        key: 'stockQuantity'
    },
    {
        title: '商品价格',
        key: 'price'
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

onMounted(async () => {
    await productStore.fetchProductList();
    productList.value = JSON.parse(JSON.stringify(productStore.products));
})

function showDeleteConfirm(row) {
    showDialog.warning({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this product?',
        positiveText: 'Confirm',
        negativeText: 'Cancel',
        onPositiveClick: () => handleDeleteClick(row.productId)
    });
}

function handleEdit(row) {
    console.log('Edit clicked', row);
    publicStore.editShowModal = !publicStore.editShowModal
    publicStore.itemList = row
    publicStore.listType = 'product'
}

const handleDeleteClick = async (productId) => {
    try {
        await productStore.deleteProductItem(productId);
        await productStore.fetchProductList();
        message.success("删除成功");
    } catch (error) {
        console.error('删除失败', error);
    }
}

async function changeStatus(row, newVal) {
    const productId = row;
    const statusValue = newVal ? 1 : 0;
    const updatedData = { ...row, status: statusValue };

    try {
        await productStore.updateProductItem(productId, updatedData);
        // The store will handle updating the list internally
    } catch (error) {
        console.error("Failed to update product status:", error);
    }
}

function addProduct() {
    publicStore.addShowModal = true
}

watch(() => productStore.products, (newProducts) => {
    productList.value = newProducts;
}, { deep: true });
</script>

<style scoped lang="scss"></style>