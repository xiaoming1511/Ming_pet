<script setup lang="ts">

</script>

<template>
  <n-message-provider>
    <n-modal-provider>
      <n-dialog-provider>
        <router-view></router-view>
      </n-dialog-provider>
    </n-modal-provider>
  </n-message-provider>
</template>

<style scoped>
#APP {
  width: 100vw;
  height: 100vh;
}

:deep(.n-avatar) {
  background-color: transparent;
}
</style>
