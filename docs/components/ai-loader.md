# AiLoader

加载状态组件，提供三种不同的加载动画样式，专为 AI 对话场景中的加载状态设计。

## 基础用法

:::demo

```vue
<template>
  <AiLoader type="typing" text="AI 正在思考..." />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";
</script>
```

:::

## 不同动画类型

### 打字机效果（typing）

打字机光标闪烁效果，**推荐用于 AI 思考/生成回复场景**：

:::demo

```vue
<template>
  <AiLoader type="typing" text="AI 正在生成回复..." />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";
</script>
```

:::

### 圆点跳动效果（dots）

简洁的三点跳动效果，适合轻量加载场景：

:::demo

```vue
<template>
  <AiLoader type="dots" />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";
</script>
```

:::

### 旋转加载效果（spinner）

传统旋转动画，适合长时间处理加载：

:::demo

```vue
<template>
  <AiLoader type="spinner" text="数据加载中..." />
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";
</script>
```

:::

## 不同尺寸

### 尺寸对比

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; align-items: center; gap: 20px;">
      <AiLoader type="typing" size="small" text="Small" />
    </div>
    <div style="display: flex; align-items: center; gap: 20px;">
      <AiLoader type="typing" size="medium" text="Medium" />
    </div>
    <div style="display: flex; align-items: center; gap: 20px;">
      <AiLoader type="typing" size="large" text="Large" />
    </div>
  </div>
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";
</script>
```

:::

### 三种类型不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #6b7280;">
        typing 三种尺寸
      </div>
      <div style="display: flex; gap: 20px; align-items: center;">
        <AiLoader type="typing" size="small" />
        <AiLoader type="typing" size="medium" />
        <AiLoader type="typing" size="large" />
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #6b7280;">
        dots 三种尺寸
      </div>
      <div style="display: flex; gap: 20px; align-items: center;">
        <AiLoader type="dots" size="small" />
        <AiLoader type="dots" size="medium" />
        <AiLoader type="dots" size="large" />
      </div>
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #6b7280;">
        spinner 三种尺寸
      </div>
      <div style="display: flex; gap: 20px; align-items: center;">
        <AiLoader type="spinner" size="small" />
        <AiLoader type="spinner" size="medium" />
        <AiLoader type="spinner" size="large" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";
</script>
```

:::

## 不显示文本

只显示加载动画，不显示文本：

:::demo

```vue
<template>
  <div style="display: flex; gap: 30px; align-items: center;">
    <AiLoader type="typing" size="medium" />
    <AiLoader type="dots" size="medium" />
    <AiLoader type="spinner" size="medium" />
  </div>
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";
</script>
```

:::

## 组合场景

### 在 AiMessage 消息框中使用（AI 生成中）

在流式对话中，AI 正在生成回复时显示加载状态：

:::demo

```vue
<template>
  <div style="max-width: 600px;">
    <AiMessage role="user" content="帮我写一段 Vue3 的示例代码" />
    <AiMessage role="assistant">
      <template #default>
        <AiLoader type="typing" text="AI 正在生成代码..." />
      </template>
    </AiMessage>
  </div>
</template>

<script setup>
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";
</script>
```

:::

### 在按钮中使用

表单提交按钮中的加载状态：

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <button
      style="padding: 8px 16px; border-radius: 6px; border: 1px solid #e5e7eb; background: white; min-width: 100px;"
      :disabled="loading1"
      @click="toggleLoading('loading1')"
    >
      <template v-if="loading1">
        <AiLoader type="spinner" size="small" />
        <span style="margin-left: 6px;">提交中</span>
      </template>
      <span v-else>点击提交</span>
    </button>

    <button
      style="padding: 8px 16px; border-radius: 6px; border: none; background: #152de6; color: white; min-width: 100px;"
      :disabled="loading2"
      @click="toggleLoading('loading2')"
    >
      <template v-if="loading2">
        <AiLoader type="spinner" size="small" />
        <span style="margin-left: 6px;">发送中</span>
      </template>
      <span v-else>发送消息</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";

