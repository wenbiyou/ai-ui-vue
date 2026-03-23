# 快速开始

## 安装

### npm 安装

```bash
npm install ai-ui-vue
```

### yarn 安装

```bash
yarn add ai-ui-vue
```

### pnpm 安装

```bash
pnpm add ai-ui-vue
```

## 引入组件

按需引入单个组件：

```vue
<script setup>
import { AiInput } from 'ai-ui-vue'
</script>
```

或者全局引入所有组件：

```vue
<script setup>
import AiUiVue from 'ai-ui-vue'
</script>

<template>
  <div>
    <AiUiVue.AiInput />
    <AiUiVue.AiMessage />
    <AiUiVue.AiLoader />
  </div>
</template>
```

## 第一个例子

创建一个简单的聊天界面：

## 组件

- AiInput（输入框）
- AiMessage（消息气泡）
- AiLoader（加载状态）

功能：
- 用户发送消息
- AI 回复（模拟）
- 显示加载状态

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
- 查看 [贡献指南](../CONTRIBUTING.md) 了解如何参与开发
