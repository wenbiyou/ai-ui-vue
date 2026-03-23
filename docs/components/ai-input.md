# AiInput

Prompt 输入框，支持自动调整高度、字符计数、键盘快捷键。

## 基础用法

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
import AiInput from 'ai-ui-vue'

const message = ref('')

const handleSubmit = () => {
  console.log('提交:', message.value)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 输入框的值（v-model） | `string` | `''` |
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
| submit | 提交（按 Enter，不按 Shift） | - |
| cancel | 取消（按 Escape） | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| actions | 底部操作栏自定义内容 |

## 示例

### 基础用法

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
import AiInput from 'ai-ui-vue'

const message = ref('')

const handleSubmit = () => {
  console.log('提交:', message.value)
}
</script>
```

### 禁用状态

```vue
<template>
  <AiInput
    v-model="message"
    disabled
    placeholder="输入框已禁用"
  />
</template>
```

### 只读状态

```vue
<template>
  <AiInput
    v-model="message"
    readonly
  />
</template>
```

### 自动聚焦

```vue
<template>
  <AiInput
    v-model="message"
    autofocus
    placeholder="输入框已自动聚焦"
  />
</template>
```

### 带自定义操作栏

```vue
<template>
  <AiInput v-model="message">
    <template #actions>
      <button @click="handleClear">清空</button>
      <button @click="handleSubmit">发送</button>
    </template>
  </AiInput>
</template>
```

### 限制字符数

```vue
<template>
  <AiInput
    v-model="message"
    :maxlength="100"
    :show-char-count="true"
    placeholder="最多输入 100 个字符"
  />
</template>
```

### 不显示底部操作栏

```vue
<template>
  <AiInput
    v-model="message"
    :show-footer="false"
    placeholder="简洁模式"
  />
</template>
```

### 不自动调整高度

```vue
<template>
  <AiInput
    v-model="message"
    :auto-resize="false"
    style="height: 100px"
  />
</template>
```

### 键盘快捷键

- `Enter`（不按 Shift）- 触发 submit 事件
- `Shift + Enter` - 换行
- `Escape` - 触发 cancel 事件

### 完整对话输入示例

```vue
<template>
  <div class="chat-container">
    <div class="messages">
      <AiMessage
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
      />
    </div>
    <AiInput
      v-model="inputValue"
      placeholder="输入消息，按 Enter 发送..."
      @submit="handleSend"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage } from 'ai-ui-vue'

const inputValue = ref('')
const messages = ref([
  { id: 1, role: 'assistant', content: '你好！有什么可以帮你的吗？' }
])

const handleSend = () => {
  if (!inputValue.value.trim()) return
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: inputValue.value
  })
  inputValue.value = ''
  // 处理 AI 回复...
}
</script>
```

## 主题定制

使用 CSS 变量自定义样式：

```css
.ai-input {
  --ai-border-color: #e5e7eb;
  --ai-primary-color: #6366f1;
  --ai-bg-color: #fff;
  --ai-text-color: #1f2937;
}
```
