<template>
    <div>
        <div ref="barChartRef" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';

const barChartRef = ref(null);

onMounted(() => {
    if (barChartRef.value) {
        const barChart = echarts.init(barChartRef.value);
        barChart.setOption({
            title: {
                text: '销售日期与销售额'
            },
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
                data: ['2024-04-05', '2024-04-06', '2024-04-07', '2024-04-08', '2024-04-09', '2024-04-10', '2024-04-11', '2024-04-12']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '销售额',
                type: 'bar',
                data: [0, 0, 0, 0, 0, 0, 0, 3],
                itemStyle: {
                    color: '#5470C6'
                }
            }]
        });
    }
});
</script>

<style scoped></style>