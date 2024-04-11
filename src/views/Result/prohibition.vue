<template>
    <div class="flex items-center justify-center w-screen h-screen">
        <n-result status="403" title="403 禁止访问" description="总有些门是对你关闭的">
            <template #footer>
                <n-button @click="router.push('/home')">回首页</n-button>
            </template>
        </n-result>
    </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
</script>