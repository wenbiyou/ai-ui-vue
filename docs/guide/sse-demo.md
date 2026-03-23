# SSE 流式响应演示

Ai UI Vue 专为 AI 应用设计，完美支持 Server-Sent Events (SSE) 流式响应场景。

下面是一个完整的流式对话演示，模拟大模型逐字输出效果：

:::demo

```vue
<template>
  <div class="sse-demo">
    <!-- 消息列表 -->
    <div class="sse-demo__messages">
      <AiMessage
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        :show-timestamp="true"
      />
      <div v-if="loading" class="sse-demo__loading">
        <AiLoader type="typing" text="AI 正在思考中..." />
      </div>
    </div>

    <!-- 输入框 -->
    <AiInput
      v-model="inputValue"
      :disabled="loading"
      placeholder="输入你的问题，点击发送查看流式输出效果..."
      @submit="handleSubmit"
    />

    <div class="sse-demo__info">
      <small>这是模拟演示，在真实项目中请对接你的 SSE API</small>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader } from 'ai-ui-vue'

const inputValue = ref('')
const messages = ref([
  {
    id: 1,
    role: 'assistant',
    content: '你好！我是 AI 助手，发送任何问题都可以体验流式输出效果。',
    timestamp: new Date().toLocaleTimeString().slice(0, 5)
  }
])
const loading = ref(false)

// 模拟流式输出的文本
const getResponse = (question: string): string[] => {
  const responses = [
    '你好！',
    '我收到了你的问题：',
    ` "${question}"`,
    '\n\n',
    '这是一个',
    ' SSE ',
    '流式',
    '响应',
    ' 的',
    '演示',
    '效果。',
    '\n\n',
    '在实际项目中，',
    '你可以',
    ' 通过 ',
    'EventSource',
    ' 或者 ',
    'Fetch',
    ' ReadableStream',
    ' 连接',
    ' 你的',
    ' AI ',
    ' API',
    '，',
    '实现',
    ' 类似',
    ' 的',
    ' 逐字',
    ' 输出',
    ' 效果。',
    '\n\n',
    'Ai UI Vue ',
    '组件库',
    ' 已经',
    ' 为你',
    ' 准备好',
    ' 了所有',
    ' 基础',
    ' 组件，',
    '只需要',
    ' 对接',
    ' 你的',
    ' API',
    ' 即可',
    '快速',
    '搭建',
    ' AI',
    ' 对话',
    ' 应用。'
  ]
  return responses
}

const handleSubmit = async () => {
  if (!inputValue.value.trim() || loading.value) return

  const question = inputValue.value
  const now = new Date().toLocaleTimeString().slice(0, 5)

  // 添加用户消息
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: question,
    timestamp: now
  })

  inputValue.value = ''
  loading.value = true

  // 添加空的 AI 消息
  const aiMessageId = Date.now()
  messages.value.push({
    id: aiMessageId,
    role: 'assistant',
    content: '',
    timestamp: now
  })

  // 模拟 SSE 流式输出
  const chunks = getResponse(question)
  let fullContent = ''
  let currentIndex = 0

  const streamChunk = () => {
    if (currentIndex >= chunks.length) {
      loading.value = false
      return
    }

    fullContent += chunks[currentIndex]
    // 更新消息内容
    const msgIndex = messages.value.findIndex(m => m.id === aiMessageId)
    if (msgIndex > -1) {
      messages.value[msgIndex].content = fullContent
    }

    currentIndex++
    // 随机延迟模拟网络延迟
    const delay = Math.random() * 100 + 50
    setTimeout(streamChunk, delay)
  }

  // 开始流式输出
  setTimeout(streamChunk, 500)
}
</script>

<style scoped>
.sse-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 100%;
}

.sse-demo__messages {
  border: 1px solid var(--ai-border-color);
  border-radius: 8px;
  padding: 12px;
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  background: var(--ai-bg-color);
}

.sse-demo__loading {
  padding: 8px 12px;
}

.sse-demo__info {
  text-align: center;
  color: var(--ai-text-secondary);
}
</style>

:::

## 实现说明

在实际项目中使用 SSE 流式响应的核心代码：

```javascript
// 使用 EventSource 连接 SSE API
const eventSource = new EventSource('/api/stream')

eventSource.onmessage = (event) => {
  // 逐块接收数据，追加到消息内容
  aiMessage.content += event.data
}

eventSource.onerror = (error) => {
  // 处理错误和连接关闭
  eventSource.close()
}
```

## 使用 Fetch ReadableStream

现代浏览器也可以使用 Fetch + ReadableStream 实现：

```javascript
const response = await fetch('/api/stream', {
  method: 'POST',
  body: JSON.stringify({ prompt })
})

const reader = response.body.getReader()
const decoder = new TextDecoder()

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  // 解码并追加内容
  const chunk = decoder.decode(value)
  aiMessage.content += chunk
}
```

## 完整组件配合

在流式响应场景中，你会用到这些组件：

| 组件 | 用途 |
|------|------|
| `AiInput` | 用户输入问题，支持按 Enter 提交 |
| `AiMessage` | 展示用户消息和 AI 流式回复内容 |
| `AiLoader` | AI 思考/加载过程中展示加载动画 |
| `AiMarkdown` | AI 输出内容自动渲染 Markdown |

## 完整代码示例

```vue
<template>
  <div class="chat-container">
    <div class="chat-messages">
      <AiMessage
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
      />
      <div v-if="loading">
        <AiLoader type="typing" text="AI 正在生成回复..." />
      </div>
    </div>
    <AiInput
      v-model="input"
      :disabled="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader } from 'ai-ui-vue'

const input = ref('')
const messages = ref([])
const loading = ref(false)

const handleSubmit = async () => {
  if (!input.value.trim()) return

  // 1. 添加用户消息
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: input.value
  })

  const question = input.value
  input.value = ''
  loading.value = true

  // 2. 添加空 AI 消息占位
  const aiId = Date.now()
  messages.value.push({
    id: aiId,
    role: 'assistant',
    content: ''
  })

  // 3. 连接 SSE 流式 API
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ prompt: question })
  })

  // 4. 流式读取并更新内容
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let fullContent = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    fullContent += decoder.decode(value)
    // 更新消息内容，Vue 会自动响应更新
    const idx = messages.value.findIndex(m => m.id === aiId)
    if (idx > -1) {
      messages.value[idx].content = fullContent
    }
  }

  loading.value = false
}
</script>
```

这样就能实现和 ChatGPT 一样的逐字输出效果了！
