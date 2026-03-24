<template>
  <div class="stream-chart">
    <div class="stream-chart__header" v-if="title">
      <span class="stream-chart__title">{{ title }}</span>
      <span class="stream-chart__status" :class="{ 'stream-chart__status--live': streaming }">
        {{ streaming ? '● 实时推送中' : '■ 已暂停' }}
      </span>
    </div>
    <canvas ref="canvasRef" :width="width" :height="height" class="stream-chart__canvas" @click="toggleStreaming"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

/**
 * StreamChart 数据点定义
 */
export interface StreamDataPoint {
  /** x 轴坐标值 */
  x: number
  /** y 轴坐标值 */
  y: number
  /** 时间戳（可选） */
  t?: number
}

/**
 * StreamChart 组件 Props 定义
 * @description 实时流式图表组件，支持动态推送数据实时渲染
 */
export interface StreamChartProps {
  /** 图表宽度 */
  width?: number
  /** 图表高度 */
  height?: number
  /** 图表标题 */
  title?: string
  /** 初始数据 */
  data?: StreamDataPoint[]
  /** 是否正在流式推送 */
  streaming?: boolean
  /** 线条颜色 */
  lineColor?: string
  /** 填充颜色 */
  fillColor?: string
  /** 最大数据点数量（超出会自动滚动） */
  maxPoints?: number
}

const props = withDefaults(defineProps<StreamChartProps>(), {
  width: 600,
  height: 300,
  title: undefined,
  data: () => [],
  streaming: false,
  lineColor: '#6366f1',
  fillColor: 'rgba(99, 102, 241, 0.1)',
  maxPoints: 50
})

const canvasRef = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D | null>(null)
const animationId = ref<number | null>(null)
const currentData = ref<StreamDataPoint[]>([...props.data])

/** 绘制图表 */
const draw = () => {
  if (!ctx.value || !canvasRef.value) return

  const canvas = canvasRef.value
  const data = currentData.value
  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  const chartWidth = canvas.width - padding.left - padding.right
  const chartHeight = canvas.height - padding.top - padding.bottom

  // 清空画布
  ctx.value.clearRect(0, 0, canvas.width, canvas.height)
  ctx.value.fillStyle = '#ffffff'
  ctx.value.fillRect(0, 0, canvas.width, canvas.height)

  if (data.length < 2) {
    // 绘制提示文本
    ctx.value.fillStyle = '#9ca3af'
    ctx.value.font = '14px sans-serif'
    ctx.value.textAlign = 'center'
    ctx.value.fillText('等待数据...', canvas.width / 2, canvas.height / 2)
    return
  }

  // 计算坐标范围
  const minY = Math.min(...data.map(d => d.y))
  const maxY = Math.max(...data.map(d => d.y))
  const rangeY = maxY - minY || 1

  // 绘制网格线
  ctx.value.strokeStyle = '#e5e7eb'
  ctx.value.lineWidth = 1
  for (let i = 0; i <= 5; i++) {
    const y = padding.top + (chartHeight / 5) * i
    ctx.value.beginPath()
    ctx.value.moveTo(padding.left, y)
    ctx.value.lineTo(padding.left + chartWidth, y)
    ctx.value.stroke()
  }

  // 绘制路径
  ctx.value.beginPath()

  const xStep = chartWidth / Math.max(data.length - 1, props.maxPoints)

  data.forEach((point, i) => {
    const x = padding.left + i * xStep
    const y = padding.top + chartHeight - ((point.y - minY) / rangeY) * chartHeight

    if (i === 0) {
      ctx.value!.moveTo(x, y)
    } else {
      ctx.value!.lineTo(x, y)
    }
  })

  // 描边
  ctx.value.strokeStyle = props.lineColor
  ctx.value.lineWidth = 2
  ctx.value.stroke()

  // 填充
  ctx.value.lineTo(padding.left + (data.length - 1) * xStep, padding.top + chartHeight)
  ctx.value.lineTo(padding.left, padding.top + chartHeight)
  ctx.value.closePath()
  ctx.value.fillStyle = props.fillColor
  ctx.value.fill()

  // 绘制坐标轴标签
  ctx.value.fillStyle = '#6b7280'
  ctx.value.font = '12px sans-serif'
  ctx.value.textAlign = 'right'
  for (let i = 0; i <= 5; i++) {
    const y = padding.top + (chartHeight / 5) * i
    const value = maxY - (rangeY / 5) * i
    ctx.value.fillText(value.toFixed(1), padding.left - 8, y + 4)
  }

  if (props.streaming) {
    animationId.value = requestAnimationFrame(draw)
  }
}

/** 添加新数据点 */
const addPoint = (y: number) => {
  currentData.value.push({
    x: currentData.value.length,
    y,
    t: Date.now()
  })

  // 超出最大数量移除最早点
  if (currentData.value.length > props.maxPoints) {
    currentData.value.shift()
  }

  draw()
}

/** 切换推送状态 */
const emit = defineEmits<{
  /** 是否正在流式推送，支持 v-model:streaming 双向绑定 */
  (e: 'update:streaming', value: boolean): void
}>()

const toggleStreaming = () => {
  emit('update:streaming', !props.streaming)
}

// 暴露方法供父组件调用
const expose = {
  addPoint,
  clear: () => {
    currentData.value = []
    draw()
  },
  data: currentData
}

defineExpose(expose)

watch(() => props.data, (newData) => {
  currentData.value = [...newData]
  draw()
}, { deep: true })

watch(() => props.streaming, (shouldStream) => {
  if (shouldStream) {
    animationId.value = requestAnimationFrame(draw)
  } else if (animationId.value) {
    cancelAnimationFrame(animationId.value)
    animationId.value = null
  }
})

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d')
    draw()
    if (props.streaming) {
      animationId.value = requestAnimationFrame(draw)
    }
  }
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})
</script>

<style scoped>
.stream-chart {
  padding: 12px;
  border: 1px solid var(--ai-border-color, #e5e7eb);
  border-radius: 8px;
  background: var(--ai-bg-color, #fff);
}

.stream-chart__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stream-chart__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--ai-text-color, #1f2937);
}

.stream-chart__status {
  font-size: 12px;
  color: var(--ai-text-secondary, #6b7280);
}

.stream-chart__status--live {
  color: #10b981;
  animation: pulse 2s infinite;
}

.stream-chart__canvas {
  display: block;
  cursor: pointer;
  border-radius: 4px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
