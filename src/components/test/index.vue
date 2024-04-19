<template>
  <div ref="chartRef" style="width:600px; height:400px;"></div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/modules/product';
import * as echarts from 'echarts';

const productStore = useProductStore()


const chartRef = ref<HTMLElement>();

onMounted(async () => {
  await productStore.fetchProductList();
  const chart = echarts.init(chartRef.value as HTMLElement);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '库存',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: productStore.productStocks
      }
    ]
  };

  chart.setOption(option);
});
</script>

<style scoped></style>
