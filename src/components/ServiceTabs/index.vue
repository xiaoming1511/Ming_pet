<template>
    <div>
        <Table :columns="columns" :data="data"></Table>
        <n-flex justify="end">
            <n-select class="w-64" @update:value="handleUpdateValue" filterable :size="large" :options="petList"
                :render-label="renderLabel" :render-tag="renderSingleSelectTag" placeholder="请选择宠物" />
        </n-flex>
    </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { usePetsStore } from '@/stores/modules/pets';
import { useServicesStore } from '@/stores/modules/services';
import { NAvatar, NButton, NText } from 'naive-ui';
import TreeSelect from '@/components/TreeSelect/index.vue'

const data = ref([])
const message = useMessage()
const petStore = usePetsStore()
const serviceStore = useServicesStore()
const petList = computed(() => {
    return petStore.pets.map(pet => ({
        label: pet.petName,
        value: pet.id,
        breed: pet.breed
    }))
})

const columns = ref([
    {
        type: 'selection',
    },
    {
        title: '宠物',
        key: 'petName'
    },
    {
        title: '服务',
        key: 'service',
        render: (row) => {
            return h(TreeSelect, {
                petId: row.id
            });
        },
    },
    {
        title: '操作',
        key: 'actions',
        render(row) {
            return [
                h(
                    NButton,
                    {
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => submitService(row)
                    },
                    { default: () => 'Submit' }
                ),
                h(NButton, {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => showDeleteConfirm(row)
                }, { default: () => 'Delete' })
            ]
        },
    }
]);
const renderLabel: SelectRenderLabel = (option) => {
    return h(
        'div',
        {
            style: {
                display: 'flex',
                alignItems: 'center'
            }
        },
        [
            h(NAvatar, {
                src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
                round: true,
                size: 'small'
            }),
            h(
                'div',
                {
                    style: {
                        marginLeft: '12px',
                        padding: '4px 0'
                    }
                },
                [
                    h('div', null, [option.label as string]),
                    h(
                        NText,
                        { depth: 3, tag: 'div' },
                        {
                            default: () => option.breed
                        }
                    )
                ]
            )
        ]
    )
}
const renderSingleSelectTag: SelectRenderTag = ({ option }) => {
    return h(
        'div',
        {
            style: {
                display: 'flex',
                alignItems: 'center'
            }
        },
        [
            h(NAvatar, {
                src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
                round: true,
                size: 24,
                style: {
                    marginRight: '12px'
                }
            }),
            option.label as string
        ]
    )
}
const handleUpdateValue = (itemId) => {
    const selectedPet = petStore.pets.find(pet => pet.id === itemId);

    if (selectedPet) {
        // 检查宠物是否已经被添加到data.value中
        const existingPetIndex = data.value.findIndex(p => p.id === selectedPet.id);
        if (existingPetIndex !== -1) {
            // 如果宠物已存在，更新它的信息
            data.value[existingPetIndex] = selectedPet;
        } else {
            // 如果宠物不存在，添加到data.value中
            data.value.push(selectedPet);
        }

        // 检查宠物是否已经存在于serviceStore.selectedValue中
        const existingPetServiceIndex = serviceStore.selectedValue.findIndex(s => s.petId === selectedPet.id);
        if (existingPetServiceIndex === -1) {
            // 如果不存在，添加宠物ID和一个空的服务数组
            serviceStore.selectedValue.push({ petId: selectedPet.id, services: [] });
        }
    } else {
        console.error('Selected pet not found in petStore:', itemId);
    }
}

const submitService = async (row) => {
    let request = null;
    let matchedServices = null;
    for (const item of serviceStore.selectedValue) {
        if (item.petId === row.id) {
            matchedServices = item.services;
            break;
        }
    }

    if (matchedServices) {
        // 遍历匹配到的服务数组并逐个调用 addServices 方法
        for (const service of matchedServices) {
            request = await serviceStore.addPetServices(service);
        }
        if (request.code == 200) {
            message.success("保存成功")
        }
    } else {
        console.log('No services found with matching petId.');
    }
}
onMounted(async () => {
    await petStore.fetchPets()
})
</script>

<style scoped></style>