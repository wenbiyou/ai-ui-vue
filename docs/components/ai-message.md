# AiMessage

消息气泡组件，专为 AI 对话场景设计，支持用户/AI/系统三种角色，可配置头像、时间戳和 Markdown 渲染。

## 基础用法

### AI 助手消息（默认）

:::demo

```vue
<template>
  <AiMessage
    role="assistant"
    content="你好！我是 AI 助手，有什么可以帮你的吗？"
  />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

### 用户消息

:::demo

```vue
<template>
  <AiMessage
    role="user"
    content="这是用户发送的消息"
  />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

### 系统消息

:::demo

```vue
<template>
  <AiMessage
    role="system"
    content="这是一条系统通知消息"
  />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

## 配置选项

### 带时间戳

显示消息发送时间：

:::demo

```vue
<template>
  <AiMessage
    role="assistant"
    content="这条消息带有时间戳"
    :show-timestamp="true"
    timestamp="10:30"
  />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

### 隐藏头像

不需要显示头像时：

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <AiMessage
      role="system"
      content="系统提示：对话已清空"
      :show-avatar="false"
    />
    <AiMessage
      role="assistant"
      content="这条消息也隐藏了头像"
      :show-avatar="false"
    />
  </div>
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

### 自定义头像

使用自定义头像内容：

:::demo

```vue
<template>
  <AiMessage role="user">
    <template #avatar>
      <div
        style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;"
      >
        W
      </div>
    </template>
  </AiMessage>
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

## 内容展示

### Markdown 内容

AiMessage 内部使用 AiMarkdown 渲染内容，支持完整 Markdown 语法：

:::demo

```vue
<template>
  <AiMessage
    role="assistant"
    :content="content"
  />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const content = `
# Vue3 核心特性

## 组合式 API

- **更好的类型推断**：TypeScript 友好
- **更灵活的代码组织**：按逻辑组织代码
- **更好的代码复用**：逻辑抽离到组合式函数

## 示例代码

\`\`\`javascript
const { ref, computed } = Vue

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    return { count, double }
  }
}
\`\`\`

| 特性 | Options API | Composition API |
|------|-------------|-----------------|
| 类型推断 | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 代码组织 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 逻辑复用 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
`
</script>
```

:::

### 长文本换行

自动处理长文本换行：

:::demo

```vue
<template>
  <AiMessage
    role="assistant"
    content="Vue3 是一款用于构建用户界面的 JavaScript 框架，它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。"
  />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

### 自定义内容插槽

使用默认插槽自定义消息内容：

:::demo

```vue
<template>
  <AiMessage role="assistant">
    <template #default>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>👍 我已收到你的消息</span>
        <button style="padding: 4px 8px; border: 1px solid var(--ai-primary-color); border-radius: 4px; background: white; cursor: pointer;">
          重新生成
        </button>
      </div>
    </template>
  </AiMessage>
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

## 组合场景

### 完整对话列表

展示多轮对话：

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
    <AiMessage
      role="assistant"
      content="你好！我是 AI 助手，有什么可以帮助你的吗？"
      :show-timestamp="true"
      timestamp="10:30"
    />

    <AiMessage
      role="user"
      content="请介绍一下 Vue3 的组合式 API"
      :show-timestamp="true"
      timestamp="10:31"
    />

    <AiMessage
      role="assistant"
      content="组合式 API 是 Vue3 引入的一种新的代码组织方式，它提供了更灵活的逻辑复用和更好的类型推断支持。主要优点包括：\n\n1. 更好的类型推断\n2. 更灵活的代码组织\n3. 更容易抽出和复用逻辑\n4. 对 TypeScript 支持更好"
      :show-timestamp="true"
      timestamp="10:32"
    />
  </div>
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

### AI 正在生成中（流式输出）

在流式对话中，结合 AiLoader 显示加载状态：

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
    <AiMessage
      role="user"
      content="帮我写一个简单的 HelloWorld 组件"
    />

    <AiMessage role="assistant">
      <template #default>
        <AiLoader type="typing" text="AI 正在生成代码..." />
      </template>
    </AiMessage>
  </div>
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'
</script>
```

:::

### 流式渲染逐步输出

在 SSE 流式输出过程中，逐步更新内容：

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
    <AiMessage
      role="user"
      content="讲一个短笑话"
    />

    <AiMessage
      role="assistant"
      :content="content"
    >
      <template #default v-if="isLoading">
        <AiLoader type="typing" text="正在思考..." />
      </template>
    </AiMessage>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const content = ref('')
const isLoading = ref(true)

onMounted(() => {
  const text = '为什么程序员总是分不清万圣节和圣诞节？因为 31 OCT = 25 DEC'
  let i = 0
  const timer = setInterval(() => {
    content.value += text[i]
    i++
    if (i >= text.length) {
      clearInterval(timer)
      isLoading.value = false
    }
  }, 100)
})
</script>
```

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| role | 消息角色 | `'user' \| 'assistant' \| 'system'` | `'assistant'` |
| content | 消息内容（自动支持 Markdown 渲染） | `string` | - |
| showAvatar | 是否显示头像 | `boolean` | `true` |
| showTimestamp | 是否显示时间戳 | `boolean` | `false` |
| timestamp | 消息时间（支持 Date 或字符串） | `Date \| string` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| avatar | 自定义头像内容 |
| default | 自定义消息内容（覆盖 content） |

## 主题定制

```css
.ai-message {
  --ai-user-bg: #6366f1;
  --ai-user-text: #fff;
  --ai-assistant-bg: #f3f4f6;
  --ai-assistant-text: #1f2937;
  --ai-system-bg: #fffbeb;
  --ai-system-text: #92400e;
  --ai-avatar-size: 36px;
}
```
