<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-input placeholder="搜索" class="max-w-48">
                    <template #suffix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
            </template>
            <template #search-controls>
                <n-date-picker class="max-w-xs" placeholder="请选择日期范围" clearable type="daterange"
                    :is-date-disabled="disablePreviousDate" />
                <n-select class="max-w-48" v-model:value="selectedValue" filterable clearable placeholder="选择分类"
                    :options="options" />
            </template>
            <template #search-actions>
                <n-button class="mr-4" text quaternary :focusable="false" @click="addPet(fromDate)">
                    <template #icon>
                        <n-icon>
                            <IconAdd></IconAdd>
                        </n-icon>
                    </template>
                    <span>添加</span>
                </n-button>
                <n-button round color="#fdda11" text-color="#000" :focusable="false">
                    <template #icon>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                    搜索
                </n-button>
            </template>
        </SearchBar>
        <Table :columns="columns" :data="PetsList" :row-key="rowKeyProp"></Table>
        <Modal>
            <template #header>
                <div>{{ publicStore.modalTitle }}</div>
            </template>
            <template #form-content>
                <div>
                    <n-form-item label="宠物名称：" path="petName">
                        <n-input v-model:value="publicStore.itemList.petName" placeholder="请输入宠物名称" />
                    </n-form-item>
                    <n-form-item label="种类：" path="breed">
                        <n-select v-model:value="publicStore.itemList.breed" :options="breed" placeholder="请选择状态" />
                    </n-form-item>
                    <n-form-item label="性别：" path="gender">
                        <n-radio-group v-model:value="publicStore.itemList.gender" name="radiobuttongroup1">
                            <n-radio v-for="song in songs" :key="song.value" :value="song.value">
                                {{ song.label }}
                            </n-radio>
                        </n-radio-group>
                    </n-form-item>
                    <n-form-item label="年龄：" path="age">
                        <n-input v-model:value="publicStore.itemList.age" placeholder="请输入年龄" />
                    </n-form-item>
                    <n-form-item label="生日：" path="timestamp">
                        <n-date-picker v-model:value="timestamp" type="date" />
                    </n-form-item>
                    <n-form-item label="体重：" path="weight">
                        <n-input v-model:value="publicStore.itemList.weight" placeholder="请输入体重" />
                    </n-form-item>
                    <n-form-item label="主人：" path="ownerId">
                        <n-select v-model:value="publicStore.itemList.ownerId" :options="OwnerList"
                            placeholder="请选择主人" />
                    </n-form-item>
                    <n-form-item label="状态：" path="weight">
                        <n-select v-model:value="publicStore.itemList.saleStatus" :options="saleStatus"
                            placeholder="请选择状态" />
                    </n-form-item>
                    <n-form-item label="健康：" path="healthStatus">
                        <n-select v-model:value="publicStore.itemList.healthStatus" :options="healthStatus"
                            placeholder="请选择分类" />
                    </n-form-item>
                    <n-form-item label="价格：" path="produpricectName">
                        <n-input v-model:value="publicStore.itemList.price" placeholder="请输入价格" />
                    </n-form-item>
                </div>
            </template>
            <template #action>
                <div>
                    <n-button @click="publicStore.changeShowModal()">取消</n-button>
                    <n-button type="primary" @click="handleSubmit">提交</n-button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { usePetsStore } from '@/stores/modules/pets';
import { NButton, useModal } from 'naive-ui';
import { usePublicStore } from '@/stores/public';
import { usecustomersStore } from '@/stores/modules/customers';

const publicStore = usePublicStore();
const PetsStore = usePetsStore();
const customersStore = usecustomersStore();
const PetsList = ref([])
const itemList = ref([])
const rowKeyProp = 'id'
const timestamp = ref()
const songs = ref([
    {
        value: "GG",
        label: "弟弟"
    },
    {
        value: 'MM',
        label: '妹妹'
    },
])
const breed = ref([
    {
        value: "dog",
        label: "dog"
    },
    {
        value: 'cat',
        label: 'cat'
    },
])
const healthStatus = ref([
    {
        label: '健康',
        value: '健康'
    },
    {
        label: '良好',
        value: '良好'
    }
])
const saleStatus = ref([
    {
        label: '已出售',
        value: '已出售'
    },
    {
        label: '未出售',
        value: '未出售'
    }
])
const disablePreviousDate = (ts: number) => {
    return ts > Date.now()
}
const selectedValue = ref(null)
const showDialog = useDialog();
const modal = useModal();
const fromDate = ref({
    age: null,
    birthday: '',
    breed: null,
    gender: '',
    healthStatus: null,
    petName: '',
    ownerId: null,
    price: null,
    saleStatus: null,
    weight: null
})
const OwnerList = ref([])

const options = [
    {
        label: 'Drive My Car',
        value: 'jk'
    },
    {
        label: 'Norwegian Wood',
        value: 'lh'
    },
]
const columns = ref([
    {
        title: 'Id',
        key: 'id'
    },
    {
        title: '宠物名称',
        key: 'petName'
    },
    {
        title: '种类',
        key: 'breed'
    },
    {
        title: '性别',
        key: 'gender'
    },
    {
        title: '年龄',
        key: 'age'
    },
    {
        title: '体重',
        key: 'weight'
    },
    {
        title: '健康',
        key: 'healthStatus'
    },
    {
        title: '状态',
        key: 'saleStatus'
    },
    {
        title: '价格',
        key: 'price'
    },
    {
        title: '创建时间',
        key: 'createdAt'
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
                        onClick: () => handleEdit(row)
                    },
                    { default: () => 'Edit' }
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

const getAllPets = async () => {
    await PetsStore.fetchPets()
    PetsList.value = PetsStore.pets
}

onMounted(async () => {
    getAllPets()
    getOwnerList()
})

function showDeleteConfirm(row) {
    showDialog.warning({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this product?',
        positiveText: 'Confirm',
        negativeText: 'Cancel',
        onPositiveClick: () => handleDelete(row.id)
    });
}

function handleEdit(row) {
    publicStore.openEditModal(row)
    timestamp.value = changeTime(row.birthday);
}

async function handleDelete(Id) {
    console.log('Confirmed delete', Id);
}

function changeStatus(row, newVal) {
    console.log(`Product ID: ${row} New Status: ${newVal}`);
}
const changeTime = (date) => {
    return Date.parse(date);
}
const addPet = (fromDate) => {
    timestamp.value = null
    publicStore.openAddModal(fromDate)
}
const handleSubmit = async () => {
    const { id, createdAt, deleted, isDeleted, updatedAt, ...item } = publicStore.itemList;
    fromDate.value = item
    if (publicStore.isEditMode) {
        // console.log(id, fromDate.value);
        await PetsStore.updatePet(id, fromDate.value)
    } else {
        // console.log(publicStore.itemList);
        fromDate.value.birthday = changeDate(timestamp.value)
        await PetsStore.addPet(fromDate.value)
    }
    getAllPets()
    publicStore.changeShowModal()
}
const changeDate = (nowDate) => {
    const date: Date = new Date(nowDate);

    const year: string = date.getUTCFullYear().toString();
    const month: string = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day: string = (date.getUTCDate() + 1).toString().padStart(2, '0');
    const formattedDate: string = `${year}-${month}-${day}`;

    return formattedDate
}

const getOwnerList = async () => {
    await customersStore.fetchcustomers()
    OwnerList.value = customersStore.customers.map(item => ({
        label: item.customerName,
        value: item.customerId
    }))
}
</script>

<style scoped></style>