<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-input v-model:value="searchKeyword" placeholder="请输入商品名称" clearable>
                    <template #prefix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>

            <template #search-controls>
                <n-select v-model:value="selectedValue" filterable clearable placeholder="选择分类"
                    :options="categoryOptions" />
            </template>

            <template #search-actions>
                <n-button class="mr-4" quaternary :focusable="false" @click="addProduct">
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
        <Table :columns="columns" :data="productList" :row-key="row => row.productId"></Table>
        <Modal>
            <template #header>
                <div>{{ publicStore.modalTitle }}</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="商品图片：" path="inputValue">
                        <Upload :id="publicStore.itemList.productId" :name="publicStore.itemList.productName"
                            :url="publicStore.itemList.imageUrl"></Upload>
                    </n-form-item>
                    <n-form-item label="商品名称：" path="productName">
                        <n-input v-model:value="publicStore.itemList.productName" placeholder="请输入商品名称" />
                    </n-form-item>
                    <n-form-item label="商品分类：" path="category">
                        <n-select v-model:value="publicStore.itemList.category" :options="categoryOptions"
                            placeholder="请选择分类" />
                    </n-form-item>
                    <n-form-item label="商品描述：" path="productDescription">
                        <n-input v-model:value="publicStore.itemList.productDescription" placeholder="请输入商品描述" />
                    </n-form-item>
                    <n-form-item label="库存数量：" path="stockQuantity">
                        <n-input v-model:value="publicStore.itemList.stockQuantity" placeholder="请输入商品数量"
                            :show-button="false" />
                    </n-form-item>
                    <n-form-item label="商品价格：" path="price">
                        <n-input-number v-model:value="publicStore.itemList.price" :show-button="false">
                            <template #prefix>
                                ￥
                            </template>
                        </n-input-number>
                    </n-form-item>
                </div>
            </template>
            <template #action>
                <div>
                    <n-button @click="publicStore.changeShowModal()">取消</n-button>
                    <n-button type="primary" @click="handleSubmit()">提交</n-button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/modules/product';
import { Navigate } from '@vicons/ionicons5';
import { NButton, NSwitch, NAvatar, useDialog, useModal } from 'naive-ui';
import { usePublicStore } from '@/stores/public';

const publicStore = usePublicStore();
const productStore = useProductStore();
const showDialog = useDialog();
const modal = useModal();
const message = useMessage();

const productList = ref([])
const searchKeyword = ref(null)
const selectedValue = ref(null)
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
        key: 'categoryName'
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
// 分类
const categoryOptions = ref([]);
const formModel = ref({
    productName: '',
    productDescription: '',
    stockQuantity: '',
    price: null,
    productImage: '',
    category: null,
    imageUrl: ''
});

// 获取分类id
function getCategoryValue(categoryName) {
    const categoryOption = categoryOptions.value.find(option => option.label === categoryName);
    return categoryOption ? categoryOption.value : null;
}

function addProduct() {
    publicStore.openAddModal(formModel.value)
}

onMounted(async () => {
    await productStore.fetchProductList();
    await productStore.getCategory()
    productList.value = JSON.parse(JSON.stringify(productStore.products));
    categoryOptions.value = productStore.categories.map(cat => ({
        label: cat.categoryName,
        value: cat.categoryId
    }));
})
watch(() => productStore.products, (newProducts) => {
    productList.value = newProducts;
}, { deep: true });

// 编辑商品信息
const handleEdit = (row) => {
    const { status, categoryName, ...rest } = row;
    publicStore.itemList = {
        ...rest,
        category: getCategoryValue(categoryName)
    };

    publicStore.openEditModal(publicStore.itemList)
}
// 提交
const handleSubmit = async () => {
    if (publicStore.uploadImage) {
        publicStore.itemList.imageUrl = publicStore.uploadImage;
    }

    try {
        if (publicStore.isEditMode) {
            // 编辑操作
            await productStore.updateProductItem(publicStore.itemList.productId, publicStore.itemList);
            message.success("修改商品信息成功");
        } else {
            // 添加操作
            await productStore.addProductItem(publicStore.itemList);
            // 清空 itemList 
            publicStore.resetItemList();
            message.success("添加商品信息成功");
        }
    } catch (error) {
        // 操作失败的错误处理
        message.error("操作失败：" + error.message);
        console.error(error); // 确保这里也输出error，以便调试
    }

    // 关闭模态框并刷新商品列表
    publicStore.changeShowModal();
    await productStore.fetchProductList();
}

// 修改状态
async function changeStatus(row, newVal) {
    const productId = row;
    const statusValue = newVal ? 1 : 0;
    const updatedData = { ...row, status: statusValue };
    try {
        await productStore.updateProductItem(productId, updatedData);
        message.success("修改商品状态成功");
    } catch (error) {
        console.error("Failed to update product status:", error);
    }
}

// 删除
function showDeleteConfirm(row) {
    showDialog.warning({
        title: '确认删除?',
        content: '您确定要删除此产品吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => handleDeleteClick(row.productId)
    });
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

const handleSearch = async () => {
    try {
        // 如果同时存在搜索关键词和选定的分类
        if (searchKeyword.value && selectedValue.value) {
            // 先根据分类筛选
            await productStore.getProductsByCategory(selectedValue.value);
            // 再根据搜索关键词进行过滤
            productList.value = productStore.products.filter(product =>
                product.productName.includes(searchKeyword.value)
            ).map(mapProductWithCategory);
            console.log(productList.value);
        } else if (searchKeyword.value) {
            // 仅存在搜索关键词
            await productStore.getProductsByName(searchKeyword.value);
            productList.value = productStore.products.map(mapProductWithCategory);
            console.log(productList.value);
        } else if (selectedValue.value) {
            // 仅存在选定的分类
            await productStore.getProductsByCategory(selectedValue.value);
            productList.value = productStore.products.map(mapProductWithCategory);
            console.log(productList.value);
        } else {
            // 如果没有任何筛选条件，获取所有产品
            await productStore.fetchProductList();
        }
    } catch (error) {
        console.error("Failed to fetch and process products:", error);
    }
}
function mapProductWithCategory(product) {
    const category = categoryOptions.value.find(option => option.value == product.category);
    
    return {
        ...product,
        status: product.status === '1', // 状态转换
        categoryName: category ? category.label : product.categoryName, 
    };
}
</script>

<style scoped lang="scss">
:deep(.n-button) {
    margin: 0 7px 0;
}
</style>