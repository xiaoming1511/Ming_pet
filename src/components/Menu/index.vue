<template>
    <n-space vertical size="large" class="h-screen">
        <n-layout has-sider>
            <n-layout-sider bordered collapse-mode="width" :collapsed="sidebarStore.isSidebarExpanded"
                :collapsed-width="collapsedWidth" :width="sidebarStore.sidebarWidth">
                <n-menu :options="menuOptions" class="text-left h-screen overflow-y-auto <md:hidden"
                    :collapsed-width="collapsedWidth" :collapsed-icon-size="26" />
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
import { useResponsiveBreakpoint } from '@/composables/useResponsiveBreakpoint';

const message = useMessage()
const router = useRouter();
const sidebarStore = useSidebarStore();
const filteredRoutes = ref([])
const menuOptions = ref<MenuOption[]>()
const { responsiveBreakpoint, updateBreakpoint } = useResponsiveBreakpoint();
const icons = import.meta.glob("@/assets/icons/menuIcon/*.svg", { eager: true });
const iconComponents: Record<string, Component> = {};

Object.entries(icons).forEach(([path, resolve]) => {
    const iconName = path.split('/').pop()?.split('.')[0];
    if (iconName) {
        iconComponents[iconName] = defineAsyncComponent(() => Promise.resolve(resolve.default));
    }
});

const renderIcon = (iconName: string) => {
    const icon = iconComponents[iconName];
    if (!icon) {
        console.error(`没有找到名为 '${iconName}' 的图标组件`);
        return;
    }
    // 使用 NIcon 包装 SVG 图标组件
    return () => h(NIcon, null, { default: () => h(icon) });
};

const collapsedWidth = computed(() => {
    return (responsiveBreakpoint.value === 'sm' || responsiveBreakpoint.value === 'xs') ? 0 : 64;
});

// 递归函数构建菜单，其余代码基本保持不变
const buildMenu = (routes: any[]): MenuOption[] => {
    return routes.map(route => {
        const hasChildren = route.children && route.children.length > 0;
        const menuOption: MenuOption = {
            label: route.meta.title || route.name,
            key: route.path,
            icon: route.meta.icon ? renderIcon(route.meta.icon) : undefined, // 使用图标名称来渲染图标
        };

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

        if (hasChildren) {
            menuOption.children = buildMenu(route.children);
        }

        return menuOption;
    });
};

// 使用 watch 来侦听断点变化并更新侧边栏展开状态
watch(responsiveBreakpoint, (newBreakpoint) => {
    sidebarStore.isSidebarExpanded =
        newBreakpoint === 'sm' || newBreakpoint === 'xs' || newBreakpoint === 'md' || newBreakpoint === 'lg';
});

onMounted(() => {
    const homeRoute = router.getRoutes().find(route => route.path === '/home');
    if (homeRoute?.children) {
        menuOptions.value = buildMenu(homeRoute.children);
    }
    // 初始化时也检查一次
    updateBreakpoint();
});
</script>

<style scoped></style>