<template>
    <div class="flex w-full justify-between items-center h-16 bg-white px-10">
        <n-space>
            <n-switch v-model:value="sidebarStore.isSidebarExpanded"
                v-if="responsiveBreakpoint !== 'sm' && responsiveBreakpoint !== 'xs'">
                <template #icon>
                    <n-icon size=" 20">
                        <IconSwitch
                            :class="{ 'rotate-clockwise-animation': sidebarStore.isSidebarExpanded, 'rotate-anticlockwise-animation': !sidebarStore.isSidebarExpanded }">
                        </IconSwitch>
                    </n-icon>
                </template>
            </n-switch>
            <h3 class="text-base">{{ userStore.userInfo && userStore.userInfo.username }}，欢迎使用宠易萌宠物管理系统！</h3>
        </n-space>
        <n-space class="items-center">
            <n-button quaternary circle v-for="(item, index) in Icons" :focusable="false" @click="handleIconClick(item)"
                v-if="responsiveBreakpoint !== 'sm' && responsiveBreakpoint !== 'xs'">
                <template #icon>
                    <!-- 使用 v-if 来判断是否为第二个图标（index为1） -->
                    <template v-if="index === 1">
                        <n-badge :value="10" :max="9">
                            <component :is="item" />
                        </n-badge>
                    </template>
                    <!-- 如果不是第二个图标，或者是其他图标，直接渲染图标组件 -->
                    <template v-else>
                        <component :is="item" />
                    </template>
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
import { NButton, NAvatar } from 'naive-ui'
import { useResponsiveBreakpoint } from '@/composables/useResponsiveBreakpoint';

const router = useRouter()
const message = useMessage()
const notification = useNotification()
const userStore = useUserStore()
const sidebarStore = useSidebarStore();

const iconNames = ['Search', 'Xinxi', 'Cart'];
const Icons = computed(() => iconNames.map(name => `Icon${name}`));
const { responsiveBreakpoint, updateBreakpoint } = useResponsiveBreakpoint();

const handleSelect = async (item) => {
    switch (item) {
        case 'userProfile':
            router.push('/setting');
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
        key: 'userProfile',
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
    let markAsRead = false
    const n = notification.create({
        title: '这是一条消息',
        content: `这是文本信息`,
        meta: '2024年5月7日 09:00',
        action: () =>
            h(
                NButton,
                {
                    text: true,
                    type: 'primary',
                    onClick: () => {
                        markAsRead = true
                        n.destroy()
                    }
                },
                {
                    default: () => '已读'
                }
            )
    })
    // message.warning('消息功能暂未开放');
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
        width: 24px;
        height: 24px;
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