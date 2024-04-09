<template>
    <div class="flex w-full items-center h-16 justify-between px-10 bg-white">
        <n-space>
            <n-switch v-model:value="sidebarStore.isSidebarExpanded">
                <template #icon>
                    <n-icon size="10">
                        <IconAdd></IconAdd>
                    </n-icon>
                </template>
            </n-switch>
            <h3 class="text-base">aaa,欢迎使用宠易萌宠物管理系统！</h3>
        </n-space>
        <n-space class="h-16 items-center justify-end">
            <n-button quaternary circle v-for="(item, index) in Icons" :focusable="false"
                @click="handleIconClick(item)">
                <template #icon>
                    <component :is="item" />
                </template>
            </n-button>
            <n-dropdown :options="options" @select="handleSelect">
                <n-avatar round size="large" src="https://s11.ax1x.com/2024/02/05/pFlTtZn.jpg" />
                <!-- <n-avatar round size="large"
                    :src="userStore.userInfo.avatar ? userStore.userInfo.avatar : 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'" /> -->
            </n-dropdown>
        </n-space>
        <n-drawer v-model:show="active" :default-width="1100" resizable close-on-esc :max-width="1260" :min-width="800"
            z-index="1000">
            <n-drawer-content title="购买商品" closable>
                <n-card style="margin-bottom: 16px">
                    <n-tabs type="line" animated @update:value="handleUpdateServiceTab">
                        <n-tab-pane name="Optional Products" tab="选购商品">
                            <n-tabs type="line" animated placement="left" @update:value="handleTabShow">
                                <n-tab-pane :name="item.name" :tab="item.tab" :key="item.value"
                                    v-for="(item, index) in category">
                                    <Table :columns="columns" :data="activeTabData" :row-key="row => row.productId"
                                        v-model:selectedRowKeys="publicStore.selectedRows">
                                    </Table>
                                </n-tab-pane>
                            </n-tabs>
                        </n-tab-pane>
                        <n-tab-pane name="Appointment Service" tab="预约服务">
                            <ServiceTabs></ServiceTabs>
                        </n-tab-pane>
                    </n-tabs>
                </n-card>
                <n-flex justify="end" class="items-center text-2xl h-12" v-if="ServiceTab">
                    <n-select class="w-64" @update:value="handleUpdateValue" filterable :size="large"
                        :options="selectPeople" :render-label="renderLabel" :render-tag="renderSingleSelectTag"
                        placeholder="请选择顾客" />
                    <n-number-animation ref="numberAnimationInstRef" :from="previousTotal" :to="total" :active="true"
                        :precision="2" :duration="1000" />
                    <n-button @click="submitOrder">购买</n-button>
                </n-flex>
            </n-drawer-content>
        </n-drawer>
    </div>
</template>

<script setup lang="ts">
import { usecustomersStore } from '@/stores/modules/customers';
import { useOrdersStore } from '@/stores/modules/orders';
import { useProductStore } from '@/stores/modules/product';
import { useSidebarStore } from '@/stores/modules/sidebar';
import { useUserStore } from '@/stores/modules/user';
import { usePublicStore } from '@/stores/public';
import { useRouter } from 'vue-router';
import { NAvatar, NSwitch, NButton, NInputNumber, NText } from 'naive-ui';

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()
const OrderStore = useOrdersStore()
const customerStore = usecustomersStore()
const publicStore = usePublicStore();
const sidebarStore = useSidebarStore();
const productStore = useProductStore();

const iconNames = ['Sousuo', 'Xinxi', 'Qianbao'];
const Icons = computed(() => iconNames.map(name => `Icon${name}`));

const active = ref(false)
const productList = ref([])
const customerList = ref([])
const categoryProductList = ref([])
const numberAnimationInstRef = ref(null)
const previousTotal = ref(0);
const total = ref(0)
const activeTab = ref('oasis');
const selectedRowKeys = ref([]);
const ServiceTab = ref(true)
const nonZeroQuantityRows = computed(() => {
    return productList.value.filter(product => product.quantity > 0);
});
const activeTabData = ref([])
const selectedProducts = computed(() => {
    return publicStore.selectedRows
        .map(productId => productList.value.find(product => product.productId === productId))
        .filter(Boolean);
});
const orderDate = ref({
    customerId: 0,
    employeeId: 3,
    orderItems: [], // 初始化为一个空数组
    status: '',
});

const handleSelect = async (item) => {
    switch (item) {
        case 'profile':
            // 调用查看用户资料的方法
            viewProfile();
            break;
        case 'editProfile':
            // 调用编辑用户资料的方法
            editProfile();
            break;
        case 'logout':
            // 调用退出登录的方法
            await userStore.LogOut();
            router.push('/login');
            break;
        default:
            console.log('Unknown item selected:', item);
    }
};

const fetchLatestProducts = async () => {
    await productStore.fetchProductList();
    // 可以在这里过滤或者处理产品数据
    activeTabData.value = productStore.products.filter(product => product.status === true);
};

