# AiMarkdown

Markdown 渲染组件，内置代码高亮，支持多种语言。

## 基础用法

```vue
<template>
  <AiMarkdown :content="markdownText" />
</template>

<script setup>
import { ref } from 'vue'

const markdownText = ref(`
# 标题

这是一段**加粗**文字和一段*斜体*文字。

## 代码高亮

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`
`)
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | Markdown 文本 | `string` | - |
| breaks | 是否启用换行 | `boolean` | `true` |
| gfm | 是否启用 GitHub Flavored Markdown | `boolean` | `true` |

## 支持的 Markdown 语法

- 标题（H1-H6）
- 段落
- 列表（有序、无序）
- 代码块（带语言高亮）
- 行内代码
- 粗体、斜体
- 表格
- 链接
- 引用块
- 分割线

## 支持的代码语言

- JavaScript
- TypeScript
- Python
- HTML
- CSS
- JSON
- XML
- Shell
- SQL

更多语言通过 highlight.js 自动识别。

## 示例

### 表格

```vue
<AiMarkdown :content="tableText" />

<script setup>
const tableText = ref(`
| 姓名 | 年龄 | 职业 |
|------|------|------|
| 张三 | 25 | 前端工程师 |
| 李四 | 30 | 后端工程师 |
`)
</script>
```

### 代码高亮

```vue
<AiMarkdown :content="codeText" />

<script setup>
const codeText = ref(`
\`\`\`javascript
const count = 0;
const increment = () => count++;
\`\`\`
`)
</script>
```

### 任务列表

```vue
<AiMarkdown :content="listText" />

<script setup>
const listText = ref(`
- 第一步
- 第二步
- 第三步
- [x] 已完成
`)
</script>
```

### 引用块

```vue
<AiMarkdown :content="quoteText" />

<script setup>
const quoteText = ref(`
> 这是一段引用文本
> - 作者：Unknown
`)
</script>
```

### 链接和图片

```vue
<AiMarkdown :content="linkText" />

<script setup>
const linkText = ref(`
欢迎访问 [GitHub](https://github.com)。

![示例图片](https://example.com/image.jpg)
`)
</script>
```

### 在 AI 流式输出中使用

```vue
<template>
  <AiMessage role="assistant">
    <AiMarkdown :content="streamingContent" />
    <AiLoader v-if="isStreaming" type="typing" size="small" />
  </AiMessage>
</template>

<script setup>
import { ref } from 'vue'
import { AiMessage, AiMarkdown, AiLoader } from 'ai-ui-vue'

const streamingContent = ref('')
const isStreaming = ref(true)

// SSE 流式输出...
</script>
```

## 样式定制

组件使用 `.ai-markdown` 类，可以通过 CSS 覆盖默认样式：

```css
.ai-markdown :deep(h1) {
  color: #6366f1;
}

.ai-markdown :deep(pre) {
  background: #1f2937;
}
```
