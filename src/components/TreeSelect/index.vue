<template>
    <div>
        <n-grid x-gap="10" :cols="2">
            <n-gi>
                <n-tree-select v-model:value="selectedValue" multiple clearable :options="options"
                    :override-default-node-click-behavior="override" />
            </n-gi>
            <n-gi>
                <n-date-picker v-model:value="selectedDate" :is-date-disabled="isDateDisabled" type="date" />
            </n-gi>
        </n-grid>
    </div>
</template>

<script setup lang="ts">
import { useServicesStore } from '@/stores/modules/services';
import _ from 'lodash';

const props = defineProps({
    petId: Number
});

const serviceStore = useServicesStore()
const selectedValue = ref([])
const selectedDate = ref(null)
const formattedDate = ref('');
const options = ref([])
const override: TreeSelectOverrideNodeClickBehavior = ({ option }) => {
    if (option.children) {
        return 'toggleExpand'
    }
    return 'default'
}

function isBeforeToday(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 重置时间为今天的午夜
    return date < today; // 如果给定的日期小于今天，返回true
}

// 定义一个异步函数来更新选项
const updateOptions = async () => {
    await serviceStore.fetchServicesTypeList();

    options.value = await Promise.all(
        serviceStore.servicesTypeList.map(async (serviceType) => {
            await serviceStore.fetchServicesList(serviceType.serviceTypeId);
            const services = await Promise.all(
                serviceStore.servicesList.map(async (service) => {
                    const pricingList = await serviceStore.getByIdPricingList(service.serviceId);
                    const index = serviceStore.selectedValue.length - 1

                    return {
                        label: service.serviceName,
                        key: service.serviceName,
                        children: pricingList.map((pricing) => ({
                            label: pricing.pricingName,
                            key: {
                                petId: serviceStore.selectedValue[index].petId,
                                serviceTypeId: serviceType.serviceTypeId,
                                serviceId: service.serviceId,
                                pricingId: pricing.pricingId,
                                serviceDate: null
                            },
                        })),
                    };
                })
            );
            return {
                label: serviceType.serviceTypeName,
                key: serviceType.serviceTypeName,
                children: services,
            };
        })
    );
};

onMounted(async () => {
    updateOptions()
})
const petServiceSelections = ref([]);

watch(selectedValue, (newSelectedServices) => {
    // 创建一个新的包含唯一服务项的数组
    const uniqueServices = Array.from(new Set([...petServiceSelections.value, ...newSelectedServices], (a, b) => a.petId === b.petId));

    // 更新本地petServiceSelections的值
    petServiceSelections.value = uniqueServices;

    // 查找全局store中与当前选中服务关联的索引
    const matchingGlobalIndex = serviceStore.selectedValue.findIndex(serviceInStore =>
        uniqueServices.some(uniqueService => uniqueService.petId === serviceInStore.petId)
    );

    // 如果找到了匹配项并且该服务项下有'services'属性
    if (matchingGlobalIndex !== -1 && serviceStore.selectedValue[matchingGlobalIndex].hasOwnProperty('services')) {
        // 更新全局服务列表中的服务项
        serviceStore.selectedValue[matchingGlobalIndex].services = uniqueServices.map(service => ({
            ...service,
            serviceDate: selectedDate ? formatDate(selectedDate.value) : null // 若selectedDate存在则格式化并添加日期
        }));
    }
});
const isDateDisabled = (timestamp) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return timestamp < today.getTime();
};

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

watch(selectedDate, (newValue) => {
    formattedDate.value = formatDate(newValue);

    const matchedRecordIndex = serviceStore.selectedValue.findIndex(record => record.petId === props.petId);

    if (matchedRecordIndex !== -1) {
        const matchedRecord = serviceStore.selectedValue[matchedRecordIndex];

        // 假设 services 是个数组，并且你想为每个服务添加 serviceDate 属性
        const updatedServices = matchedRecord.services.map(service => ({
            ...service,
            serviceDate: formattedDate.value, // 更新日期
        }));

        // 更新 serviceStore.selectedValue 中对应项的 services 属性
        serviceStore.selectedValue[matchedRecordIndex].services = updatedServices;
    }
});
</script>

<style scoped></style>