<script setup lang="ts">

</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-modal-provider>
        <n-dialog-provider>
          <router-view></router-view>
        </n-dialog-provider>
      </n-modal-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style scoped>
#APP {
  width: 100vw;
  height: 100vh;
}
</style>
