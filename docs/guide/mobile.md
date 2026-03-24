# 移动端适配

Ai UI Vue 从设计之初就考虑了移动端适配，所有组件都支持响应式布局，可以在手机、平板等小屏设备上正常使用。

## 适配特性

| 特性 | 说明 |
|------|------|
| 流式布局 | 使用百分比和弹性布局，自动适应屏幕宽度 |
| 触摸友好 | 点击区域最小 44px，符合移动端设计规范 |
| 自动折行 | 文本内容自动折行，不会超出屏幕 |
| 适配viewport | 支持 meta viewport 设置，适配视网膜屏幕 |

## 完整移动端对话示例

下面是一个完整的移动端对话界面示例，你可以在浏览器开发者工具中切换到手机模式查看效果：

:::demo

```vue
<template>
  <div class="mobile-demo">
    <div class="mobile-demo__header">
      <span class="mobile-demo__back">←</span>
      <span class="mobile-demo__title">AI 对话</span>
      <span></span>
    </div>

    <div class="mobile-demo__messages">
      <AiMessage
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        :show-timestamp="true"
        :timestamp="msg.timestamp"
      />
      <div v-if="loading" class="mobile-demo__loading">
        <AiLoader type="typing" />
      </div>
    </div>

    <div class="mobile-demo__input">
      <AiInput
        v-model="inputValue"
        :disabled="loading"
        :show-char-count="true"
        placeholder="输入消息..."
        @submit="handleSend"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue"

const inputValue = ref('')
const loading = ref(false)
const messages = ref([
  {
    id: 1,
    role: 'assistant',
    content: '你好！我是 AI 助手，在移动端上也能完美对话哦～',
    timestamp: '10:30'
  }
])

const handleSend = () => {
  if (!inputValue.value.trim() || loading.value) return

  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: inputValue.value,
    timestamp: new Date().toLocaleTimeString().slice(0, 5)
  })
  inputValue.value = ''
}
</script>

<style scoped>
.mobile-demo {
  display: flex;
  flex-direction: column;
  height: 500px;
  max-width: 375px;
  margin: 0 auto;
  border: 1px solid var(--ai-border-color);
  border-radius: 12px;
  overflow: hidden;
  background: var(--ai-bg-color);
}

.mobile-demo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--ai-border-color);
  background: var(--ai-bg-color);
}

.mobile-demo__back {
  font-size: 20px;
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-demo__title {
  font-size: 16px;
  font-weight: 500;
}

.mobile-demo__messages {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.mobile-demo__loading {
  padding: 8px 12px;
}

.mobile-demo__input {
  padding: 8px 12px;
  border-top: 1px solid var(--ai-border-color);
  background: var(--ai-bg-color);
}
</style>

:::

## 组件移动端适配详情

### AiInput

- ✅ 最小高度 60px，适合触摸输入
- ✅ 自动增长高度，在小屏上不会超出
- ✅ 内边距适配移动端点击
- ✅ 字体大小 14px，适合手机阅读

### AiMessage

- ✅ 最大宽度 70%，在手机上自动适配不会占满全屏
- ✅ 气泡内边距自适应
- ✅ 文本自动折行
- ✅ 时间戳字体大小适配小屏

### AiLoader

- ✅ 动画尺寸自适应
- ✅ 在小屏上保持正确比例

### AiMarkdown

- ✅ 代码块支持横向滚动
- ✅ 图片自动缩放不超出屏幕
- ✅ 列表缩进适配小屏

## 移动端最佳实践

### 1. 设置正确的 viewport

在你的 HTML `head` 中添加：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 2. 触摸区域优化

Ai UI Vue 组件内部已经处理好了最小点击区域，满足苹果人机交互指南（最小 44px）。

### 3. 键盘弹出遮挡

在移动端 SPA 中，可以使用 CSS 解决键盘遮挡问题：

```css
/* 让输入框在键盘弹出时保持可见 */
@media (max-width: 768px) {
  .chat-container {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

### 4. 安全区域适配

适配 iPhone 刘海屏和底部操作条：

```css
.chat-input {
  padding-bottom: env(safe-area-inset-bottom);
}
```

## 断点推荐

| 断点 | 设备 | 适配建议 |
|------|------|---------|
| < 768px | 手机 | 单栏布局，消息占满 85% 宽度 |
| 768px - 1024px | 平板 | 保持现有布局 |
| > 1024px | 桌面 | 完整布局 |

## CSS 媒体查询示例

```css
/* 移动端特定调整 */
@media (max-width: 768px) {
  .ai-message {
    padding: 8px;
  }

  .ai-input__textarea {
    min-height: 50px;
  }
}
```

所有组件默认已经适配，大多数情况下不需要额外调整。
