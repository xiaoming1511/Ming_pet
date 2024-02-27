<script setup lang="ts">

</script>

<template>
  <n-message-provider>
    <router-view class="table-container"></router-view>
  </n-message-provider>
</template>

<style scoped>
#APP {
  width: 100vw;
  height: 100vh;
}
/* 解决滚动条超出 */
.table-container {
  overflow-y: overlay;
  overflow-x: auto;
}
</style>
