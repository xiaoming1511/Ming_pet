<template>
    <div class="p-5">
        <n-flex class="bg-white p-5">
            <h3>活体提醒</h3>
            <n-grid x-gap="12" :cols="2" class="p-5">
                <n-gi>
                    <calendar class="shadow-lg p-3 rounded-2xl"></calendar>
                </n-gi>
                <n-gi class="shadow-xl p-3 rounded-2xl">
                    <div class="text-left text-xl font-bold border-b pb-4 mb-3">
                        <h2>提醒详情（<span>{{ petServiceListLength }}</span>）
                        </h2>
                    </div>
                    <n-flex class="overflow-hidden overflow-y-auto max-h-md gap">
                        <n-list hoverable clickable class="border-b w-full rounded-2xl" v-for="item in petServiceList">
                            <n-list-item class="text-left">
                                <n-thing content-style="margin-top: 0px;display: flex;gap: .5rem;">
                                    <template #description>
                                        <n-space class="h-20 flex items-center">
                                            <n-avatar round size="large"
                                                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                                            <n-flex vertical>
                                                <div class="flex items-center gap-4">
                                                    <span class="text-base">{{ item.petName }}</span>
                                                    <n-icon size="17">
                                                        <iconAdd></iconAdd>
                                                    </n-icon>
                                                    <n-tag round :bordered="false">
                                                        品种
                                                        <template #icon>
                                                            <n-icon>
                                                                <iconAdd></iconAdd>
                                                            </n-icon>
                                                        </template>
                                                    </n-tag>
                                                </div>
                                                <div>
                                                    <span class="text-pink-900">
                                                        距离生日还有{{ item.serviceDate }}天
                                                    </span>
                                                </div>
                                            </n-flex>
                                        </n-space>
                                    </template>
                                    <n-tag type="success">
                                        {{ item.serviceTypeName }}
                                    </n-tag>
                                    <n-tag type="success">
                                        {{ item.serviceName }}
                                    </n-tag>
                                    <n-tag type="success">
                                        {{ item.pricingName }}
                                    </n-tag>
                                </n-thing>
                            </n-list-item>
                        </n-list>
                    </n-flex>
                </n-gi>
            </n-grid>
        </n-flex>
    </div>
</template>

<script setup lang="ts">
import { usePetsStore } from '@/stores/modules/pets';

const petStore = usePetsStore();
const petServiceList = ref([])
const petServiceListLength = ref(0);


onMounted(async () => {
    await petStore.fetchpetsService()
    petServiceList.value = petStore.petsService
    petServiceListLength.value = petServiceList.value.length
})
</script>

<style scoped>
h3 {
    font-weight: bold;
    font-size: 1.17em;
}

:deep(.n-grid) {
    gap: 2rem !important;
}

:deep(.n-list-item) {
    padding: 12px !important;
}

.gap {
    gap: 0.75rem !important;
}
</style>