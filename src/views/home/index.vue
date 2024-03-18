<template>
    <div class="w-screen h-screen box-border table-container">
        <n-message-provider>
            <n-modal-provider>
                <n-dialog-provider>
                    <transition name="slide">
                        <div class="w-full h-full">
                            <Menu class="relative fixed-menu"></Menu>
                            <Navigator class="navigation-bar box-border"
                                :style="{ paddingLeft: sidebarStore.isSidebarExpanded ? `104px` : '250px' }">
                            </Navigator>
                            <n-flex class="hmain"
                                :style="{ marginLeft: sidebarStore.isSidebarExpanded ? `64px` : '210px' }">
                                <router-view class="bg-gray-100 pt-5"></router-view>
                            </n-flex>
                        </div>
                    </transition>
                </n-dialog-provider>
            </n-modal-provider>
        </n-message-provider>
    </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/modules/sidebar';

const sidebarStore = useSidebarStore();

</script>

<style scoped>
@import '@/style/login.css';

.hmain {
    display: block !important;
    transition: margin-left 0.4s ease;
    padding-top: 64px;
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

.navigation-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: padding-left 0.4s ease;
}
/* 解决滚动条超出 */
.table-container {
  overflow-y: overlay;
  overflow-x: auto;
}
</style>