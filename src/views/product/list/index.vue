<template>
    <div>
        <n-data-table class="p-6" :columns="columns" :data="data" :pagination="paginationReactive" :row-key="rowKey"
            @update:checked-row-keys="handleCheck" />
    </div>
</template>

<script setup lang="ts">
import { NSwitch, type DataTableColumns, type DataTableRowKey, NButton } from 'naive-ui'
import { Fragment } from 'vue';

type RowData = {
    id: number;
    info: string;
    name: string;
    statu: boolean;
    quantity: number;
    price: number;
    stock: number;
};

function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys
}

const checkedRowKeysRef = ref<DataTableRowKey[]>([])

const createColumns = (): DataTableColumns<RowData> => [
    {
        // 禁用
        type: 'selection',
        // disabled(row: RowData) {
        //     return row.name === 'Edward King 3'
        // }
    },
    {
        title: '商品编号',
        key: 'id',
        align: 'center',
    },
    {
        title: '商品信息',
        key: 'info',
        align: 'center',
    },
    {
        title: '商品名称',
        key: 'name',
        align: 'center',
    },
    {
        title: '状态',
        key: 'statu',
        render(row) {
            return h(
                NSwitch,
                {
                    value: row.statu,
                    'on-update:value': (newValue: any) => {
                        console.log(`Switch for ${row.name} is now ${newValue ? 'ON' : 'OFF'}.`);
                        // 注意：这里需要实现状态更新的逻辑，确保你的 data 是响应式的
                        // 可能需要一个方法来更新 data 中的 statu 值
                    },
                    style: {
                        marginRight: '6px',
                    },
                }
            );
        },
        align: 'center',
    },
    {
        title: '数量',
        key: 'quantity',
        sorter: {
            compare: (a, b) => a.quantity - b.quantity,
            multiple: 2
        },
        align: 'center',
    },
    {
        title: '价格',
        key: 'price',
        render(row) {
            // 使用 toFixed 方法将数字格式化为字符串，并保留两位小数
            return `¥ ${row.price.toFixed(2)}`;
        },
        sorter: {
            compare: (a, b) => a.price - b.price,
            multiple: 3
        },
        align: 'center',
    },
    {
        title: '库存',
        key: 'stock',
        sorter: {
            compare: (a, b) => a.stock - b.stock,
            multiple: 1
        },
        align: 'center',
    },
    {
        title: '操作',
        key: 'operate',
        render(row) {
            return h(Fragment, null, [
                h(NButton, {
                    size: 'small',
                    style: 'margin-right: 8px;', // 为按钮之间添加一些间距
                    onClick: () => EditProduct(row)
                },
                    { default: () => '编辑' }
                ),
                h(NButton, {
                    size: 'small',
                    onClick: () => DeleteProduct(row)
                },
                    { default: () => '删除' }
                )
            ]);
        },
        align: 'center',
    }
]

const createData = (): RowData[] => Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    info: `London, Park Lane no. ${index + 1}`,
    name: `London, Park Lane no. ${index + 1}`,
    statu: true,
    quantity: getRandomInt(1, 100),
    // 使用 toFixed 方法格式化数字为字符串，并保留两位小数
    price: getRandomInt(1, 100),
    stock: getRandomInt(1, 100),
}))


const data = createData()
const columns = createColumns()
// 分页设置
const paginationReactive = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    // 改变分页
    onChange: (page: number) => {
        paginationReactive.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
    }
})

// 唯一标识
const rowKey = (row: RowData): DataTableRowKey => row.id;
const message = useMessage();
const EditProduct = (rowData: { id?: number; info?: string; name: any; statu?: boolean; quantity?: number; price?: number; stock?: number; }) => {
    message.info('send mail to ' + rowData.name)
}
const DeleteProduct = (rowData: RowData) => {
    // 实现另一个动作的逻辑
    console.log('Performing another action on:', rowData.name);
};

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 不包含最大值，包含最小值
}


</script>

<style scoped lang="scss">
:deep(.n-data-table .n-data-table__pagination) {
    padding-right: 2.5rem !important;
}
</style>