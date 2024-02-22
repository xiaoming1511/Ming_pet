<template>
    <n-space vertical size="large" class="h-screen">
        <n-layout has-sider>
            <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="210">
                <n-menu class="text-left" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
                    @update:value="handleMenuSelect" />
            </n-layout-sider>
        </n-layout>
    </n-space>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import Home from "@/assets/icons/shouye.svg?component";
import Order from "@/assets/icons/dingdan.svg?component";
import Pet from "@/assets/icons/pet.svg?component";
import VIP from "@/assets/icons/huiyuanzhongxin.svg?component";
import Inventory from "@/assets/icons/kucun.svg?component";
import Workers from "@/assets/icons/shuju.svg?component";
import Digital from "@/assets/icons/qushi.svg?component";
import { RouterLink } from 'vue-router';
import { h, Component } from 'vue';


const router = useRouter();

// 路由跳转
function handleMenuSelect(key: string) {
    // 根据 key 值来决定跳转的目标
    const item = menuOptions.find(option => option.key === key);
    if (item) {
        router.push({ name: item.key, params: { lang: 'zh-CN' } });
    }
}

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
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
        icon: renderIcon(Home)
    },
    {
        label: '商品服务',
        key: 'goods',
        icon: renderIcon(Inventory),
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
                icon: renderIcon(Order),
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
                icon: renderIcon(Order),
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
                icon: renderIcon(Order),
            }
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
        icon: renderIcon(Order),
    },
    {
        label: '宠物管理',
        key: 'pet',
        icon: renderIcon(Pet),
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
                icon: renderIcon(Order)
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
                icon: renderIcon(Order)
            }
        ]
    },
    {
        label: '会员管理',
        key: 'VIP',
        icon: renderIcon(VIP),
    },
    {
        label: '店员管理',
        key: 'Workers',
        icon: renderIcon(Workers),
    },
    {
        label: '数据中心',
        key: 'Digital',
        icon: renderIcon(Digital),
    },
]
</script>

<style scoped>
:deep(.n-base-icon) {
    z-index: 1000;
}
</style>