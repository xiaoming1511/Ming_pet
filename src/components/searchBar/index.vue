<template>
    <n-flex class="search-flex bg-white mb-5 p-5 box-border text-left">
        <div class="search-input max-w-xs">
            <!-- 搜索输入框的插槽 -->
            <slot name="search-input"></slot>
        </div>
        <div class="search-controls flex gap-3">
            <!-- 额外控件如按钮和下拉菜单的插槽 -->
            <slot name="search-controls"></slot>
        </div>
        <div class="search-actions">
            <!-- 搜索和清除等动作按钮的插槽 -->
            <slot name="search-actions"></slot>
        </div>
    </n-flex>
</template>

<script setup lang="ts">


</script>

<style scoped>
.search-flex {
    flex-wrap: nowrap !important;
    display: flex;
    /* 确保使用 flex 布局 */
    justify-content: flex-start;
    /* 使用 justify-content 来分配子元素间的空间 */
    align-items: center;
    /* 垂直居中对齐 */
}

.search-actions {
    flex-shrink: 0;
    margin-left: auto;
    /* 防止动作按钮缩小 */
}
</style>