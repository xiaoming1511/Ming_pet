<template>
    <div>
        <el-form :model="form" label-width="auto" style="max-width: 600px" class='ml-32'>
            <el-form-item label="Avatar">
                <el-upload class="avatar-uploader" :http-request="customRequest" :show-file-list="false"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称" class='w-130'>
                <el-input v-model="form.nickName" class="h-10" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phoneNumber" />
            </el-form-item>
            <el-form-item label="角色">
                <el-radio-group v-model="form.roleName" disabled>
                    <el-radio value="admin">admin</el-radio>
                    <el-radio value="user">user</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Resources">
                <el-radio-group v-model="form.sex">
                    <el-radio value="male">男</el-radio>
                    <el-radio value="female">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user';

import { useupLoadStore } from '@/stores/modules/upload';
import type { UploadProps } from 'element-plus'

const upLoadStore = useupLoadStore()
const userStore = useUserStore()
const token = ref()
const form = reactive(JSON.parse(JSON.stringify(userStore.userInfo)))
if (userStore.userInfo.sex === '男') {
    form.sex = 'male';
} else if (userStore.userInfo.sex === '女') {
    form.sex = 'female';
}
const imageUrl = ref(form.avatar)

const customRequest = async ({ file, onProgress, onError, onSuccess }) => {
    const formData = new FormData();
    formData.append('img', file);
    try {
        const config = {
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress({ percent: percentCompleted });
            }
        };
        const response = await upLoadStore.upLoadImage(formData);
        ElMessage.success('上传成功');
        onSuccess(response.data); // 传递给 onSuccess 回调以处理上传成功
        // 这里假设响应中包含图片的URL，更新 imageUrl 以显示上传的图片
        imageUrl.value = response;
    } catch (error) {
        ElMessage.error('上传失败');
        onError(error); // 传递给 onError 回调以处理上传失败
    }
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG or PNG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

const onSubmit = async () => {
    const { username, roleName, id, sex, avatar, ...otherData } = form
    try {
        const response = await userStore.updateUserInfo(id, {
            ...otherData,
            avatar: imageUrl.value,
            sex: sex === 'male' ? '男' : (sex === 'female' ? '女' : sex),
        })
        if (response && response.data) {
            userStore.userInfo = { ...userStore.userInfo, ...response.data };
        }
        console.log(userStore.userInfo);
        ElMessage.success('保存成功')
    } catch (error) {
        ElMessage.error('保存失败', error)
    }
}

onMounted(() => {
    token.value = localStorage.getItem("token")
})
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 100px;
    height: 100px;
    display: block;
}

.el-form-item {
    width: 30rem;
    padding: 10px 0;

    .el-input {
        height: 2.5rem
    }
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 2px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
}
</style>