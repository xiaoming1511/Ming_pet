<template>
    <div class="w-screen relative h-screen">
        <n-layout has-sider class="flex-c">
            <caidan></caidan>
            <n-flex class="w-screen">
                <navigator></navigator>
                <n-flex class="box px-6" justify="space-around" size="large">
                    <n-card class="rounded-xl" size="huge">
                        <div class="panle">
                            <div class="panle_title text-left pb-3">
                                快捷入口
                            </div>
                            <div class="panle-content">
                                <div class="chart">
                                    <div class="quick-entry p-4">
                                        <n-grid :x-gap="12" :y-gap="8" :cols="4">
                                            <n-grid-item v-for="item in 8" class="flex flex-col items-center">
                                                <n-icon size="40">
                                                    <PetStore></PetStore>
                                                </n-icon>
                                                <span>{{ item }} 商店入口</span>
                                            </n-grid-item>
                                        </n-grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </n-card>
                    <n-card class="rounded-xl" size="huge">
                        <div>
                            2
                        </div>
                    </n-card>
                    <n-card class="rounded-xl" size="huge">
                        <div>
                            3
                        </div>
                    </n-card>
                </n-flex>
            </n-flex>
        </n-layout>
    </div>
</template>

<script setup lang="ts">
import PetStore from "@/assets/icons/pet-store.svg?component";
</script>

<style scoped>
@import '@/style/login.css';

:deep(.n-flex) {
    display: block !important;
}

:deep(.box) {
    display: flex !important;
    flex-wrap: nowrap !important;
}
</style>