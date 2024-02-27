<template>
    <div class="p-5 w-full">
        <n-flex class="gap">
            <div class="service-l min-w-60 bg-white rounded-xl p-x5">
                <div class="header-title">服务类型</div>
                <n-menu :options="menuOptions" class="bg-gray-100 m-4 rounded-2xl" />
            </div>

            <div class="service-r flex-auto bg-white rounded-xl">
                <n-space vertical align="stretch">
                    <n-input-group>
                        <n-flex justify="space-between" class="w-full h-full items-center p-x5">
                            <div class="header-title">服务内容</div>
                            <n-button type="primary" class="">添加</n-button>
                        </n-flex>
                    </n-input-group>

                    <n-flex class="card-block ">
                        <div
                            class="flex items-center flex-col bg-gray-100 rounded-2xl p-5 mx-5 min-w-sm max-h-lg overflow-hidden overflow-y-auto">
                            <n-card hoverable class="box-border mb-5 rounded-2xl" v-for="item in 6">
                                <n-flex justify="space-between" class="items-center w-full">
                                    <div>
                                        犬类洗剪吹{{ item }}
                                    </div>
                                    <div class="flex gap-4">
                                        <n-button>Oops!</n-button>
                                        <n-button>Oops!</n-button>
                                    </div>
                                </n-flex>
                            </n-card>
                        </div>
                    </n-flex>
                </n-space>
            </div>
        </n-flex>
    </div>
</template>

<script setup lang="ts">

const menuOptions = [
    {
        label: '洗澡',
        key: 'washing'
    },
    {
        label: '美容',
        key: 'beauty'
    },
    {
        label: '寄养',
        key: 'foster-care'
    },
    {
        label: '其他',
        key: 'other'
    },

];

</script>

<style scoped>
.header-title {
    font-weight: 700;
    font-size: 16px;
    height: 50px;
    display: flex;
    align-items: center;
}

.card-block {
    display: block !important;
}

.gap {
    gap: 1.5rem !important;
}
</style>