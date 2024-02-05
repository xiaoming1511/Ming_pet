<template>
    <div class="flex items-center h-16 justify-between px-16">
        <h3 class="text-base">aaa，欢迎使用宠易萌宠物管理系统！</h3>
        <n-space class="h-16 items-center justify-end">
            <n-dropdown :options="options" trigger="click">
                <n-avatar round size="large" src="https://s11.ax1x.com/2024/02/05/pFlTtZn.jpg" />
            </n-dropdown>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import {
    PersonCircleOutline as UserIcon,
    Pencil as EditIcon,
    LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'

const renderIcon = (icon: Component) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        })
    }
}
const options = [
    {
        label: '用户资料',
        key: 'profile',
        icon: renderIcon(UserIcon)
    },
    {
        label: '编辑用户资料',
        key: 'editProfile',
        icon: renderIcon(EditIcon)
    },
    {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogoutIcon)
    }
]
</script>

<style scoped>
@import '@/style/login.css';
</style>