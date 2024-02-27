<template>
    <div class="p-5">
        <SearchBar>
            <template #search-input>
                <n-input placeholder="请输入店员名称/手机号" clearable>
                    <template #prefix>
                        <n-icon>
                            <IconSearch></IconSearch>
                        </n-icon>
                    </template>
                </n-input>
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

</script>

<style scoped></style>