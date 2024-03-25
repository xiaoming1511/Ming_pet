<template>
    <div>
        <n-avatar-group :options="options" :size="40" :max="3">
            <template v-for="(option, index) in options" #[`avatar-${index}`]="{ option }">
                <n-avatar :src="option.src" />
            </template>
        </n-avatar-group>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    imageUrls: Array,
    orderIds: Array
});

const options = computed(() => {    
    return props.orderIds.map((id, index) => {
        return {    
            name: `订单${id}`, // 这里的命名方式可以按需修改
            src: props.imageUrls[index]
        };
    });
});
</script>

<style scoped></style>