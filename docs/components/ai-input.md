# AiInput

Prompt 输入框，专为 AI 对话场景设计，支持自动调整高度、字符计数、键盘快捷键提交。

## 基础用法

最基本的对话输入框使用方式：

:::demo

```vue
<template>
  <AiInput
    v-model="message"
    placeholder="输入内容..."
    :show-char-count="true"
    @submit="handleSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const message = ref('')

const handleSubmit = () => {
  console.log('提交:', message.value)
}
</script>
```

:::

## 各种状态展示

### 禁用状态

输入框禁用时，无法编辑：

:::demo

```vue
<template>
  <AiInput
    v-model="message"
    disabled
    placeholder="输入框已禁用"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const message = ref('这是禁用的内容')
</script>
```

:::

### 只读状态

只读状态下可以查看但不能编辑：

:::demo

```vue
<template>
  <AiInput
    v-model="message"
    readonly
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const message = ref('这是只读内容')
</script>
```

:::

### 自动聚焦

页面加载后自动聚焦输入框，适合对话场景：

:::demo

```vue
<template>
  <AiInput
    v-model="message"
    autofocus
    placeholder="输入框已自动聚焦"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const message = ref('')
</script>
```

:::

## 高级用法

### 带自定义操作栏

在底部操作栏添加自定义按钮：

:::demo

```vue
<template>
  <AiInput v-model="message">
    <template #actions>
      <button
        style="padding: 4px 12px; border-radius: 4px; border: 1px solid var(--ai-border-color); background: white; cursor: pointer;"
        @click="handleClear"
      >
        清空
      </button>
      <button
        style="padding: 4px 12px; border-radius: 4px; border: 1px solid var(--ai-primary-color); background: var(--ai-primary-color); color: white; cursor: pointer; margin-left: 8px;"
        @click="handleSubmit"
      >
        发送
      </button>
    </template>
  </AiInput>
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const message = ref('')

const handleClear = () => {
  message.value = ''
}

const handleSubmit = () => {
  alert('发送: ' + message.value)
}
</script>
```

:::

### 限制字符数

限制用户最大输入长度，并显示当前计数：

:::demo

```vue
<template>
  <AiInput
    v-model="message"
    :maxlength="100"
    :show-char-count="true"
    placeholder="最多输入 100 个字符"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const message = ref('')
</script>
```

:::

### 简洁模式（不显示底部操作栏）

去掉底部操作栏和字符计数，获得更简洁的输入框：

:::demo

```vue
<template>
  <AiInput
    v-model="message"
    :show-footer="false"
    placeholder="简洁模式"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const message = ref('')
</script>
```

:::

### 固定高度（不自动调整高度）

关闭自动高度调整，设置固定高度：

:::demo

```vue
<template>
  <AiInput
    v-model="message"
    :auto-resize="false"
    style="height: 100px"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const message = ref('')
</script>
```

:::

## 组合场景

### 完整对话界面示例

结合 AiMessage 组件，实现一个完整的对话界面：

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px; margin: 0 auto;">
    <!-- 消息列表 -->
    <div
      style="border: 1px solid var(--ai-border-color); border-radius: 8px; padding: 12px; min-height: 200px; max-height: 400px; overflow-y: auto;"
    >
      <AiMessage
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        :show-timestamp="true"
        :timestamp="msg.timestamp"
      />
    </div>

    <!-- 输入框 -->
    <AiInput
      v-model="inputValue"
      placeholder="输入消息，按 Enter 发送，Shift + Enter 换行..."
      @submit="handleSend"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const inputValue = ref('')
const messages = ref([
  {
    id: 1,
    role: 'assistant',
    content: '你好！我是 AI 助手，有什么可以帮你的吗？',
    timestamp: '10:30'
  }
])

const handleSend = () => {
  if (!inputValue.value.trim()) return

  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: inputValue.value,
    timestamp: new Date().toLocaleTimeString().slice(0, 5)
  })
  inputValue.value = ''
}
</script>
```

:::

### 结合 AI 加载状态

在 AI 生成回复时，显示加载状态：

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
    <AiMessage
      v-for="msg in messages"
      :key="msg.id"
      :role="msg.role"
      :content="msg.content"
    >
      <template #default v-if="msg.loading">
        <AiLoader type="typing" text="AI 正在思考..." />
      </template>
    </AiMessage>

    <AiInput
      v-model="inputValue"
      :disabled="isLoading"
      placeholder="输入问题..."
      @submit="handleAsk"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"

const inputValue = ref('')
const isLoading = ref(false)
const messages = ref([
  { id: 1, role: 'assistant', content: '你好，请提问' }
])

const handleAsk = () => {
  if (!inputValue.value.trim()) return

  // 添加用户消息
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: inputValue.value
  })

  // 添加 AI 加载状态消息
  const aiMsgId = Date.now() + 1
  messages.value.push({
    id: aiMsgId,
    role: 'assistant',
    loading: true
  })

  isLoading.value = true
  inputValue.value = ''

  // 模拟 AI 回复延迟
  setTimeout(() => {
    const index = messages.value.findIndex(m => m.id === aiMsgId)
    if (index > -1) {
      messages.value[index].content = '这是 AI 的回复内容'
      messages.value[index].loading = false
    }
    isLoading.value = false
  }, 2000)
}
</script>
```

:::

## 键盘快捷键

| 快捷键 | 功能 |
|---------|------|
| `Enter`（不按 Shift） | 触发 `submit` 事件提交内容 |
| `Shift + Enter` | 插入换行符 |
| `Escape` | 触发 `cancel` 事件取消输入 |

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 输入框的值（支持 v-model） | `string` | `''` |
| placeholder | 占位符文本 | `string` | `'输入内容...'` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| maxlength | 最大输入长度 | `number` | - |
| showFooter | 是否显示底部操作栏 | `boolean` | `true` |
| showCharCount | 是否显示字符计数 | `boolean` | `true` |
| autofocus | 是否自动聚焦 | `boolean` | `false` |
| autoResize | 是否自动调整高度 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 输入内容更新 | `value: string` |
| submit | 用户按下 Enter 提交 | - |
| cancel | 用户按下 Escape 取消 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| actions | 底部操作栏自定义内容 |

## 主题定制

使用 CSS 变量自定义样式：

```css
.ai-input {
  --ai-border-color: #e5e7eb;
  --ai-primary-color: #6366f1;
  --ai-bg-color: #fff;
  --ai-text-color: #1f2937;
  --ai-text-secondary: #6b7280;
}
```
