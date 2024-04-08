<template>
    <div class="p-5 w-full">
        <n-flex class="gap">
            <div class="service-l min-w-60 bg-white rounded-xl p-x5">
                <div class="header-title">服务类型</div>
                <n-menu :options="servicesTypeList" class="bg-gray-100 m-4 rounded-2xl" @update:value="handleMenuSelect"
                    v-model:value="selectedKey" />
            </div>

            <div class="service-r flex-auto bg-white rounded-xl">
                <n-space class="h-full" vertical align="stretch">
                    <n-input-group>
                        <n-flex justify="space-between" class="w-full h-full items-center p-x5">
                            <div class="header-title">服务内容</div>
                            <n-button type="primary" @click="publicStore.openAddModal(addItem)">添加</n-button>
                        </n-flex>
                    </n-input-group>

                    <n-flex class="card-block mb-5" v-if="servicesList.length">
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

                    <n-empty v-else class="p-5 mx-5 bg-gray-100 rounded-xl" description="暂时没有服务列表，请添加"></n-empty>
                </n-space>
            </div>
        </n-flex>
        <Modal>
            <template #header>
                <div>{{ publicStore.modalTitle }}</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="服务名称：" path="productName">
                        <n-input v-model:value="publicStore.itemList.serviceName" placeholder="请输入服务名称" />
                    </n-form-item>
                    <n-form-item v-for="(item, index) in dynamicForm.hobbies" :key="`hobby-${index}`"
                        :label="`价目表${index + 1}`" :path="`hobbies[${index}].hobby`">
                        <n-input v-model:value="item.pricingName" @blur="triggerChange(index)" clearable
                            placeholder="名称：例如小型犬洗澡" />
                        <n-input-number v-model:value="item.originalPrice" @blur="triggerChange(index)" clearable
                            placeholder="原价" :show-button="false" />
                        <n-input-number v-model:value="item.memberPrice" @blur="triggerChange(index)" clearable
                            placeholder="会员价" :show-button="false" />
                        <n-button style="margin-left: 12px" @click="removeItem(index)">
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
                    <n-button @click="publicStore.changeShowModal()">取消</n-button>
                    <n-button type="primary" @click="handleSubmit()">提交</n-button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { useServicesStore } from '@/stores/modules/services';
import { usePublicStore } from '@/stores/public';
import index from '@/views/home/index.vue';

const servicesStore = useServicesStore();
const publicStore = usePublicStore();
const message = useMessage()

const servicesList = computed(() => servicesStore.servicesList);
const changedItems = ref([]);
// 价目表项目
const itemInfo = ref([])
// 服务菜单
const servicesTypeList = computed(() =>
    servicesStore.servicesTypeList.map(serviceType => ({
        label: serviceType.serviceTypeName,
        key: serviceType.serviceTypeId,
    }))
);
const selectedKey = ref();
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

// 编辑
const editService = async (row) => {
    itemInfo.value = await servicesStore.getByIdPricingList(row.serviceId)
    dynamicForm.hobbies = itemInfo.value.map((item) => ({
        pricingId: item.pricingId,
        pricingName: item.pricingName,
        originalPrice: item.originalPrice,
        memberPrice: item.memberPrice
    }))
    publicStore.openEditModal(row)
}

// 校验现有价目名称是否重复
function checkExistingDuplicates(newItem, existingItems) {
    const existingNamesSet = new Set(existingItems.map(item => item.pricingName));
    return existingNamesSet.has(newItem.pricingName);
}// 校验新添加的价目名称是否重复
function checkNewDuplicates(newItems) {
    const names = newItems.map(item => item.pricingName);
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    return duplicates.length > 0 ? duplicates : null;
}
// 每当输入框失焦时触发的方法
function triggerChange(index) {
    const pricingId = itemInfo.value[index].pricingId;
    // 在dynamicForm.hobbies中查找与该pricingId匹配的条目
    const changedItem = dynamicForm.hobbies.find(item => item.pricingId === pricingId);

    // 检查该条目是否已经在changedItems中
    const existingIndex = changedItems.value.findIndex(item => item.pricingId === pricingId);

    // 如果该条目不存在于changedItems中，则添加它
    if (existingIndex === -1 && changedItem) {
        changedItems.value.push(changedItem);
    } else if (changedItem) {
        // 如果该条目已存在于changedItems中，更新该条目
        changedItems.value[existingIndex] = changedItem;
    }
}


const handleSubmit = async () => {
    try {
        // 获取新添加的价目项
        const newPricingItems = dynamicForm.hobbies.filter(item => !item.pricingId);
        // 校验现有价目名称重复
        for (const item of newPricingItems) {
            if (checkExistingDuplicates(item, itemInfo.value)) {
                message.error(`新增的价目名称重复: ${item.pricingName}`);
                // 显示错误消息等
                return;
            }
        }
        // 校验新添加的价目名称重复
        const newDuplicates = checkNewDuplicates(newPricingItems);
        if (newDuplicates) {
            message.error('新增的价目名称重复:', newDuplicates.join(', '));
            // 显示错误消息等
            return;
        }
        // 没有重复名称，准备提交的数据
        const PricingData = newPricingItems.map(hobby => ({
            ...hobby,
            servicesId: publicStore.itemList.serviceId,
            pricingId: null
        }));

        if (publicStore.isEditMode) {
            // 检查 dynamicForm.hobbies 是否有新增或改变的项
            const isNewOrChanged = dynamicForm.hobbies.some(hobby => !hobby.pricingId || hobby.isChanged);
            if (isNewOrChanged) {
                // 如果有新的或改变的价目项，调用添加价目的方法
                await servicesStore.addPricingItem(PricingData);
            } else {
                // 如果没有变化，调用更新信息的方法
                await servicesStore.updatePricingItem(changedItems.value);
            }
            message.success('保存成功')
        } else {
            const ServiceItem = {
                serviceName: publicStore.itemList.serviceName,
                serviceTypeId: selectedKey.value
            };
            await servicesStore.submitNewServiceAndPricing(ServiceItem, dynamicForm.hobbies)
            message.success('添加成功')
        }
        publicStore.changeShowModal()
    } catch (error) {
        console.error('提交失败:', error);
    }
};

onMounted(async () => {
    await loadData();
});

// 价目表开关
const removeItem = (index: number) => {
    // dynamicForm.hobbies.splice(index, 1)
    console.log(itemInfo.value[index].pricingId);
}
const addItem = () => {
    dynamicForm.hobbies.push({ pricingName: '', servicesId: publicStore.itemList.serviceId, originalPrice: null, memberPrice: null });
}

// 删除
const deleteService = async (id) => {
    try {
        await servicesStore.deleteService(id);
        // 提示成功消息
        message.success('删除成功');
    } catch (error) {
        message.error('删除失败');
    }
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