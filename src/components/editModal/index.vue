<template>
    <div>
        <n-modal v-model:show="publicStore.editShowModal" preset="dialog" title="Dialog" :style="bodyStyle">
            <template #header>
                <!-- <div v-if="publicStore.listType == 'product'">编辑{{ publicStore.itemList.productName }}信息</div>
                <div v-else>
                    编辑{{ publicStore.itemList.petName }}信息
                </div> -->
                <slot name="header"></slot>
            </template>
            <div>

                <n-form ref="formRef" label-placement="left" label-width="auto" require-mark-placement="right-hanging"
                    :style="{ maxWidth: '640px' }">
                    <slot name="form-content"></slot>
                    <!-- 
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
                    </div> -->
                </n-form>
            </div>
            <template #action>
                <slot name="action"></slot>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { usePublicStore } from '@/stores/public';
const publicStore = usePublicStore();

const bodyStyle = ref({
    width: 'auto'
});
</script>

<style scoped></style>