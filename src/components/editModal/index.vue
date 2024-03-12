<template>
    <div>
        <n-modal v-model:show="publicStore.editShowModal" preset="dialog" title="Dialog">
            <template #header>
                <div v-if="publicStore.listType == 'product'">编辑{{ publicStore.itemList.productName }}信息</div>
                <div v-else>
                    编辑{{ publicStore.itemList.petName }}信息
                </div>
            </template>
            <div>
                <n-form ref="formRef" label-placement="left" label-width="auto" require-mark-placement="right-hanging"
                    :style="{ maxWidth: '640px' }">
                    <n-form-item label="商品图片：" path="inputValue">
                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                            :default-file-list="previewFileList" list-type="image-card" />
                    </n-form-item>
                    <div v-if="publicStore.listType == 'product'">
                        <n-form-item label="商品名称：" path="inputValue">
                            <n-input v-model:value="publicStore.itemList.productName" placeholder="Input" />
                        </n-form-item>
                        <n-form-item label="商品分类：" path="inputValue">
                            <n-select v-model:value="publicStore.itemList.category" :options="categoryOptions"
                                placeholder="请选择分类" />
                        </n-form-item>
                        <n-form-item label="商品描述：" path="inputValue">
                            <n-input v-model:value="publicStore.itemList.productDescription" placeholder="Input" />
                        </n-form-item>
                        <n-form-item label="库存数量：" path="inputValue">
                            <n-input v-model:value="publicStore.itemList.stockQuantity" placeholder="Input" />
                        </n-form-item>
                        <n-form-item label="商品价格：" path="inputValue">
                            <n-input-number v-model:value="publicStore.itemList.price" :show-button="false">
                                <template #prefix>
                                    ￥
                                </template>
                            </n-input-number>
                        </n-form-item>
                    </div>
                    <div v-else>
                        <n-form-item label="宠物名称：" path="inputValue">
                            <n-input v-model:value="publicStore.itemList.petName" placeholder="Input" />
                        </n-form-item>
                        <n-form-item label="宠物种类：" path="inputValue">
                            <n-select v-model:value="value" :options="breed" />
                        </n-form-item>
                        <n-form-item label="宠物性别：" path="inputValue">
                            <n-select v-model:value="value" :options="gender" />
                        </n-form-item>
                        <n-form-item label="宠物年龄：" path="inputValue">
                            <n-input-number v-model:value="publicStore.itemList.age" button-placement="both" />
                        </n-form-item>
                        <n-form-item label="健康状态：" path="inputValue">
                            <n-input v-model:value="publicStore.itemList.healthStatus" placeholder="Input" />
                        </n-form-item>
                        <n-form-item label="宠物状态：" path="inputValue">
                            <n-input v-model:value="publicStore.itemList.petName" placeholder="Input" />
                        </n-form-item>
                        <n-form-item label="宠物价格：" path="inputValue">
                            <n-input-number v-model:value="publicStore.itemList.price" :show-button="false">
                                <template #suffix>
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
const productStore = useProductStore()

const publicStore = usePublicStore();
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

const previewFileList = ref<UploadFileInfo[]>([
    {
        id: 'react',
        name: '我是react.png',
        status: 'finished',
        url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    },
])
function handleClose() {
    publicStore.editShowModal = false;
}
async function handleSubmit() {
    if (publicStore.listType == 'product') {
        const productId = publicStore.itemList.productId
        await productStore.updateProductItem(productId, publicStore.itemList);
        publicStore.editShowModal = false;
    } else {

    }
}
</script>

<style scoped></style>