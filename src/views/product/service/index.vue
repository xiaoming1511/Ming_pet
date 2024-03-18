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
                            <n-button type="primary" @click="addService">添加</n-button>
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
                                        <n-button @click="editService(item)">编辑</n-button>
                                        <n-button type="error" @click="deleteService(item.serviceId)">删除</n-button>
                                    </div>
                                </n-flex>
                            </n-card>
                        </div>
                    </n-flex>
                </n-space>
            </div>
        </n-flex>
        <AddModal>
            <template #header>
                <div>添加服务信息</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="服务名称：" path="productName">
                        <n-input v-model:value="serviceName" placeholder="请输入服务名称" />
                    </n-form-item>
                    <n-form-item v-for="(item, index) in dynamicForm.hobbies" :key="`hobby-${index}`"
                        :label="`价目表${index + 1}`" :path="`hobbies[${index}].hobby`">
                        <n-input v-model:value="item.name" clearable placeholder="名称：例如小型犬洗澡" />
                        <n-input v-model:value="item.originalPrice" clearable placeholder="原价" />
                        <n-input v-model:value="item.memberPrice" clearable placeholder="会员价" />
                        <n-button style="margin-left: 12px" @click="addremoveItem(index)">
                            删除
                        </n-button>
                    </n-form-item>
                </div>
                <n-button attr-type="button" @click="addItem">
                    增加
                </n-button>
            </template>
            <template #action>
                <div>
                    <n-button @click="addhandleClose">取消</n-button>
                    <n-button type="primary" @click="addhandleSubmit">提交</n-button>
                </div>
            </template>
        </AddModal>
        <EditModal>
            <template #header>
                <div>编辑{{ staticServiceName }}信息</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="服务名称：" path="productName">
                        <n-input v-model:value="itemInfo.serviceName" placeholder="请输入服务名称" />
                    </n-form-item>
                    <n-form-item v-for="(item, index) in pricingItems" :key="`pricing-${index}`"
                        :label="`价目表${index + 1}`">
                        <n-input v-model:value="item.pricingName" clearable placeholder="名称：例如小型犬洗澡" />
                        <n-input v-model:value="item.originalPrice" clearable placeholder="原价" />
                        <n-input v-model:value="item.memberPrice" clearable placeholder="会员价" />
                        <n-button style="margin-left: 12px" @click="removePricingItem(index)">
                            删除
                        </n-button>
                    </n-form-item>
                </div>
                <n-button attr-type="button" @click="addPricingItem">
                    增加
                </n-button>
            </template>
            <template #action>
                <div>
                    <n-button @click="editHandleClose">取消</n-button>
                    <n-button type="primary" @click="editHandleSubmit">提交</n-button>
                </div>
            </template>
        </EditModal>
    </div>
</template>

<script setup lang="ts">
import { useServicesStore } from '@/stores/modules/services';
import { usePublicStore } from '@/stores/public';
import { styleType } from 'element-plus/es/components/table-v2/src/common';

const servicesStore = useServicesStore();
const publicStore = usePublicStore();
const message = useMessage()

const servicesList = computed(() => servicesStore.servicesList);
const itemInfo = ref([])
const servicesTypeList = computed(() =>
    servicesStore.servicesTypeList.map(serviceType => ({
        label: serviceType.serviceTypeName,
        key: serviceType.serviceTypeId,
    }))
);
const staticServiceName = ref('')
const serviceName = ref('')
const selectedKey = ref();
const pricingItems = ref(servicesStore.pricingList)

const dynamicForm = reactive({
    name: '',
    hobbies: []
});
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
    selectedKey.value = key;
    await servicesStore.fetchServicesList(key);
};

const addremoveItem = (index: number) => {
    dynamicForm.hobbies.splice(index, 1)
}
const addItem = () => {
    dynamicForm.hobbies.push({ name: '', originalPrice: '', memberPrice: '' });
}

const addService = () => {
    publicStore.addShowModal = true
}

const addhandleClose = () => {
    publicStore.addShowModal = false;
}

const addhandleSubmit = async () => {
    const newService = {
        serviceName: serviceName.value,
        serviceTypeId: selectedKey.value,
    };
    console.log(newService);

    try {
        // 假设有一个 API 调用来保存产品信息
        await servicesStore.addServices(newService);

        // 提示成功消息
        message.success('产品信息已保存');
    } catch (error) {
        // 提示错误消息
        message.error('保存产品信息失败');
    }
};

const deleteService = async (id) => {
    try {
        await servicesStore.deleteService(id);
        // 提示成功消息
        message.success('删除成功');
    } catch (error) {
        message.error('删除失败');
    }
}
onMounted(async () => {
    await loadData();
});

const editService = async (row) => {
    publicStore.editShowModal = true
    staticServiceName.value = row.serviceName;
    itemInfo.value = row
    pricingItems.value = await servicesStore.getByIdPricingList(row.serviceId)
}
const removePricingItem = (index) => {
    pricingItems.value.splice(index, 1);
}
const addPricingItem = () => {
    pricingItems.value.push({
        pricingName: '',
        originalPrice: null,
        memberPrice: null,
        servicesId: itemInfo.value.serviceId
    });
}
const editHandleClose = () => {
    publicStore.editShowModal = false
}
const editHandleSubmit = async () => {
    const updatedPricing = pricingItems.value.map(item => ({
        ...item,
        servicesId: itemInfo.value.serviceId,
        originalPrice: Number(item.originalPrice), // 转换为数字
        memberPrice: Number(item.memberPrice) // 转换为数字
    }));

    const serviceData = {
        pricing: updatedPricing,
    };

    console.log(serviceData);

    await servicesStore.addPricingItem(serviceData)
}
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

:deep(.n-form-item .n-form-item-blank) {
    gap: .5rem !important;
}
</style>