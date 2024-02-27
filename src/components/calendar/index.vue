<template>
    <div>
        <n-calendar v-model:value="value" :is-date-disabled="isDateDisabled" @update:value="handleUpdateValue">
        </n-calendar>
    </div>
</template>

<script setup lang="ts">
import { isYesterday, addDays } from 'date-fns/esm'

const value = ref(addDays(Date.now(), 1).valueOf())
const message = useMessage()

function handleUpdateValue(
    _: number,
    { year, month, date }: { year: number; month: number; date: number }
) {
    message.success(`${year}-${month}-${date}`)
}
function isDateDisabled(timestamp: number) {
    if (isYesterday(timestamp)) {
        return true
    }
    return false
}
</script>

<style scoped>
:deep(.n-calendar){
    height: 100%;
}
:deep(.n-calendar-dates) {
    flex: 0.5;
}

:deep(.n-calendar-date) {
    justify-content: center !important;
    height: 48px !important;
    width: 100% !important;
    padding: 0 !important;
}
</style>