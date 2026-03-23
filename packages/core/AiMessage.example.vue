<template>
  <div class="example-page">
    <h1>AiMessage 示例</h1>

    <!-- 基础用法 -->
    <section class="example-section">
      <h2>基础用法</h2>
      <p>使用 role 属性区分不同角色的消息</p>
      <div class="example-demo">
        <AiMessage role="user" content="这是用户的消息" />
        <AiMessage role="assistant" content="这是 AI 的回复消息" />
        <AiMessage role="system" content="这是系统通知消息" />
      </div>
      <pre><code>
&lt;AiMessage role="user" content="这是用户的消息" /&gt;
&lt;AiMessage role="assistant" content="这是 AI 的回复" /&gt;
&lt;AiMessage role="system" content="这是系统通知" /&gt;
      </code></pre>
    </section>

    <!-- 带时间戳 -->
    <section class="example-section">
      <h2>带时间戳</h2>
      <p>设置 showTimestamp 显示消息时间</p>
      <div class="example-demo">
        <AiMessage
          role="assistant"
          content="这条消息有时间戳"
          :show-timestamp="true"
          :timestamp="new Date()"
        />
      </div>
      <pre><code>
&lt;AiMessage
  role="assistant"
  content="这条消息有时间戳"
  :show-timestamp="true"
  :timestamp="new Date()"
/&gt;
      </code></pre>
    </section>

    <!-- 隐藏头像 -->
    <section class="example-section">
      <h2>隐藏头像</h2>
      <p>设置 showAvatar=false 隐藏头像</p>
      <div class="example-demo">
        <AiMessage
          role="assistant"
          content="这条消息没有头像"
          :show-avatar="false"
        />
      </div>
      <pre><code>&lt;AiMessage role="assistant" content="这条消息没有头像" :show-avatar="false" /&gt;</code></pre>
    </section>

    <!-- 使用插槽 -->
    <section class="example-section">
      <h2>自定义头像</h2>
      <p>使用 avatar 插槽自定义头像内容</p>
      <div class="example-demo">
        <AiMessage role="user" :show-avatar="true">
          <template #avatar>
            <span class="custom-avatar">👤</span>
          </template>
        </AiMessage>
        <AiMessage role="assistant" :show-avatar="true">
          <template #avatar>
            <span class="custom-avatar">🤖</span>
          </template>
        </AiMessage>
      </div>
      <pre><code>
&lt;AiMessage role="user"&gt;
  &lt;template #avatar&gt;
    &lt;span class="custom-avatar"&gt;👤&lt;/span&gt;
  &lt;/template&gt;
&lt;/AiMessage&gt;
      </code></pre>
    </section>

    <!-- Markdown 内容 -->
    <section class="example-section">
      <h2>Markdown 内容</h2>
      <p>AiMessage 支持显示 Markdown 格式的内容</p>
      <div class="example-demo">
        <AiMessage
          role="assistant"
          content="# 标题\n\n这是一段**加粗**文字和一段*斜体*文字。\n\n```js\nconsole.log('Hello');\n```"
        />
      </div>
    </section>

    <!-- 完整对话示例 -->
    <section class="example-section">
      <h2>完整对话示例</h2>
      <p>模拟一个完整的 AI 对话</p>
      <div class="example-demo chat-demo">
        <AiMessage
          role="user"
          content="你好，请介绍一下 Vue 3"
          :timestamp="new Date(Date.now() - 60000)"
          :show-timestamp="true"
        />
        <AiMessage
          role="assistant"
          content="Vue 3 是 Vue.js 的最新版本，主要特性包括：\n\n1. **Composition API** - 更灵活的组合式 API\n2. **更好的 TypeScript 支持** - 完整的类型推导\n3. **性能提升** - 更小的包体积和更快的渲染速度\n4. **Fragments** - 支持多个根节点"
          :timestamp="new Date(Date.now() - 55000)"
          :show-timestamp="true"
        />
        <AiMessage
          role="user"
          content="Composition API 的好处是什么？"
          :timestamp="new Date(Date.now() - 50000)"
          :show-timestamp="true"
        />
        <AiMessage
          role="assistant"
          content="Composition API 的主要优势：\n\n- 更好的代码组织\n- 更容易复用逻辑\n- 更好的 TypeScript 支持\n- 不需要 this，减少心智负担"
          :timestamp="new Date()"
          :show-timestamp="true"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import AiMessage from './AiMessage.vue'
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
}

.example-demo.chat-demo {
  max-width: 600px;
  margin: 20px auto;
}

.example-code pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
}

.custom-avatar {
  font-size: 24px;
}
</style>
