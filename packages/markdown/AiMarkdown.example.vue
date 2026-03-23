<template>
  <div class="example-page">
    <h1>AiMarkdown 示例</h1>

    <!-- 基础用法 -->
    <section class="example-section">
      <h2>基础用法</h2>
      <p>将 Markdown 文本渲染为 HTML</p>
      <div class="example-demo">
        <AiMarkdown :content="markdownText" />
      </div>
      <pre><code>
&lt;AiMarkdown :content="markdownText" /&gt;
      </code></pre>
    </section>

    <!-- 代码高亮 -->
    <section class="example-section">
      <h2>代码高亮</h2>
      <p>自动识别语言并高亮显示</p>
      <div class="example-demo">
        <AiMarkdown :content="codeExample" />
      </div>
      <pre><code>
```vue
const codeExample = \`
## JavaScript 示例
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('Vue');
\`\`\`
\`;
```
      </code></pre>
    </section>

    <!-- 表格渲染 -->
    <section class="example-section">
      <h2>表格</h2>
      <p>支持 Markdown 表格语法</p>
      <div class="example-demo">
        <AiMarkdown :content="tableExample" />
      </div>
      <pre><code>
| 姓名 | 年龄 | 职业 |
|------|------|------|
| 张三 | 25 | 前端工程师 |
| 李四 | 30 | 后端工程师 |
      </code></pre>
    </section>

    <!-- 列表 -->
    <section class="example-section">
      <h2>列表</h2>
      <p>支持有序和无序列表</p>
      <div class="example-demo">
        <AiMarkdown :content="listExample" />
      </div>
      <pre><code>
- Vue 3
- React 18
- Angular 17

1. 第一步
2. 第二步
3. 第三步
      </code></pre>
    </section>

    <!-- 引用块 -->
    <section class="example-section">
      <h2>引用块</h2>
      <p>引用重要信息</p>
      <div class="example-demo">
        <AiMarkdown :content="quoteExample" />
      </div>
      <pre><code>
> Vue 3 是 Vue.js 的最新版本
> 性能更优、开发体验更好
      </code></pre>
    </section>

    <!-- 链接和图片 -->
    <section class="example-section">
      <h2>链接和图片</h2>
      <p>支持链接和图片语法</p>
      <div class="example-demo">
        <AiMarkdown :content="linkExample" />
      </div>
      <pre><code>
[Vue 官网](https://vuejs.org)

![Logo](https://vuejs.org/logo.svg)
      </code></pre>
    </section>

    <!-- AI 回复场景 -->
    <section class="example-section">
      <h2>AI 回复场景</h2>
      <p>模拟 AI 返回的 Markdown 内容</p>
      <div class="example-demo">
        <AiMarkdown :content="aiResponseExample" />
      </div>
    </section>

    <!-- 完整的 AI 代码示例 -->
    <section class="example-section">
      <h2>AI 代码生成</h2>
      <p>显示 AI 生成的带代码高亮的回复</p>
      <div class="example-demo">
        <AiMarkdown :content="aiCodeExample" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AiMarkdown from '../markdown/AiMarkdown.vue'

const markdownText = ref(`
# 欢迎使用 Ai UI Vue

这是一个专为 **AI 应用** 设计的 Vue 3 组件库。

## 特性

- 🎯 **场景聚焦** - 专为 AI 应用设计
- ⚡ **流式处理** - 内置 SSE/WebSocket 支持
- 🎨 **主题系统** - CSS 变量，轻松定制
`)

const codeExample = ref(`
## JavaScript 示例

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('Vue');
\`\`\`
`)

const tableExample = ref(`
| 姓名 | 年龄 | 职业 |
|------|------|------|
| 张三 | 25 | 前端工程师 |
| 李四 | 30 | 后端工程师 |
| 王五 | 28 | 全栈工程师 |
`)

const listExample = ref(`
## 技术栈

- Vue 3
- React 18
- Angular 17
- Svelte 4

## 学习路线

1. 基础语法
2. 组件开发
3. 状态管理
4. 路由配置
`)

const quoteExample = ref(`
> Vue 3 是 Vue.js 的最新版本

性能更优、开发体验更好，建议新项目直接使用。
`)

const linkExample = ref(`
## 资源链接

- [Vue 官网](https://vuejs.org)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)

## 图片

![Vue Logo](https://vuejs.org/logo.svg)
`)

const aiResponseExample = ref(`
# Vue 3 核心概念

## Composition API

Composition API 是 Vue 3 的主要新特性之一，它提供了一种基于函数的 API 来组织和复用代码逻辑。

### 主要优势

1. **更好的代码组织** - 相关逻辑可以组合在一起
2. **更好的 TypeScript 支持** - 类型推导更准确
3. **更灵活的代码复用** - 组合式函数可以自由组合
`)

const aiCodeExample = ref(`
# 流式对话组件示例

下面是一个简单的流式对话实现：

\`\`\`vue
&lt;script setup&gt;
import { ref } from 'vue'
import { useStream } from '@ai-ui/vue'

const messages = ref([])

// 连接到 SSE 端点
const { connect, disconnect } = useStream({
  url: '/api/chat/stream',
  onMessage: (data) => {
    messages.value.push(data)
  }
})

// 发送消息
const sendMessage = async (content) => {
  await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ content })
  })
}

connect()
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="chat"&gt;
    &lt;AiMessage
      v-for="msg in messages"
      :content="msg.content"
      :role="msg.role"
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;
\`\`\`

这个组件展示了：
1. **SSE 连接管理**
2. **流式消息处理**
3. **组件复用**
`)
</script>

<style scoped>
.example-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.example-section {
  margin-bottom: 40px;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.example-section h2 {
  margin-top: 0;
  color: #1f2937;
  font-size: 20px;
  margin-bottom: 12px;
}

.example-section p {
  color: #6b7280;
  margin-bottom: 16px;
}

.example-demo {
  margin: 20px 0;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.example-code pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
}

.example-code code {
  font-family: 'Courier New', monospace;
}
</style>
