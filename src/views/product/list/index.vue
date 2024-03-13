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
        <EditModal>
            <template #header>
                <div>编辑{{ editTitle }}信息</div>
            </template>
            <template #form-content>
                <n-form-item label="商品图片：" path="inputValue">
                    <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                        :default-file-list="previewFileList" list-type="image-card" />
                </n-form-item>
                <div>
                    <n-form-item label="商品名称：" path="productName">
                        <n-input v-model:value="editingProduct.productName" placeholder="Input" />
                    </n-form-item>
                    <n-form-item label="商品分类：" path="category">
                        <n-select v-model:value="editingProduct.category" :options="categoryOptions"
                            placeholder="请选择分类" />
                    </n-form-item>
                    <n-form-item label="商品描述：" path="productDescription">
                        <n-input v-model:value="editingProduct.productDescription" placeholder="Input" />
                    </n-form-item>
                    <n-form-item label="库存数量：" path="stockQuantity">
                        <n-input v-model:value="editingProduct.stockQuantity" placeholder="Input" />
                    </n-form-item>
                    <n-form-item label="商品价格：" path="price">
                        <n-input-number v-model:value="editingProduct.price" :show-button="false">
                            <template #prefix>
                                ￥
                            </template>
                        </n-input-number>
                    </n-form-item>
                </div>
            </template>
            <template #action>
                <div>
                    <n-button @click="editShowModalhandleClose">取消</n-button>
                    <n-button type="primary" @click="edithandleSubmit">提交</n-button>
                </div>
            </template>
        </EditModal>
        <AddModal>
            <template #header>
                <div>添加商品信息</div>
            </template>
            <template #form-content>
                <n-form-item label="商品图片：" path="inputValue">
                    <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                        :default-file-list="previewFileList" list-type="image-card" />
                </n-form-item>
                <div>
                    <n-form-item label="商品名称：" path="productName">
                        <n-input v-model:value="formModel.productName" placeholder="请输入商品名称" />
                    </n-form-item>
                    <n-form-item label="商品分类：" path="category">
                        <n-select v-model:value="formModel.category" :options="categoryOptions" placeholder="请选择分类" />
                    </n-form-item>
                    <n-form-item label="商品描述：" path="productDescription">
                        <n-input v-model:value="formModel.productDescription" placeholder="请输入商品描述" />
                    </n-form-item>
                    <n-form-item label="库存数量：" path="stockQuantity">
                        <n-input v-model:value="formModel.stockQuantity" placeholder="请输入库存数量" />
                    </n-form-item>
                    <n-form-item label="商品价格：" path="price">
                        <n-input-number v-model:value="formModel.price" :show-button="false" placeholder="请输入商品价格">
                            <template #prefix>
                                ￥
                            </template>
                        </n-input-number>
                    </n-form-item>
                </div>
            </template>
            <template #action>
                <div>
                    <n-button @click="addShowModalhandleClose">取消</n-button>
                    <n-button type="primary" @click="addhandleSubmit">提交</n-button>
                </div>
            </template>
        </AddModal>
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
const editingProduct = ref({});
const editTitle = ref('')

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
const formModel = ref({
    productName: '',
    productDescription: '',
    stockQuantity: '',
    price: null,
    productImage: '', // 存储上传的图片
    category: null // 商品分类
});
const categoryOptions = ref([
    {
        label: '主粮',
        value: '1'
    },
    {
        label: '零食',
        value: '4'
    }
])

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

function getCategoryValue(categoryName) {
    const categoryOption = categoryOptions.value.find(option => option.label === categoryName);
    return categoryOption ? categoryOption.value : null;
}

function handleEdit(row) {
    editingProduct.value = JSON.parse(JSON.stringify(row));
    editTitle.value = editingProduct.value.productName
    editingProduct.value.category = getCategoryValue(editingProduct.value.category);
    publicStore.editShowModal = !publicStore.editShowModal
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



function addShowModalhandleClose() {
    // 重置表单模型
    formModel.value = {
        productName: '',
        productDescription: '',
        stockQuantity: null,
        price: null,
        productImage: "",
        category: null
    };
    publicStore.addShowModal = false;
}

const addhandleSubmit = async () => {
    try {
        const productData = {
            category: formModel.value.category,
            imageUrl: formModel.value.productImage,
            price: formModel.value.price,
            productDescription: formModel.value.productDescription,
            productName: formModel.value.productName,
            stockQuantity: formModel.value.stockQuantity,
        };

        // 提交数据到 store 的 action
        await productStore.addProductItem(productData);
        resetFormModel();
        await productStore.fetchProductList();
        publicStore.addShowModal = false;
        // 重置 formModel 的值
    } catch (error) {
        console.error('提交失败', error);
        // 处理错误，例如显示错误消息给用户
    }
};
function resetFormModel() {
    formModel.value = {
        productName: '',
        productDescription: '',
        stockQuantity: '',
        price: null,
        productImage: '',
        category: null
    };
}

const previewFileList = ref<UploadFileInfo[]>([
    {
        id: 'react',
        name: '我是react.png',
        status: 'finished',
        url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    },
])
function editShowModalhandleClose() {
    publicStore.editShowModal = false;
}
async function edithandleSubmit() {
    await productStore.updateProductItem(editingProduct.value.productId, editingProduct.value);
    publicStore.editShowModal = false;
    await productStore.fetchProductList();
}

</script>

<style scoped lang="scss"></style>