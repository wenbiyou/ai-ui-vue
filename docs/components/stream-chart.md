# StreamChart

基于 Canvas 的实时流式图表，支持动态数据推送，适合监控 Token 生成速率、实时数据变化等 AI 场景。

## 基础用法

模拟实时数据推送：

:::demo

```vue
<template>
  <div>
    <StreamChart
      v-model:streaming="streaming"
      :width="600"
      :height="250"
      :max-points="60"
      title="Token 生成速率监控"
      ref="streamChartRef"
    />
    <div style="margin-top: 12px; text-align: center;">
      <button @click="toggleStartStop" class="toggle-btn">
        {{ streaming ? '暂停推送' : '开始推送' }}
      </button>
      <button @click="clearChart" class="clear-btn">清空</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { StreamChart } from 'ai-ui-vue'

const streaming = ref(false)
const streamChartRef = ref(null)
let intervalId = null

// 模拟数据推送
const pushData = () => {
  if (!streamChartRef.value) return

  // 模拟围绕 40 波动的随机数据，模拟 Token 生成速率变化
  const baseValue = 30 + Math.random() * 20
  streamChartRef.value.addPoint(baseValue)
}

const toggleStartStop = () => {
  streaming.value = !streaming.value
}

const clearChart = () => {
  streamChartRef.value?.clear()
}

// 开始模拟推送
onMounted(() => {
  // 初始几个点
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      pushData()
    }, i * 200)
  }

  // 启动定时推送
  intervalId = setInterval(() => {
    if (streaming.value) {
      pushData()
    }
  }, 500)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.toggle-btn {
  padding: 8px 24px;
  border: none;
  border-radius: 6px;
  background: var(--ai-primary-color, #6366f1);
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-right: 12px;
}

.clear-btn {
  padding: 8px 24px;
  border: 1px solid var(--ai-border-color, #e5e7eb);
  border-radius: 6px;
  background: transparent;
  color: var(--ai-text-color, #1f2937);
  font-size: 14px;
  cursor: pointer;
}
</style>
```

:::

## 自定义颜色

修改线条和填充颜色：

:::demo

```vue
<template>
  <div>
    <StreamChart
      :data="data"
      :width="400"
      :height="200"
      line-color="#10b981"
      fill-color="rgba(16, 185, 129, 0.15)"
      title="自定义绿色主题"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { StreamChart } from 'ai-ui-vue'

const data = ref([
  { x: 0, y: 10 },
  { x: 1, y: 12 },
  { x: 2, y: 15 },
  { x: 3, y: 13 },
  { x: 4, y: 18 },
  { x: 5, y: 20 },
  { x: 6, y: 17 },
  { x: 7, y: 25 },
])
</script>
```

:::

## API

### Props

| 参数         | 说明                       | 类型              | 默认值         |
| ------------ | -------------------------- | ----------------- | -------------- |
| width        | 图表宽度                   | `number`          | `600`          |
| height       | 图表高度                   | `number`          | `300`          |
| title        | 图表标题                   | `string`          | -              |
| data         | 初始数据                   | `StreamDataPoint[]` | `[]`         |
| streaming    | 是否正在流式推送（支持 v-model） | `boolean`    | `false`        |
| lineColor    | 线条颜色                   | `string`          | `'#6366f1'`    |
| fillColor    | 填充颜色                   | `string`          | `'rgba(99, 102, 241, 0.1)'` |
| maxPoints    | 最大数据点数量（超出滚动） | `number`          | `50`           |

### StreamDataPoint 结构

| 字段 | 说明         | 类型      |
| ---- | ------------ | --------- |
| x    | x 轴坐标值   | `number`  |
| y    | y 轴坐标值   | `number`  |
| t    | 时间戳（可选）| `number` |

### Exposed

组件暴露了以下方法供父组件调用：

| 方法名  | 说明         | 参数 |
| ------- | ------------ | ---- |
| addPoint | 添加新数据点（自动重绘） | `y: number` |
| clear    | 清空图表     | - |
| data     | 当前数据列表 | `StreamDataPoint[]` |

## 主题定制

使用 CSS 变量自定义样式：

```css
.stream-chart {
  --ai-border-color: #e5e7eb;
  --ai-primary-color: #6366f1;
  --ai-bg-color: #fff;
  --ai-text-color: #1f2937;
  --ai-text-secondary: #6b7280;
}
```
