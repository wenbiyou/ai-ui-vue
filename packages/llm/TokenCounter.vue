<template>
  <div class="token-counter">
    <div class="token-counter__input-wrapper">
      <textarea
        v-model="innerText"
        :placeholder="placeholder"
        :disabled="disabled"
        class="token-counter__textarea"
        @input="handleInput"
      />
    </div>
    <div class="token-counter__stats">
      <div class="token-counter__stat">
        <span class="token-counter__label">字符数</span>
        <span class="token-counter__value">{{ charCount }}</span>
      </div>
      <div class="token-counter__stat">
        <span class="token-counter__label">{{ mode === 'estimate' ? '估算 Token' : '精确 Token' }}</span>
        <span class="token-counter__value" :class="{ 'token-counter__value--warning': tokenCount >= warningLimit }">
          {{ tokenCount }}
          <span v-if="maxTokens">/ {{ maxTokens }}</span>
        </span>
      </div>
      <div class="token-counter__stat">
        <span class="token-counter__label">预估成本</span>
        <span class="token-counter__value">
          ¥{{ estimatedCost.toFixed(4) }}
        </span>
      </div>
    </div>
    <div v-if="showModelSelector" class="token-counter__selector">
      <span class="token-counter__label">模型</span>
      <select v-model="selectedModel" class="token-counter__select" @change="updatePrice">
        <option
          v-for="(config, key) in props.models"
          :key="key"
          :value="key"
        >
          {{ config.name }} (¥{{ config.pricePer1k }}/千 tokens)
        </option>
      </select>
    </div>
    <div v-if="tokenCount >= warningLimit" class="token-counter__warning">
      ⚠️ Token 数量已接近模型最大上下文限制
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { encode } from 'gpt-tokenizer'

/**
 * 模型定价配置
 */
export interface ModelPricing {
  [modelKey: string]: {
    name: string
    /** 单价：每 1K tokens 的价格，单位人民币 */
    pricePer1k: number
    /** 最大上下文 token 数量 */
    maxTokens: number
  }
}

/**
 * TokenCounter 组件 Props 定义
 * @description Token 计数与成本估算组件，实时计算输入文本的 Token 预估和成本
 */
export interface TokenCounterProps {
  /** 输入文本，支持 v-model 双向绑定 */
  modelValue?: string
  /** 模型定价配置 */
  models?: ModelPricing
  /** 默认选择的模型 */
  defaultModel?: string
  /** 是否显示模型选择器 */
  showModelSelector?: boolean
  /** Token 达到多少数量开始警告。小于 1 表示占最大上下文的比例 */
  warningLimit?: number
  /** 是否禁用 */
  disabled?: boolean
  /** 输入框占位符 */
  placeholder?: string
  /** 计数模式：estimate 使用经验公式估算（快速，适合前端预览），accurate 使用 gpt-tokenizer 精确计数 */
  mode?: 'estimate' | 'accurate'
}

