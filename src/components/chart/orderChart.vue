<template>
    <div>
        <div ref="barChartRef" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from '@/stores/modules/orders';
import * as echarts from 'echarts';
import { DateUtils } from '@/utils/dateUtils';
const ordersStore = useOrdersStore()

const barChartRef = ref(null);

const getDateSales = async () => {
    const lastSevenDays = getLastSevenDays();
    const salesPromises = lastSevenDays.map(day => {
        return ordersStore.salesByDate(day);
    });
    const dateSales = await Promise.all(salesPromises);
    return dateSales; // 返回每一天的销售额数组
}

onMounted(async () => {
    await ordersStore.fetchDateSales()

    if (barChartRef.value) {
        const barChart = echarts.init(barChartRef.value);
        const lastSevenDays = DateUtils.getLastSevenDays()
        // 异步获取销售数据

        // 使用销售数据更新ECharts图表
        barChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: lastSevenDays
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '销售额',
                type: 'bar',
                barWidth: '50%',
                data: ordersStore.salesData, // 将异步获取的销售数据赋值给series.data
                itemStyle: {
                    color: 'rgb(250, 204, 13)',
                    borderRadius: [50, 50, 0, 0]
                }
            }]
        });
    }
});
</script>

<style scoped></style>