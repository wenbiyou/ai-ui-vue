# Ai UI Vue

Vue3 AI 应用专用组件库，专注于流式对话、智能表单、Markdown 渲染等 AI 场景。

## 特性

- 专为 AI 应用设计
- 内置 SSE/WebSocket 支持
- CSS 变量，轻松定制主题
- 完整 TypeScript 类型支持
- 单元测试保障质量

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

- [AiInput](/components/ai-input.html) - Prompt 输入框
- [AiMessage](/components/ai-message.html) - 消息气泡
- [AiLoader](/components/ai-loader.html) - 加载状态
- [AiMarkdown](/components/ai-markdown.html) - Markdown 渲染

### 开发中

- AiChat - 完整流式对话组件
- SmartForm - AI 辅助表单
- StreamChart - 实时图表
- TokenCounter - Token 计数与成本估算

## 文档

- [快速开始](/guide/getting-started.html) - 快速开始
- [项目结构](/guide/structure.html) - 项目结构
- [贡献指南](../CONTRIBUTING.md) - 贡献指南

## 贡献

欢迎贡献！请查看 [贡献指南](../CONTRIBUTING.md)

## 许可证

[MIT](../LICENSE)

## 作者

[@wenbiyou](https://github.com/wenbiyou)

---

[查看 GitHub 仓库](https://github.com/wenbiyou/ai-ui-vue)