const props = withDefaults(defineProps<TokenCounterProps>(), {
  modelValue: '',
  models: () => ({
    'gpt-3.5-turbo': {
      name: 'GPT-3.5 Turbo',
      pricePer1k: 0.0015,
      maxTokens: 16384,
    },
    'gpt-4': {
      name: 'GPT-4',
      pricePer1k: 0.06,
      maxTokens: 8192,
    },
    'gpt-4o': {
      name: 'GPT-4o',
      pricePer1k: 0.005,
      maxTokens: 128000,
    },
    'claude-3-opus': {
      name: 'Claude 3 Opus',
      pricePer1k: 0.015,
      maxTokens: 200000,
    },
    'claude-3-sonnet': {
      name: 'Claude 3 Sonnet',
      pricePer1k: 0.003,
      maxTokens: 200000,
    },
    'ernie-4.0': {
      name: '文心一言 4.0',
      pricePer1k: 0.012,
      maxTokens: 12000,
    },
    'qwen-max': {
      name: '通义千问 Max',
      pricePer1k: 0.012,
      maxTokens: 32000,
    },
  }),
  defaultModel: 'gpt-3.5-turbo',
  showModelSelector: true,
  warningLimit: 0.8,
  disabled: false,
  mode: 'estimate',
  placeholder: '输入文本，实时计算 Token 数量和预估成本...',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:tokenCount', count: number): void
  (e: 'update:cost', cost: number): void
  (e: 'warning', exceeded: boolean): void
}>()

const innerText = ref(props.modelValue)
const selectedModel = ref(props.defaultModel)

// 简单的估算算法：中文约 1.3 个字符 = 1 token，英文约 4 字符 = 1 token
const estimateTokens = (text: string): number => {
  if (!text) return 0

  let chineseCount = 0
  let otherCount = 0

  // 统计中文字符
  for (const char of text) {
    if (/[\u4e00-\u9fa5]/.test(char)) {
      chineseCount++
    } else {
      otherCount++
    }
  }

  // 估算公式：中文字符每个约 1.1 token，其他字符每 4 个约 1 token
  const estimated = Math.ceil(chineseCount * 1.1 + otherCount / 4)
  return estimated
}

const charCount = computed(() => innerText.value.length)

const tokenCount = computed(() => {
  if (props.mode === 'estimate') {
    return estimateTokens(innerText.value)
  }
  // accurate 模式使用 gpt-tokenizer 精确计数
  return encode(innerText.value).length
})

const currentModelConfig = computed(() => {
  return props.models[selectedModel.value] || props.models[Object.keys(props.models)[0]]
})

const maxTokens = computed(() => currentModelConfig.value.maxTokens)

const warningLimit = computed(() => {
  if (props.warningLimit < 1) {
    return Math.floor(currentModelConfig.value.maxTokens * props.warningLimit)
  }
  return props.warningLimit
})

const estimatedCost = computed(() => {
  const pricePer1k = currentModelConfig.value.pricePer1k
  return (tokenCount.value / 1000) * pricePer1k
})

const handleInput = () => {
  emit('update:modelValue', innerText.value)
  emit('update:tokenCount', tokenCount.value)
  emit('update:cost', estimatedCost.value)
  emit('warning', tokenCount.value >= warningLimit.value)
}

const updatePrice = () => {
  // 触发重新计算
  handleInput()
}

watch(() => props.modelValue, (val) => {
  innerText.value = val
  handleInput()
})

watch(() => tokenCount.value, (count) => {
  emit('warning', count >= warningLimit.value)
})
</script>

<style scoped>
.token-counter {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--ai-border-color, #e5e7eb);
  border-radius: 8px;
  background: var(--ai-bg-color, #fff);
}

.token-counter__textarea {
  width: 100%;
  min-height: 120px;
  max-height: 300px;
  padding: 12px;
  border: 1px solid var(--ai-border-color, #e5e7eb);
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  color: var(--ai-text-color, #1f2937);
  background: transparent;
}

.token-counter__textarea:focus {
  border-color: var(--ai-primary-color, #6366f1);
}

.token-counter__textarea:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.token-counter__stats {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.token-counter__stat {
  display: flex;
  align-items: center;
  gap: 6px;
}

.token-counter__label {
  font-size: 13px;
  color: var(--ai-text-secondary, #6b7280);
}

.token-counter__value {
  font-size: 16px;
  font-weight: 600;
  color: var(--ai-text-color, #1f2937);
}

.token-counter__value--warning {
  color: #f59e0b;
}

.token-counter__selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.token-counter__select {
  padding: 4px 8px;
  border: 1px solid var(--ai-border-color, #e5e7eb);
  border-radius: 4px;
  font-size: 13px;
  background: var(--ai-bg-color, #fff);
  color: var(--ai-text-color, #1f2937);
  cursor: pointer;
}

.token-counter__warning {
  padding: 8px 12px;
  background: rgba(245, 158, 11, 0.1);
  border-radius: 6px;
  font-size: 13px;
  color: #d97706;
}
</style>
