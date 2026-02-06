<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-title">总用户数</div>
            <div class="stat-value">1,234</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-title">今日访问</div>
            <div class="stat-value">567</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-title">在线用户</div>
            <div class="stat-value">89</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-title">系统消息</div>
            <div class="stat-value">12</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card header="访问趋势">
          <div ref="chartRef" style="height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="用户分布">
          <div ref="pieRef" style="height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLDivElement>()
const pieRef = ref<HTMLDivElement>()

onMounted(() => {
  initLineChart()
  initPieChart()
})

function initLineChart() {
  if (!chartRef.value) return
  const chart = echarts.init(chartRef.value)
  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
      },
    ],
  }
  chart.setOption(option)
}

function initPieChart() {
  if (!pieRef.value) return
  const chart = echarts.init(pieRef.value)
  const option: EChartsOption = {
    series: [
      {
        type: 'pie',
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' },
        ],
      },
    ],
  }
  chart.setOption(option)
}
</script>

<style scoped>
.stat-card {
  text-align: center;
}

.stat-title {
  color: #999;
  font-size: 14px;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>
