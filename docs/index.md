---
# Ai UI Vue

Vue3 AI 应用专用组件库，专注于流式对话、智能表单、Markdown 渲染等 AI 场景。

该库专为 AI 应用设计，内置 SSE/WebSocket 支持，使用 CSS 变量可轻松定制主题。提供完整的 TypeScript 类型支持，并通过单元测试保障代码质量。

## 快速开始

### 安装

```bash
npm install ai-ui-vue
```

### 引入组件

```vue
<script setup>
import { AiInput, AiMessage, AiLoader } from 'ai-ui-vue'
</script>

<template>
  <div>
    <AiMessage role="assistant" content="Hello!" />
    <AiInput placeholder="输入内容..." />
    <AiLoader type="typing" text="Thinking..." />
  </div>
</template>
```

## 组件列表

### 核心

- [AiInput](/components/ai-input.md) - Prompt 输入框
- [AiMessage](/components/ai-message.md) - 消息气泡
- [AiLoader](/components/ai-loader.md) - 加载状态
- [AiMarkdown](/components/ai-markdown.md) - Markdown 渲染

### 开发中

- AiChat - 完整流式对话组件
- SmartForm - AI 辅助表单
- StreamChart - 实时图表
- TokenCounter - Token 计数与成本估算

## 文档

- [快速开始](/guide/getting-started.md)
- [项目结构](/guide/structure.md)
- [贡献指南](../CONTRIBUTING.md)

## 贡献

欢迎贡献！请查看 [贡献指南](../CONTRIBUTING.md)

## 许可证

[MIT](../LICENSE)

## 作者

[@wenbiyou](https://github.com/wenbiyou)

---

[查看 GitHub 仓库](https://github.com/wenbiyou/ai-ui-vue)
