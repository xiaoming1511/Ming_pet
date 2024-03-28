<template>
    <div>
        <n-avatar-group :options="options" :size="40" :max="3">
            <template #avatar="{ option: { name, src } }">
                <n-tooltip>
                    <template #trigger>
                        <n-avatar :src="src" />
                    </template>
                    {{ name }}
                </n-tooltip>
            </template>
            <template #rest="{ options: restOptions, rest }">
                <n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
                    <n-avatar>+{{ rest }}</n-avatar>
                </n-dropdown>
            </template>
        </n-avatar-group>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    imageUrls: Array,
    productNames: Array
});

const options = computed(() => {
    return props.productNames.map((productName, index) => {
        return {
            name: productName, // 使用商品名称作为显示名称
            src: props.imageUrls[index] // 商品图片URL
        };
    });
});

const createDropdownOptions = (options) => {
    return options.map((option) => ({
        key: option.name,
        label: option.name,
    }));
};
</script>

<style scoped></style>