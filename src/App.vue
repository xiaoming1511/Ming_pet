<script setup lang="ts">

</script>

<template>
  <n-loading-bar-provider>
    <n-notification-provider :max="3" placement="bottom-right">
      <n-message-provider>
        <n-modal-provider>
          <n-dialog-provider>
            <router-view></router-view>
          </n-dialog-provider>
        </n-modal-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-loading-bar-provider>
</template>

<style>
#APP {
  width: 100vw;
  height: 100vh;
}

#nprogress .bar {
  background: rgba(24, 160, 88, 1) !important;
}
</style>
