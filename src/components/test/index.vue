<template>
  <!-- <div ref="chartContainer"></div> -->
  <div ref="chartRef" style="width:600px; height:400px;"></div>
</template>

<script setup lang="ts">
import { Chart } from '@antv/g2';
import * as echarts from 'echarts';
import { title } from 'process';

const chartContainer = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLElement>();

onMounted(() => {
  if (chartContainer.value) {
    const chart = new Chart({
      container: chartContainer.value,
      width: 600,
      height: 300,
    });

    // 定义数据
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    // 定义图表
    // 声明可视化
    chart
      .interval() // 创建一个 Interval 标记
      .data(data) // 绑定数据
      .encode('x', 'genre') // 编码 x 通道
      .encode('y', 'sold'); // 编码 y 通道
    chart.render();
  }

  const chart = echarts.init(chartRef.value as HTMLElement);
  const option = {
    title: {
      text: '饼图',
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
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
        data: [
          { value: 1048, name: '猫粮' },
          { value: 735, name: '狗粮' },
          { value: 580, name: '猫条' },
          { value: 484, name: '猫抓板' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };

  chart.setOption(option);
});
</script>

<style scoped>
/* 你的样式 */
</style>
