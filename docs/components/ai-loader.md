# AiLoader

加载状态组件，提供三种不同的加载动画样式。

## 基础用法

```vue
<template>
  <AiLoader type="typing" text="AI 正在思考..." />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 加载动画类型 | `'dots' \| 'spinner' \| 'typing'` | `'typing'` |
| text | 加载提示文本 | `string` | - |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |

## 示例

### 打字机效果

```vue
<AiLoader type="typing" text="AI 正在生成..." />
```

### 圆点效果

```vue
<AiLoader type="dots" />
```

### 旋转效果

```vue
<AiLoader type="spinner" text="处理中..." />
```

### 不显示文本

```vue
<AiLoader type="typing" />
```

### 尺寸调整

```vue
<div style="display: flex; gap: 10px; align-items: center;">
  <AiLoader type="typing" size="small" text="Small" />
  <AiLoader type="typing" size="medium" text="Medium" />
  <AiLoader type="typing" size="large" text="Large" />
</div>
```

### 不同类型对比

```vue
<div style="display: flex; flex-direction: column; gap: 20px;">
  <AiLoader type="typing" text="typing - AI 思考中..." />
  <AiLoader type="dots" />
  <AiLoader type="spinner" text="spinner - 加载中..." />
</div>
```

### 在 AI 消息框中使用

结合 AiMessage 在流式对话中使用：

```vue
<template>
  <AiMessage role="assistant">
    <template #default>
      <AiLoader type="typing" text="AI 正在生成回复..." />
    </template>
  </AiMessage>
</template>
```

### 在按钮中使用

```vue
<template>
  <button :disabled="loading">
    <AiLoader v-if="loading" type="spinner" size="small" />
    <span v-else>提交</span>
  </button>
</template>
```

## 样式选择指南

| 类型 | 适用场景 | 特点 |
|------|----------|------|
| `typing` | AI 思考/生成中 | 打字机光标效果，适合对话场景 |
| `dots` | 数据加载中 | 简洁圆点跳动，占空间小 |
| `spinner` | 长时间处理 | 旋转动画，传统加载样式 |

