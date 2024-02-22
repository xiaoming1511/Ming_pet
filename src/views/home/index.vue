<template>
    <div class="w-screen relative h-screen">
        <transition name="slide">
            <n-layout has-sider class="flex-c">
                <Menu class="relative fixed-menu"></Menu>
                <n-flex class="w-screen">
                    <navigator></navigator>
                    <router-view></router-view>
                </n-flex>
            </n-layout>
        </transition>
    </div>
</template>

<script setup lang="ts">
// 假设侧边栏初始为展开状态

</script>

<style scoped>
@import '@/style/login.css';

:deep(.n-flex) {
    display: block !important;
    margin-left: 210px;
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
    z-index: 1000;
}
</style>