<template>
    <div>
        <n-upload action="" :custom-request="customRequest" list-type="image-card" :on-success="handleSuccess"
            :on-error="handleError" :before-upload="beforeUpload" />
    </div>
</template>

<script setup lang="ts">
import { useupLoadStore } from '@/stores/modules/upload';
import { useMessage } from 'naive-ui';

const message = useMessage();
const upLoadStore = useupLoadStore()

const handleSuccess = (response, file, fileList) => {
    // 处理上传成功逻辑
    message.success('上传成功');
    console.log('上传成功', response, file, fileList);
};

const handleError = (error, file, fileList) => {
    // 处理上传失败逻辑
    message.error('上传失败');
    console.error('上传失败', error, file, fileList);
};

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
    formData.append('img', file); // 'img'是后端接收文件的字段名
    console.log(formData);

    try {
        const response = await upLoadStore.upLoadImage(formData);
    } catch (error) {

    }
};
</script>

<style scoped></style>