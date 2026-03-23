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

### 带操作栏

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
  />
</template>
```

### 键盘快捷键

- `Enter`（不按 Shift）- 触发 submit 事件
- `Shift + Enter` - 换行
- `Escape` - 触发 cancel 事件

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
