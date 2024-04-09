<template>
    <n-space vertical size="large" class="h-screen">
        <n-layout has-sider>
            <n-layout-sider bordered collapse-mode="width" :collapsed="sidebarStore.isSidebarExpanded"
                :collapsed-width="64" :width="sidebarStore.sidebarWidth">
                <n-menu :options="menuOptions" class="text-left h-screen overflow-y-auto" :collapsed-width="64"
                    :collapsed-icon-size="26" />
            </n-layout-sider>
        </n-layout>
    </n-space>
</template>

<script setup lang="ts">
import { defineComponent, h, Component } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    WineOutline as WineIcon,
    HomeOutline as HomeIcon
} from '@vicons/ionicons5'
import { RouterLink } from 'vue-router';

import { useSidebarStore } from '@/stores/modules/sidebar';
const message = useMessage()
const router = useRouter();
const sidebarStore = useSidebarStore();
const filteredRoutes = ref([])
const menuOptions = ref<MenuOption[]>()

const renderIcon = (icon: Component) => {
    if (!icon) {
        console.error('Icon component is null');
        return;
    }
    return () => h(NIcon, null, { default: () => h(icon) });
}

// 递归函数来构建菜单
const buildMenu = (routes: any[]): MenuOption[] => { // 如果有类型定义请替换any
    return routes.map(route => {
        const hasChildren = route.children && route.children.length > 0;
        const menuOption: MenuOption = {
            label: route.meta.title || route.name,
            key: route.path,
            icon: renderIcon(BookIcon), // 适当替换图标
        };

        // 只有当菜单项没有子菜单时，才给它添加RouterLink
        if (!hasChildren) {
            menuOption.label = () => h(
                RouterLink,
                {
                    to: {
                        name: route.name,
                    }
                },
                { default: () => route.meta.title || route.name }
            );
        }

        // 如果菜单项有子菜单，递归构建子菜单
        if (hasChildren) {
            menuOption.children = buildMenu(route.children);
        }

        return menuOption;
    });
}

onMounted(() => {
    const homeRoute = router.getRoutes().find(route => route.path === '/home')
    if (homeRoute?.children) {
        menuOptions.value = buildMenu(homeRoute.children)
    }
})
</script>

<style scoped></style>