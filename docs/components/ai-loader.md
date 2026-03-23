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
<div style="display: flex; gap: 10px;">
  <AiLoader type="typing" size="small" text="Small" />
  <AiLoader type="typing" size="medium" text="Medium" />
  <AiLoader type="typing" size="large" text="Large" />
</div>
```

## 样式说明

- `typing` - 打字机动画，适合 AI 思考场景
- `dots` - 三个圆点跳动，适合数据加载
- `spinner` - 旋转动画，适合长时间处理
