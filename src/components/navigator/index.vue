<template>
    <div class="flex w-full items-center h-16 justify-between px-10 bg-white">
        <n-space>
            <n-switch v-model:value="sidebarStore.isSidebarExpanded">
                <template #icon>
                    <n-icon size="10">
                        <IconAdd></IconAdd>
                    </n-icon>
                </template>
            </n-switch>
            <h3 class="text-base">aaa，欢迎使用宠易萌宠物管理系统！</h3>
        </n-space>
        <n-space class="h-16 items-center justify-end">
            <n-button quaternary circle v-for="item in Icons" :focusable="false">
                <template #icon>
                    <component :is="item" />
                </template>
            </n-button>
            <n-dropdown :options="options">
                <n-avatar round size="large" src="https://s11.ax1x.com/2024/02/05/pFlTtZn.jpg" />
            </n-dropdown>
        </n-space>
        
    </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/modules/sidebar';

const iconNames = ['Sousuo', 'Xinxi', 'Qianbao'];
const Icons = computed(() => iconNames.map(name => `Icon${name}`));


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

// const icons = [
//     {
//         icon: renderIcon(Sous)
//     },
//     {
//         icon: renderIcon(Xinxi)
//     },
//     {
//         icon: renderIcon(Qianb)
//     }
// ]

const sidebarStore = useSidebarStore();

</script>

<style scoped>
@import '@/style/login.css';
</style>