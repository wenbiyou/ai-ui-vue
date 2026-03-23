# 快速开始

## 安装

### NPM 安装

```bash
npm install ai-ui-vue
```

### Yarn 安装

```bash
yarn add ai-ui-vue
```

### PNPM 安装

```bash
pnpm add ai-ui-vue
```

## 引入组件

### 按需引入

```vue
<script setup>
import { AiInput } from 'ai-ui-vue'
</script>
```

### 全量引入

```vue
<script setup>
import AiUiVue from 'ai-ui-vue'
</script>

<template>
  <AiUiVue.AiInput />
  <AiUiVue.AiMessage />
  <AiUiVue.AiLoader />
</template>
```

## 第一个例子

创建一个简单的聊天界面：

```vue
<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader } from 'ai-ui-vue'

const message = ref('')
const isLoading = ref(false)
const messages = ref([
  { role: 'assistant', content: '你好！我是 AI 助手，有什么可以帮你？' }
])

const handleSubmit = () => {
  if (!message.value.trim()) return
  
  messages.value.push({
    role: 'user',
    content: message.value
  })
  
  isLoading.value = true
  
  // 调用 AI API
  // mockAIResponse(message.value)
}

const mockAIResponse = (userMessage) => {
  setTimeout(() => {
    messages.value.push({
      role: 'assistant',
      content: `我收到了你的消息："${userMessage}"`
    })
    isLoading.value = false
    message.value = ''
  }, 1000)
}
</script>

<template>
  <div class="chat-container">
    <div
      v-for="(msg, index) in messages"
      :key="index"
      class="message-wrapper"
    >
      <AiMessage
        :role="msg.role"
        :content="msg.content"
      />
    </div>
    
    <AiLoader v-if="isLoading" type="typing" />
    
    <AiInput
      v-model="message"
      placeholder="输入你的问题..."
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.message-wrapper {
  margin-bottom: 16px;
}
</style>
```

## 配置主题

通过 CSS 变量自定义主题：

```css
:root {
  --ai-primary-color: #6366f1;
  --ai-border-color: #e5e7eb;
  --ai-bg-color: #fff;
  --ai-text-color: #1f2937;
  --ai-text-secondary: #6b7280;
}
```

## 下一步

- 查看 [组件文档](/components/) 了解每个组件的详细用法
- 查看 [开发指南](/development.md) 了解如何参与开发
