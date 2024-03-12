<template>
    <div class="p-5 w-full">
        <n-flex class="gap">
            <div class="service-l min-w-60 bg-white rounded-xl p-x5">
                <div class="header-title">服务类型</div>
                <n-menu :options="servicesTypeList" class="bg-gray-100 m-4 rounded-2xl" @update:value="handleMenuSelect"
                    v-model:value="selectedKey" />
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
                            <n-card hoverable class="box-border mb-5 rounded-2xl" v-for="item in servicesList">
                                <n-flex justify="space-between" class="items-center w-full">
                                    <div>
                                        {{ item.serviceName }}
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
import { useServicesStore } from '@/stores/modules/services';

const servicesStore = useServicesStore();

const servicesList = computed(() => servicesStore.servicesList);
const servicesTypeList = computed(() =>
    servicesStore.servicesTypeList.map(serviceType => ({
        label: serviceType.serviceTypeName,
        key: serviceType.serviceTypeId,
    }))
);
const selectedKey = ref();

// 加载初始数据的函数
const loadData = async () => {
    if (!servicesStore.selectedServiceTypeId && servicesTypeList.value.length > 0) {
        // Initialize selected key if not set
        selectedKey.value = servicesTypeList.value[0].key;
    }
    await servicesStore.fetchServicesTypeList();

    selectedKey.value = servicesStore.selectedServiceTypeId
    
    if (selectedKey.value) {
        await servicesStore.fetchServicesList(selectedKey.value);
    }
};

// 处理菜单选择
const handleMenuSelect = async (key) => {
    // 根据选择的服务类型加载对应的服务列表
    selectedKey.value = key; // Update the selected key
    await servicesStore.fetchServicesList(key);
};

onMounted(async () => {
    await loadData();
});

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