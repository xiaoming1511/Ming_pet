<template>
    <div>
        <n-modal class="min-w-lg" v-model:show="publicStore.ShowModal" preset="dialog" :title="publicStore.modalTitle" :style="bodyStyle">
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
import { usePublicStore } from '@/stores/public';
const publicStore = usePublicStore();

const bodyStyle = ref({
    width: 'auto'
});

</script>

<style scoped lang="scss"></style>