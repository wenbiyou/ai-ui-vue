# AiMessage

消息气泡组件，支持用户/AI/系统三种角色，可配置头像和时间戳。

## 基础用法

```vue
<template>
  <AiMessage
      role="assistant"
      content="这是 AI 的回复消息"
    />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| role | 消息角色 | `'user' \| 'assistant' \| 'system'` | `'assistant'` |
| content | 消息内容（支持 Markdown） | `string` | - |
| showAvatar | 是否显示头像 | `boolean` | `true` |
| showTimestamp | 是否显示时间戳 | `boolean` | `false` |
| timestamp | 消息时间 | `Date \| string` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| avatar | 自定义头像内容 |
| default | 自定义消息内容 |

## 示例

### 用户消息

```vue
<AiMessage
  role="user"
  content="这是用户的消息"
/>
```

### 系统消息

```vue
<AiMessage
  role="system"
  content="这是一个系统通知"
/>
```

### 带时间戳

```vue
<AiMessage
  role="assistant"
  content="这条消息有时间戳"
  :show-timestamp="true"
  :timestamp="new Date()"
/>
```

### 自定义头像

```vue
<AiMessage role="user">
  <template #avatar>
    <img src="/avatar.jpg" />
  </template>
</AiMessage>
```

### Markdown 内容

```vue
<AiMessage
  role="assistant"
  content="# 标题\n\n这是一段**加粗**文字。"
/>
```
