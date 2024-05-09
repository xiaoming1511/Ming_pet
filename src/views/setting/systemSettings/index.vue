<template>
    <div class="flex flex-col h-full mx-32">
        <el-table :data="tableData" style="width: 100%">
            <!-- <el-table-column prop="particulars" label="详情" /> -->
            <el-table-column prop="ip" label="IP地址" />
            <el-table-column prop="address" label="地点" />
            <el-table-column prop="system" label="操作系统" />
            <el-table-column prop="browserType" label="浏览器类型" />
            <el-table-column prop="dateTime" label="时间" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import SecurityLogsService from '@/api/Securitylogs';
import { useUserStore } from '@/stores/modules/user';
import { DateUtils } from '@/utils/dateUtils'
const userStore = useUserStore()
const tableData = reactive([])

onMounted(async () => {
    try {
        // 发送请求并等待响应
        const response = await SecurityLogsService.getSecurityLogs();

        const fullAddress = `${response.data.location.result.ad_info.nation} ${response.data.location.result.ad_info.province} ${response.data.location.result.ad_info.city}`;

        tableData.splice(0, tableData.length, {
            ip: response.data.location.result.ip,
            address: fullAddress,
            system: response.data.userAgent.OperatingSystem,
            browserType: response.data.userAgent.Browser,
            dateTime: DateUtils.formatDateTime(new Date())
        });
    } catch (error) {
        console.error("获取安全日志失败:", error);
    }
});
</script>

<style scoped>
:deep(.el-table .cell) {
    text-align: center !important;
}
</style>