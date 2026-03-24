# AiChat

完整流式对话组件，专为 AI 聊天场景设计，整合消息列表和输入框，开箱即用。

## 基础用法

最基本的完整对话组件：

:::demo

```vue
<template>
  <div style="height: 500px;">
    <AiChat
      v-model="messages"
      :loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiChat } from 'ai-ui-vue'

const messages = ref([
  {
    role: 'assistant',
    content: '你好！我是 AI 助手，有什么可以帮你的吗？',
    timestamp: new Date()
  }
])

const loading = ref(false)

// 模拟流式回复效果
const mockStreamResponse = async (content: string) => {
  const responses = [
    '你好！',
    `我收到了你的消息：**${content}**\n\n`,
    '我正在为你生成回复...\n\n',
    '这是一个模拟的流式响应效果，逐字输出内容。\n\n',
    '在实际应用中，你可以通过 SSE 或 WebSocket 接收大模型的流式输出，并实时更新消息列表。'
  ]

  // 添加空的 AI 消息占位
  messages.value.push({
    role: 'assistant',
    content: '',
    timestamp: new Date()
  })

  // 逐段输出模拟流式效果
  const lastIndex = messages.value.length - 1
  for (const part of responses) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100))
    messages.value[lastIndex].content += part
    messages.value = [...messages.value] // 触发响应式更新
  }

  loading.value = false
}

const handleSubmit = (content: string) => {
  loading.value = true
  // 模拟网络延迟后开始流式回复
  setTimeout(() => {
    mockStreamResponse(content)
  }, 300)
}
</script>
```

:::

## 隐藏头像或时间戳

可以根据需要隐藏头像或时间戳：

:::demo

```vue
<template>
  <div style="height: 400px;">
    <AiChat
      v-model="messages"
      :show-avatars="false"
      :show-timestamps="true"
      placeholder="匿名对话..."
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiChat } from 'ai-ui-vue'

const messages = ref([
  {
    role: 'user',
    content: '不显示头像更简洁',
    timestamp: new Date()
  },
  {
    role: 'assistant',
    content: '是的，你可以根据场景灵活配置',
    timestamp: new Date()
  }
])
</script>
```

:::

## 禁用输入

当 AI 正在生成回复时，可以禁用输入：

:::demo

```vue
<template>
  <div style="height: 300px;">
    <AiChat
      v-model="messages"
      :disabled="disabled"
      placeholder="输入已禁用..."
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiChat } from 'ai-ui-vue'

const messages = ref([
  {
    role: 'assistant',
    content: '当前输入已禁用'
  }
])
const disabled = ref(true)
</script>
```

:::

## API

### Props

| 参数            | 说明                       | 类型             | 默认值             |
| --------------- | -------------------------- | ---------------- | ------------------ |
| modelValue      | 消息列表（支持 v-model）   | `ChatMessage[]`  | `[]`               |
| loading         | 是否加载中（流式响应时）   | `boolean`        | `false`            |
| disabled        | 是否禁用输入               | `boolean`        | `false`            |
| placeholder     | 输入框占位符               | `string`         | `'输入消息...'`    |
| showAvatars     | 是否显示头像               | `boolean`        | `true`             |
| showTimestamps  | 是否显示时间戳             | `boolean`        | `false`            |

### Events

| 事件名            | 说明                 | 参数                |
| ----------------- | -------------------- | ------------------- |
| update:modelValue | 消息列表更新         | `messages: ChatMessage[]` |
| submit            | 用户提交消息时触发   | `content: string`  |

### ChatMessage 结构

| 字段      | 说明         | 类型                          |
| --------- | ------------ | ----------------------------- |
| role      | 消息角色     | `'user' \| 'assistant' \| 'system'` |
| content   | 消息内容     | `string`                      |
| timestamp | 时间戳（可选）| `Date \| string`              |

## 主题定制

使用 CSS 变量自定义样式：

```css
.ai-chat {
  --ai-border-color: #e5e7eb;
  --ai-primary-color: #6366f1;
  --ai-bg-color: #fff;
  --ai-text-color: #1f2937;
  --ai-text-secondary: #6b7280;
}
```
