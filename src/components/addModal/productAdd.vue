<template>
    <div>
        <n-modal v-model:show="publicStore.addShowModal" preset="dialog" title="Dialog">
            <template #header>
                <div>添加商品信息</div>
            </template>
            <div>
                <n-form ref="formRef" label-placement="left" label-width="auto" require-mark-placement="right-hanging"
                    :style="{ maxWidth: '640px' }">
                    <n-form-item label="商品图片：" path="inputValue">
                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                            :default-file-list="previewFileList" list-type="image-card" />
                    </n-form-item>
                    <div>
                        <n-form-item label="商品名称：" path="productName">
                            <n-input v-model:value="formModel.productName" placeholder="请输入商品名称" />
                        </n-form-item>
                        <n-form-item label="商品分类：" path="category">
                            <n-select v-model:value="formModel.category" :options="categoryOptions"
                                placeholder="请选择分类" />
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
                </n-form>
            </div>
            <template #action>
                <div>
                    <n-button @click="handleClose">取消</n-button>
                    <n-button type="primary" @click="handleSubmit">提交</n-button>
                </div>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/modules/product';
import { usePublicStore } from '@/stores/public';
const productStore = useProductStore();

const publicStore = usePublicStore();
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
        // value: 'stapleFood'
        value: '1'
    },
    {
        label: '零食',
        // value: 'snacks'
        value: '4'
    }
])

function handleClose() {
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

const handleSubmit = async () => {
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
</script>

<style scoped></style>