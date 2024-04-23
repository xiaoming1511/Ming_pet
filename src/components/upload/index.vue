<template>
    <div>
        <n-spin :show="show">
            <n-upload action="" :default-file-list="fileList" :custom-request="customRequest" list-type="image-card"
                :before-upload="beforeUpload" max="1" />
        </n-spin>
    </div>
</template>

<script setup lang="ts">
import { useupLoadStore } from '@/stores/modules/upload';
import { usePublicStore } from '@/stores/public'
import { id } from 'element-plus/es/locale';
import { useMessage } from 'naive-ui';

const message = useMessage();
const publicStore = usePublicStore()
const upLoadStore = useupLoadStore()
const show = ref(false)
const fileList = ref([])

const beforeUpload = (file) => {
    // 检查文件格式和大小
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG && !isPNG) {
        message.error('只能上传 JPG 或 PNG 文件!');
        return false;
    }
    if (!isLt2M) {
        message.error('图片大小不能超过 2MB!');
        return false;
    }
    return true;
};

const customRequest = async ({ file, onProgress, onError, onSuccess }) => {
    const formData = new FormData();
    formData.append('img', file.file);
    show.value = true
    try {
        const response = await upLoadStore.upLoadImage(formData);
        message.success('上传成功');
        publicStore.uploadImage = response
    } catch (error) {
        console.log(error);
    } finally {
        show.value = false; // 隐藏加载状态
    }
};

onMounted(() => {
    if (publicStore.isEditMode) {
        fileList.value.push({
            id: publicStore.itemList.productId.toString(),
            name: publicStore.itemList.productName,
            status: 'finished',
            url: publicStore.itemList.imageUrl,
        });
    } else {
        fileList.value = [];
    }
})
</script>

<style scoped></style>