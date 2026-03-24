# TokenCounter

Token 计数与成本估算组件，实时计算输入文本的 Token 预估，并根据选择的大模型计算预估调用成本。

## 基础用法

实时计算 Token 和成本：

:::demo

```vue
<template>
  <div>
    <TokenCounter
      v-model="text"
      :show-model-selector="true"
      default-model="gpt-4o"
    />
    <div v-if="text" style="margin-top: 16px;">
      <details>
        <summary style="cursor: pointer; font-size: 14px;">查看输入内容</summary>
        <pre style="margin-top: 8px; padding: 12px; background: #f3f4f6; border-radius: 6px; font-size: 12px; max-height: 200px; overflow: auto;">{{ text }}</pre>
      </details>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TokenCounter } from 'ai-ui-vue'

const text = ref(`你好，这是一段测试文本。

TokenCounter 组件会实时估算这段文本的 Token 数量，并根据选择的模型计算预估成本。

中文每个字符大约对应 1.1 个 Token，英文大约每 4 个字符对应 1 个 Token，这是一个经验估算公式，和 OpenAI 官方 tokenizer 误差通常在 5% 以内，足够用于前端预览估算。`)
</script>
```

:::

## 隐藏模型选择器

如果你只需要固定一个模型，可以隐藏选择器：

:::demo

```vue
<template>
  <TokenCounter
    v-model="text"
    :show-model-selector="false"
    default-model="gpt-3.5-turbo"
    placeholder="输入文本..."
  />
</template>

<script setup>
import { ref } from 'vue'
import { TokenCounter } from 'ai-ui-vue'

const text = ref('')
</script>
```

:::

## 支持的模型

内置支持以下主流大模型定价（**价格单位：人民币 / 每千 tokens**，价格仅供参考，实际以官方最新价格为准）：

| 模型 | 价格（¥/1K tokens） | 最大上下文 |
| ---- | ------------------ | ---------- |
| GPT-3.5 Turbo | 0.0015 | 16,384 |
| GPT-4 | 0.06 | 8,192 |
| GPT-4o | 0.005 | 128,000 |
| Claude 3 Opus | 0.015 | 200,000 |
| Claude 3 Sonnet | 0.003 | 200,000 |
| 文心一言 4.0 | 0.012 | 12,000 |
| 通义千问 Max | 0.012 | 32,000 |

你也可以通过 `models` prop 传入自定义定价配置。

## API

### Props

| 参数             | 说明                       | 类型             | 默认值 |
| ---------------- | -------------------------- | ---------------- | ------ |
| modelValue       | 输入文本（支持 v-model）   | `string`         | `''`   |
| models           | 模型定价配置               | `ModelPricing`   | 内置默认定价 |
| defaultModel     | 默认选择的模型             | `string`         | `'gpt-3.5-turbo'` |
| showModelSelector | 是否显示模型选择器       | `boolean`        | `true` |
| warningLimit     | Token 达到多少数量开始警告。小于 1 表示占最大上下文的比例 | `number` | `0.8` |
| disabled         | 是否禁用                   | `boolean`        | `false` |
| placeholder      | 输入框占位符               | `string`         | `'输入文本，实时计算 Token 数量和预估成本...'` |

### Events

| 事件名            | 说明                 | 参数                |
| ----------------- | -------------------- | ------------------- |
| update:modelValue | 输入文本更新         | `value: string` |
| update:tokenCount | Token 数量更新       | `count: number` |
| update:cost       | 预估成本更新         | `cost: number` |

### ModelPricing 结构

```typescript
interface ModelPricing {
  [modelKey: string]: {
    name: string          // 模型显示名称
    pricePer1k: number    // 每 1K tokens 价格（人民币）
    maxTokens: number     // 最大上下文 token 数量
  }
}
```

## 估算算法

组件使用经验估算公式：

- **中文字符**：每个字符 ≈ 1.1 token
- **其他字符**：每 4 个字符 ≈ 1 token

这个估算足够用于前端预览场景，如果需要精确计数，请使用官方 tokenizer 库（如 `gpt-tokenizer`）。

## 主题定制

使用 CSS 变量自定义样式：

```css
.token-counter {
  --ai-border-color: #e5e7eb;
  --ai-primary-color: #6366f1;
  --ai-bg-color: #fff;
  --ai-text-color: #1f2937;
  --ai-text-secondary: #6b7280;
}
```
