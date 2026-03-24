<template>   <div class="example-page">
    <h1>AiInput 示例</h1>

    <!-- 基础用法 -->
    <section class="example-section">
      <h2>基础用法</h2>
      <p>基本的输入框，支持自动调整高度和字符计数</p>
      <div class="example-demo">
        <AiInput
          v-model="message"
          placeholder="输入内容..."
          :show-char-count="true"
        />
      </div>
      <div class="example-code">
        <pre><code>&lt;AiInput v-model="message" placeholder="输入内容..." /&gt;</code></pre>
      </div>
    </section>

    <!-- 带底部操作栏 -->
    <section class="example-section">
      <h2>带操作栏</h2>
      <p>在底部添加自定义操作按钮</p>
      <div class="example-demo">
        <AiInput v-model="message2">
          <template #actions>
            <button @click="handleClear" class="btn-clear">清空</button>
            <button @click="handleSubmit" class="btn-submit">发送</button>
          </template>
        </AiInput>
      </div>
      <pre><code>
&lt;AiInput v-model="message"&gt;
  &lt;template #actions&gt;
    &lt;button @click="handleClear"&gt;清空&lt;/button&gt;
    &lt;button @click="handleSubmit"&gt;发送&lt;/button&gt;
  &lt;/template&gt;
&lt;/AiInput&gt;
      </code></pre>
    </section>

    <!-- 禁用状态 -->
    <section class="example-section">
      <h2>禁用状态</h2>
      <div class="example-demo">
        <AiInput v-model="message3" :disabled="true" placeholder="禁用状态..." />
      </div>
      <pre><code>&lt;AiInput v-model="message" :disabled="true" /&gt;</code></pre>
    </section>

    <!-- 限制字符数 -->
    <section class="example-section">
      <h2>限制字符数</h2>
      <p>设置 maxlength 属性限制最大输入长度</p>
      <div class="example-demo">
        <AiInput
          v-model="message4"
          :maxlength="50"
          :show-char-count="true"
          placeholder="最多输入 50 字符..."
        />
      </div>
      <pre><code>&lt;AiInput v-model="message" :maxlength="50" :show-char-count="true" /&gt;</code></pre>
    </section>

    <!-- 监听事件 -->
    <section class="example-section">
      <h2>事件监听</h2>
      <div class="example-demo">
        <AiInput
          v-model="message5"
          @submit="handleSubmit"
          @cancel="handleCancel"
          placeholder="按 Enter 发送，按 Escape 取消..."
        />
      </div>
      <div class="event-log">
        <h4>事件日志：</h4>
        <div class="log-content">{{ eventLog }}</div>
      </div>
      <pre><code>
&lt;AiInput
  v-model="message"
  @submit="handleSubmit"
  @cancel="handleCancel"
/&gt;
      </code></pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AiInput from './AiInput.vue'

const message = ref('')
const message2 = ref('')
const message3 = ref('')
const message4 = ref('')
const message5 = ref('')
const eventLog = ref('')

const handleClear = () => {
  message2.value = ''
  console.log('清空')
}

const handleSubmit = () => {
  console.log('提交:', message2.value)
  eventLog.value += `\n[提交] ${new Date().toLocaleTimeString()}: ${message2.value}`
}

const handleCancel = () => {
  console.log('取消')
  eventLog.value += `\n[取消] ${new Date().toLocaleTimeString()}`
}
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

.example-code {
  margin-top: 16px;
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

.btn-clear,
.btn-submit {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
}

.btn-clear {
  background: #e5e7eb;
  color: #1f2937;
}

.btn-submit {
  background: #6366f1;
  color: white;
}

.event-log {
  margin-top: 20px;
  padding: 16px;
  background: #1f2937;
  color: #10b981;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
}

.event-log h4 {
  margin: 0 0 8px 0;
}

.log-content {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  white-space: pre-wrap;
  line-height: 1.6;
}
</style>