const loading1 = ref(false);
const loading2 = ref(false);

const toggleLoading = (field) => {
  if (field === "loading1") {
    loading1.value = true;
    setTimeout(() => (loading1.value = false), 2000);
  } else {
    loading2.value = true;
    setTimeout(() => (loading2.value = false), 2000);
  }
};
</script>
```

:::

### 在卡片加载中使用

内容卡片骨架加载：

:::demo

```vue
<template>
  <div
    style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; width: 300px;"
  >
    <div
      v-if="loading"
      style="display: flex; justify-content: center; padding: 40px;"
    >
      <AiLoader type="spinner" size="large" />
    </div>
    <div v-else>
      <h3 style="margin: 0 0 8px 0;">AI 组件库</h3>
      <p style="margin: 0; color: #6b7280;">
        Vue3 AI 应用专用组件库，专注于流式对话、智能表单、Markdown 渲染等 AI
        场景。
      </p>
    </div>
    <button
      style="margin-top: 16px; padding: 6px 12px; border: 1px solid #e5e7eb; border-radius: 4px; background: white; cursor: pointer;"
      @click="loading = !loading"
    >
      {{ loading ? "显示内容" : "重新加载" }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";

const loading = ref(true);
</script>
```

:::

### 模拟流式对话加载

完整的用户提问 → AI 加载 → AI 回复流程：

:::demo

```vue
<template>
  <div
    style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;"
  >
    <AiMessage
      v-for="msg in messages"
      :key="msg.id"
      :role="msg.role"
      :content="msg.content"
    >
      <template #default v-if="msg.loading">
        <AiLoader type="typing" text="AI 正在思考..." />
      </template>
    </AiMessage>

    <div v-if="!isCompleted" style="margin-top: 8px;">
      <button
        style="padding: 8px 16px; border-radius: 6px; border: 1px solid #6366f1; background: #6366f1; color: white; cursor: pointer;"
        @click="simulateStream"
      >
        重新模拟对话
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue";

const messages = ref([
  { id: 1, role: "user", content: "你好，请介绍一下你自己" },
]);
const isCompleted = ref(false);

const simulateStream = () => {
  messages.value = [{ id: 1, role: "user", content: "你好，请介绍一下你自己" }];
  isCompleted.value = false;

  // 添加加载状态
  const aiId = Date.now();
  messages.value.push({
    id: aiId,
    role: "assistant",
    loading: true,
  });

  // 模拟延迟后回复
  setTimeout(() => {
    const index = messages.value.findIndex((m) => m.id === aiId);
    if (index > -1) {
      messages.value[index].loading = false;
      messages.value[index].content =
        "我是 Ai UI Vue，一个专门为 AI 应用设计的 Vue3 组件库。我提供了 AiInput、AiMessage、AiLoader、AiMarkdown 等核心组件，帮助你快速搭建 AI 对话应用。";
    }
    isCompleted.value = true;
  }, 2500);
};

// 初始加载
simulateStream();
</script>
```

:::

## API

### Props

| 参数 | 说明         | 类型                              | 默认值     |
| ---- | ------------ | --------------------------------- | ---------- |
| type | 加载动画类型 | `'dots' \| 'spinner' \| 'typing'` | `'typing'` |
| text | 加载提示文本 | `string`                          | -          |
| size | 组件尺寸     | `'small' \| 'medium' \| 'large'`  | `'medium'` |

## 选择指南

| 类型      | 适用场景           | 特点                         |
| --------- | ------------------ | ---------------------------- |
| `typing`  | AI 思考/生成回复中 | 打字机光标效果，对话场景推荐 |
| `dots`    | 数据加载中         | 简洁圆点跳动，占用空间小     |
| `spinner` | 长时间处理操作     | 传统旋转动画，用户熟悉       |

## 主题定制

```css
.ai-loader {
  --ai-loader-color: #6366f1;
}
```
