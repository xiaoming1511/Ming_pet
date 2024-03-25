<template>
  <div ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { Chart } from '@antv/g2';

const chartContainer = ref<HTMLElement | null>(null);

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
});
</script>

<style scoped>
/* 你的样式 */
</style>
