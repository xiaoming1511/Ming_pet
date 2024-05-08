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
                    <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <span>Navigator Two</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>Navigator Three</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>Navigator Four</span>
                    </el-menu-item>
                </el-menu>
            </n-layout-sider>
            <n-layout>
                <h3>个人中心</h3>
                <n-button @click="switchComponent(userInfo)">User Info</n-button>
                <n-button @click="switchComponent(systemSetting)">System Setting</n-button>
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

const switchComponent = (componentName: string) => {
    currentComponent.value = componentName;
};

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