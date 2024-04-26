<template>
    <div class="flex w-full justify-between items-center h-16 bg-white px-10">
        <n-space>
            <n-switch v-model:value="sidebarStore.isSidebarExpanded">
                <template #icon>
                    <n-icon size="20">
                        <IconSwitch
                            :class="{ 'rotate-clockwise-animation': sidebarStore.isSidebarExpanded, 'rotate-anticlockwise-animation': !sidebarStore.isSidebarExpanded }">
                        </IconSwitch>
                    </n-icon>
                </template>
            </n-switch>
            <h3 class="text-base">{{ userStore.userInfo && userStore.userInfo.username }}，欢迎使用宠易萌宠物管理系统！</h3>
        </n-space>
        <n-space class="items-center">
            <n-button quaternary circle v-for="(item, index) in Icons" :focusable="false"
                @click="handleIconClick(item)">
                <template #icon>
                    <component :is="item" />
                </template>
            </n-button>
            <n-dropdown :options="options" @select="handleSelect">
                <n-avatar round size="large"
                    :src="userStore.userInfo?.avatar || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'" />
            </n-dropdown>
        </n-space>
        <Drawer class="pos-absolute"></Drawer>
    </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/modules/sidebar';
import { useUserStore } from '@/stores/modules/user';
import { usePublicStore } from '@/stores/public';
import { useRouter } from 'vue-router';

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()
const sidebarStore = useSidebarStore();

const iconNames = ['Search', 'Xinxi', 'Cart'];
const Icons = computed(() => iconNames.map(name => `Icon${name}`));

const handleSelect = async (item) => {
    switch (item) {
        case 'profile':
            // 调用查看用户资料的方法
            viewProfile();
            break;
        case 'editProfile':
            // 调用编辑用户资料的方法
            editProfile();
            break;
        case 'logout':
            // 调用退出登录的方法
            await userStore.LogOut();
            router.push('/login');
            break;
        default:
            console.log('Unknown item selected:', item);
    }
};

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

// 定义不同的图标按钮点击方法
const onSearchClick = () => {
    message.warning('搜索功能暂未开放');
}
const onMessageClick = () => {
    message.warning('消息功能暂未开放');
}
const onWalletClick = async () => {
    sidebarStore.changeActive()
}

// 将图标名称映射到对应的点击方法
const iconClickMethods = {
    IconSearch: onSearchClick,
    IconXinxi: onMessageClick,
    IconCart: onWalletClick,
};

// 处理图标按钮点击事件的方法
const handleIconClick = (iconName: string) => {
    const clickHandler = iconClickMethods[iconName];
    if (clickHandler) {
        clickHandler();
    } else {
        console.warn(`No click handler for icon: ${iconName}`);
    }
};
</script>

<style lang="scss" scoped>
.n-icon-slot {
    svg {
        width: 100%;
        height: 100%;
    }
}

.rotate-clockwise-animation {
    animation: rotate-clockwise 0.5s ease-out;
}

.rotate-anticlockwise-animation {
    animation: rotate-anticlockwise 0.5s ease-out;
}

@keyframes rotate-clockwise {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes rotate-anticlockwise {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(-360deg);
    }
}
</style>