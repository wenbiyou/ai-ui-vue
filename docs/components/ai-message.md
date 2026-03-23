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
    <img src="/avatar.jpg" alt="头像" />
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

### 对话列表使用

```vue
<template>
  <div class="chat-list">
    <AiMessage
      role="user"
      content="你好，请给我介绍一下Vue3的新特性"
      :show-timestamp="true"
      :timestamp="'10:30"
    />
    <AiMessage
      role="assistant"
      :content="aiReply"
      :show-timestamp="true"
      :timestamp="'10:31"
    />
  </div>
</template>
```

### 流式渲染中使用 AiLoader

当 AI 正在生成回复时，可以结合 AiLoader：

```vue
<template>
  <AiMessage role="assistant">
    <template #default>
      <AiLoader type="typing" text="AI 正在思考..." />
    </template>
  </AiMessage>
</template>
```

### 隐藏头像

不需要显示头像时：

```vue
<AiMessage
  role="system"
  content="系统提示：对话已清空"
  :show-avatar="false"
/>
```
