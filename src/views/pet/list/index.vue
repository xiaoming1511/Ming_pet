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
                <n-select class="max-w-48" v-model:value="selectedValue" filterable clearable placeholder="选择分类" :options="options" />
            </template>
            <template #search-actions>
                <n-button round>
                    搜索
                </n-button>
            </template>
        </SearchBar>
        <Table></Table>
    </div>
</template>

<script setup lang="ts">

const disablePreviousDate = (ts: number) => {
    return ts > Date.now()
}
const selectedValue = ref(null)

const options = [
    {
        label: 'Drive My Car',
        value: 'song1'
    },
    {
        label: 'Norwegian Wood',
        value: 'song2'
    },
]
</script>

<style scoped></style>