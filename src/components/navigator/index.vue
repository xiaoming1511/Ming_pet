<template>
    <div class="flex items-center h-16 justify-between px-10">
        <n-space>
            <n-switch v-model:value="sidebarStore.isSidebarExpanded">
                <template #icon>
                    🤔
                </template>
            </n-switch>
            <h3 class="text-base">aaa，欢迎使用宠易萌宠物管理系统！</h3>
        </n-space>
        <n-space class="h-16 items-center justify-end">
            <n-button quaternary circle v-for="item in icons" :focusable="false">
                <template #icon>
                    <component :is="item.icon" />
                </template>
            </n-button>
            <n-dropdown :options="options">
                <n-avatar round size="large" src="https://s11.ax1x.com/2024/02/05/pFlTtZn.jpg" />
            </n-dropdown>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import Xinxi from "@/assets/icons/navigator/xinxi.svg?component";
import Sous from "@/assets/icons/navigator/sousuo.svg?component";
import Qianb from "@/assets/icons/navigator/qianbao.svg?component";
import { NIcon } from 'naive-ui'

import { useSidebarStore } from '@/stores/modules/sidebar';
function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const options = [
    {
        label: '用户资料',
        key: 'profile',
    },
    {
        label: '编辑用户资料',
        key: 'editProfile',
    },
    {
        label: '退出登录',
        key: 'logout',
    }
]

const icons = [
    {
        icon: renderIcon(Sous)
    },
    {
        icon: renderIcon(Xinxi)
    },
    {
        icon: renderIcon(Qianb)
    }
]

const sidebarStore = useSidebarStore();

</script>

<style scoped>
@import '@/style/login.css';
</style>