const submitOrder = async () => {
    const selectedProductDetails = selectedProducts.value;
    const productQuantityMap = {};

    selectedProducts.value.forEach(product => {
        if (productQuantityMap[product.productId]) {
            // If the product already exists in the map, add to its quantity
            productQuantityMap[product.productId] += product.quantity;
        } else {
            // Otherwise, add the product to the map with its quantity
            productQuantityMap[product.productId] = product.quantity;
        }
    });

    // Convert the map back to an array for orderItems
    orderDate.value.orderItems = Object.keys(productQuantityMap).map(productId => ({
        productId: Number(productId),
        quantity: productQuantityMap[productId],
    }));

    orderDate.value.status = "已完成";

    await OrderStore.addOrder(orderDate.value)
    message.success("购买成功")

    // 清空选中商品的数量
    selectedProducts.value.forEach(product => {
        product.quantity = null;
    });

    await fetchLatestProducts();
}
const handleUpdateValue = (value: string) => {
    orderDate.value.customerId = parseInt(value);
}
const handleUpdateServiceTab = (tabName: string) => {
    ServiceTab.value = !ServiceTab.value
}
const category = ref([
    {
        name: "oasis",
        tab: "全部商品",
        value: 0
    },
    {
        name: "mainFood",
        tab: "主粮",
        value: 1
    },
    {
        name: "toy",
        tab: "玩具",
        value: 2
    },
    {
        name: "canned",
        tab: "罐头",
        value: 3
    },
    {
        name: "snack",
        tab: "零食",
        value: 4
    }
]);
const options = [
    {
        label: '用户资料',
        key: 'profile',
    },
    {
        label: '编辑用户资料',
        key: 'editProfile',
    },
    {
        label: '退出登录',
        key: 'logout',
    }
]
const selectPeople = computed(() => {
    return customerList.value.map(customer => ({
        label: customer.customerName,
        value: customer.customerId
    }));
});
const columns = ref([
    {
        type: 'selection',
    },
    {
        title: '商品图片',
        key: 'imageUrl',
        render(row) {
            return h(NAvatar, {
                size: 'large',
                src: row.imageUrl
            });
        }
    },
    {
        title: '商品名称',
        key: 'productName'
    },
    {
        title: '分类',
        key: 'categoryName'
    },
    {
        title: '商品描述',
        key: 'productDescription'
    },
    {
        title: '数量',
        key: 'quantity',
        render(row) {
            return h(NInputNumber, {
                value: row.quantity,
                buttonPlacement: 'both',
                'onUpdate:value': (value) => handleQuantityChange(row, value),
                min: 0,
                max: row.stockQuantity
            });
        }
    },
    {
        title: '库存数量',
        key: 'stockQuantity'
    },
    {
        title: '商品价格',
        key: 'price'
    }
]);

onMounted(async () => {
    await productStore.fetchProductList()
    await customerStore.fetchcustomers()
    customerList.value = customerStore.customers
    productList.value = productStore.products.filter((product) => product.status == true);
    activeTabData.value = productList.value
})

// 定义不同的图标按钮点击方法
const onSearchClick = () => console.log('搜索被点击');
const onMessageClick = () => console.log('信息被点击');
const onWalletClick = async () => {
    active.value = !active.value
}

// 将图标名称映射到对应的点击方法
const iconClickMethods = {
    IconSousuo: onSearchClick,
    IconXinxi: onMessageClick,
    IconQianbao: onWalletClick,
};

// 处理图标按钮点击事件的方法
const handleIconClick = (iconName: string) => {
    const clickHandler = iconClickMethods[iconName];
    if (clickHandler) {
        clickHandler();
    } else {
        console.warn(`No click handler for icon: ${iconName}`);
    }
};

// 防抖函数，确保动画不会在快速连续变化时频繁触发
const debouncedPlayAnimation = debounce(() => {
    numberAnimationInstRef.value?.play();
}, 300);

function handleQuantityChange(row, newQuantity) {
    // 更新当前行的数量
    row.quantity = newQuantity;

    // 仅当当前行已被选中时，才重新计算总价
    if (publicStore.selectedRows.includes(row.productId)) {
        calculateTotal();
    }
}
function calculateTotal() {
    // 从被选中的商品中筛选出数量不为0的商品进行计算
    const selectedAndNonZeroQuantityRows = publicStore.selectedRows
        .map(id => productList.value.find(product => product.productId === id))
        .filter(product => product.quantity > 0);

    const rawTotal = selectedAndNonZeroQuantityRows.reduce((acc, cur) => {
        return acc + cur.quantity * cur.price;
    }, 0);

    // 更新总价，并确保之前的总价也更新
    previousTotal.value = total.value;
    total.value = parseFloat(rawTotal.toFixed(2));
}
watch(() => total.value, (newTotal) => {
    debouncedPlayAnimation();
});
watch(total, (newValue) => {
    if (newValue !== previousTotal.value) {
        debouncedPlayAnimation();
    }
});
watch(() => publicStore.selectedRows, (newSelectedRows) => {
    if (publicStore.selectedRows.length > 0) {
        calculateTotal();
    } else {
        total.value = 0;
    }
}, { deep: true });

const handleTabShow = async (name) => {
    const selectedCategoryItem = category.value.find(item => item.name === name);
    if (selectedCategoryItem) {
        if (selectedCategoryItem.value == 0) {
            await productStore.fetchProductList()
            activeTabData.value = productStore.products.filter((product) => product.status == true);
        } else {
            await productStore.getProductsByCategory(selectedCategoryItem.value)
            activeTabData.value = productStore.products
                .filter((product) => product.status == true)
                .map(product => ({
                    ...product,
                    categoryName: category.value.find(cat => cat.value == product.category)?.tab
                }));

        }
    } else {
        console.log('No matching category found');
    }
};

function debounce(fn, delay) {
    let timeoutID = null;
    return function () {
        clearTimeout(timeoutID);
        let args = arguments;
        let context = this;
        timeoutID = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

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
                            default: () => 'description'
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
</script>

<style lang="scss" scoped>
@import '@/style/login.css';

.n-icon-slot {
    svg {
        width: 100%;
        height: 100%;
    }
}
</style>