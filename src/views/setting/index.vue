<template>
    <div class="w-screen h-screen">
        <n-layout has-sider class="h-screen">
            <n-layout-sider>
                <el-menu default-active="2" class="el-menu-vertical-demo h-full">
                    <el-menu-item index="1" @click="geHome">
                        <template #title>
                            <el-icon>
                                <ArrowLeft />
                            </el-icon>
                            <span>返回</span>
                        </template>
                    </el-menu-item>
                    <div class="py-7">
                        <el-avatar :src="userStore.userInfo.avatar" />
                        <span> {{ userStore.userInfo.nickName }} </span>
                    </div>
                    <el-menu-item index="2" @click="switchComponent(userInfo, '个人信息')">
                        <el-icon><icon-menu /></el-icon>
                        <span>个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="switchComponent(systemSetting, '安全日志')">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>安全日志</span>
                    </el-menu-item>
                </el-menu>
            </n-layout-sider>
            <n-layout>
                <h3 class="text-2xl mx-32 text-left py7">{{ currentTitle }}</h3>
                <component :is="currentComponent" class="flex h10"></component>
            </n-layout>
        </n-layout>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';
import userInfo from './userInfo/index.vue'
import systemSetting from './systemSettings/index.vue'
import { useRouter } from 'vue-router';
import {
    Document,
    Menu as IconMenu,
    Setting,
    ArrowLeft,
} from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter();
const currentComponent = shallowRef(userInfo);
const currentTitle = ref('个人信息'); // 默认标题

const switchComponent = (component, title: string) => {
    currentComponent.value = component;
    currentTitle.value = title;
}

const geHome = () => {
    router.push('/home');
}
</script>

<style scoped lang="scss">
.el-menu-item:hover,
.el-submenu_title:hover {
    background-color: transparent !important;
}
</style>