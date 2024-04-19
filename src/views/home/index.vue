<template>
    <div class="w-screen h-screen box-border table-container">
        <transition name="slide">
            <div class="w-full h-full">
                <Menu class="relative fixed-menu"></Menu>
                <n-flex class="hmain w-full h-full" :style="mainStyle">
                    <Navigator class="pos-absolute top-0 left-0 navigator" :style="navigatorStyle" />
                    <div class="router-view" :style="viewStyle">
                        <router-view class="bg-gray-100"></router-view>
                    </div>
                </n-flex>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/modules/sidebar';

const sidebarStore = useSidebarStore();

const marginLeft = computed(() => sidebarStore.isSidebarExpanded ? '64px' : '210px');
const mainStyle = computed(() => ({
    marginLeft: marginLeft.value,
}));

const navigatorStyle = computed(() => ({
    marginLeft: marginLeft.value,
    width: `calc(100vw - ${marginLeft.value})`,
}));

const viewStyle = computed(() => ({
    marginLeft: marginLeft.value,
    width: `calc(100vw - ${marginLeft.value})`,
    top: '64px',
    height: 'calc(100vh - 64px)',
    overflow: 'auto'
}));
</script>

<style scoped>
.hmain {
    display: block !important;
    transition: all 0.4s ease;
}

.navigator {
    transition: all 0.4s ease;
    z-index: 1000;
}

.router-view {
    position: absolute;
    right: 0;
    top: 64px;
    width: 100%;
    height: calc(100vh - 64px);
    /* 100vh是视口的全部高度，64px是Navigator的高度 */
    overflow: auto;
    /* 如果内容超出高度，允许滚动 */
    transition: all 0.4s ease;
}

:deep(.n-card__content) {
    padding: 1.25rem !important;
}

:deep(.box) {
    display: flex !important;
    flex-wrap: nowrap !important;
}

.fixed-menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1001;
}

/* 解决滚动条超出 */
.table-container {
    overflow-y: overlay;
    overflow-x: auto;
}
</style>