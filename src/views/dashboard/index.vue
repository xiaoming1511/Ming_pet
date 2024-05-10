<template>
    <div>
        <n-flex class="box p5" justify="space-around" size="large">
            <n-card class="rounded-xl panle <xl:hidden" size="huge">
                <div>
                    <div class="panle_title text-left pb-3">
                        快捷入口
                    </div>
                    <div class="panle-content">
                        <div class="chart">
                            <div class="quick-entry">
                                <n-grid :x-gap="12" :y-gap="8" :cols="3">
                                    <n-grid-item v-for="item in panle" class="flex flex-col items-center justify-evenly">
                                        <n-button text style="font-size: 60px" :focusable="false">
                                            <!-- 数组图标 -->
                                            <component :is="item.icon" />
                                        </n-button>
                                        <div class="text-sm w-full mt-2">
                                            <n-button text :focusable="false">
                                                {{ item.label }}
                                            </n-button>
                                        </div>
                                    </n-grid-item>
                                </n-grid>
                            </div>
                        </div>
                    </div>
                </div>
            </n-card>
            <n-card class="rounded-xl" size="huge">
                <div>
                    <test></test>
                </div>
            </n-card>
        </n-flex>
    </div>
</template>

<script setup lang="ts">
import Dianyuan from "@/assets/icons/dianyuan.svg?component";
import Huiyuan from "@/assets/icons/huiyuan.svg?component";
import Ruku from "@/assets/icons/ruku.svg?component";
import { NIcon } from 'naive-ui'

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const panle = [
    {
        label: '商品入库',
        key: 'Add-Product',
        icon: renderIcon(Ruku)
    },
    {
        label: '添加会员',
        key: 'Add-Member',
        icon: renderIcon(Huiyuan)
    },
    {
        label: '店员管理',
        key: 'Employee-Management',
        icon: renderIcon(Dianyuan)
    }
]
</script>

<style scoped lang="scss">

</style>