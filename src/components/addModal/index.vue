<template>
    <div>
        <n-modal v-model:show="publicStore.addShowModal" preset="dialog" title="Dialog" :style="bodyStyle">
            <template #header>
                <slot name="header"></slot>
            </template>
            <div>
                <n-form ref="formRef" label-placement="left" label-width="auto" require-mark-placement="right-hanging"
                    :style="{ maxWidth: '640px' }">
                    <slot name="form-content"></slot>
                </n-form>
            </div>
            <template #action>
                <slot name="action"></slot>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/modules/product';
import { usePublicStore } from '@/stores/public';
const productStore = useProductStore();
const publicStore = usePublicStore();

const bodyStyle = ref({
    width: 'auto'
});

</script>

<style scoped lang="scss"></style>