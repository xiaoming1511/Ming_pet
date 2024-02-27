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
            </template>
            <template #search-actions>
                <n-button class="mr-4" text quaternary :focusable="false">
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
        <Table></Table>
    </div>
</template>

<script setup lang="ts">
const disablePreviousDate = (ts: number) => {
    return ts > Date.now()
}
</script>

<style scoped></style>