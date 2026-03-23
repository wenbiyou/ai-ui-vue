# Ai UI Vue

> Vue3 AI 应用专用组件库，专注于流式对话、智能表单、Markdown 渲染等 AI 场景

## ✨ 特性

- 🎯 **场景聚焦** - 专为 AI 应用设计
- ⚡ **流式处理** - 内置 SSE/WebSocket 支持
- 🎨 **主题系统** - CSS 变量，轻松定制
- 💻 **TypeScript** - 完整类型支持
- ✅ **测试覆盖** - 单元测试保障质量

## 📦 安装

\`\`\`bash
npm install ai-ui-vue
\`\`\`

## 🚀 快速开始

\`\`\`vue
<script setup>
import { AiInput, AiMessage, AiMarkdown, AiLoader } from 'ai-ui-vue'
import { ref } from 'vue'

const message = ref('')
const isLoading = ref(false)

const handleSubmit = () => {
  console.log('Message:', message.value)
  isLoading.value = true
  // 发送消息到 AI API
}
</script>

<template>
  <div>
    <AiMessage
      role="assistant"
      content="Hello! How can I help you today?"
    />
    
    <AiInput
      v-model="message"
      :loading="isLoading"
      @submit="handleSubmit"
    />
    
    <AiLoader v-if="isLoading" type="typing" text="Thinking..." />
  </div>
</template>
\`\`\`

## 🧩 组件列表

### 核心

| 组件 | 说明 |
|------|------|
| **AiInput** | Prompt 输入框，支持自动调整高度、字符计数 |
| **AiMessage** | 消息气泡，支持用户/AI/系统角色 |
| **AiLoader** | 加载状态，支持 dots、spinner、typing 三种样式 |
| **AiMarkdown** | Markdown 渲染，内置代码高亮 |

### 开发中

- [ ] AiChat - 完整流式对话组件
- [ ] SmartForm - AI 辅助表单
- [ ] StreamChart - 实时图表
- [ ] TokenCounter - Token 计数与成本估算

## 📄 文档

[在线文档](https://wenbiyou.github.io/ai-ui-vue)

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 许可证

[MIT](./LICENSE)

## 👨‍💻 作者

[@wenbiyou](https://github.com/wenbiyou)
