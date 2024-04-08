<template>
    <n-space vertical size="large" class="h-screen">
        <n-layout has-sider>
            <n-layout-sider bordered collapse-mode="width" :collapsed="sidebarStore.isSidebarExpanded"
                :collapsed-width="64" :width="sidebarStore.sidebarWidth">
                <n-menu class="text-left h-screen overflow-y-auto" :collapsed-width="64" :collapsed-icon-size="26"
                    :options="menuOptions" @update:value="handleMenuSelect" />
            </n-layout-sider>
        </n-layout>
    </n-space>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router';

import { useSidebarStore } from '@/stores/modules/sidebar';
const router = useRouter();
const sidebarStore = useSidebarStore();

// 路由跳转
function handleMenuSelect(key: string) {
    // 根据 key 值来决定跳转的目标
    const item = menuOptions.find(option => option.key === key);
    if (item) {
        router.push({ name: item.key, params: { lang: 'zh-CN' } });
    }
}

function renderIcon(iconName: string) {
    return () => h(NIcon, null, { default: () => h(iconName) });
}

const menuOptions = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'Dashboard',
                    }
                },
                { default: () => '首页' }
            ),
        key: 'Home',
        icon: () => h('IconShouye'),
    },
    {
        label: '商品服务',
        key: 'goods',
        icon: renderIcon('kucun'),
        children: [
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                name: 'List',
                            }
                        },
                        { default: () => '商品管理' }
                    ),
                key: 'List',
                icon: renderIcon('dingdan'),
            },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                name: 'Record',
                            }
                        },
                        { default: () => '商品记录' }
                    ),
                key: 'Record',
                icon: renderIcon('dingdan'),
            },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                name: 'Service',
                            }
                        },
                        { default: () => '服务管理' }
                    ),
                key: 'Service',
                icon: renderIcon('dingdan'),
            },
        ]
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'Order',
                    }
                },
                { default: () => '订单管理' }
            ),
        key: 'Order',
        icon: renderIcon('dingdan'),
    },
    {
        label: '宠物管理',
        key: 'pet',
        icon: renderIcon('pet'),
        children: [
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                name: 'PetList',
                            }
                        },
                        { default: () => '宠物列表' }
                    ),
                key: 'PetList',
                icon: renderIcon('dingdan')
            },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                name: 'PetWarning',
                            }
                        },
                        { default: () => '宠物提醒' }
                    ),
                key: 'PetWarning',
                icon: renderIcon('dingdan')
            }
        ]
    },
    {
        label: '会员管理',
        key: 'VIP',
        icon: renderIcon('huiyuanzhongxin'),
    },
    {
        label: '店员管理',
        key: 'Workers',
        icon: renderIcon('shuju'),
    },
    {
        label: '数据中心',
        key: 'Digital',
        icon: renderIcon('qushi'),
    },
]

</script>

<style scoped></style>