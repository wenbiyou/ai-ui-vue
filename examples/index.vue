<template>
  <div class="examples-page">
    <h1>Ai UI Vue - 组件示例</h1>
    <p class="subtitle">专为 AI 应用设计的 Vue 3 组件库</p>

    <div class="component-grid">
      <div class="component-card" @click="activeComponent = 'AiInput'">
        <div class="component-icon">📝</div>
        <h2>AiInput</h2>
        <p>Prompt 输入框，支持自动调整高度、字符计数、键盘事件</p>
        <ul class="feature-list">
          <li>✅ 自动调整高度</li>
          <li>✅ 字符计数</li>
          <li>✅ 键盘快捷键（Enter/Escape）</li>
          <li>✅ 操作栏插槽</li>
        </ul>
        <button class="btn-view">查看示例</button>
      </div>

      <div class="component-card" @click="activeComponent = 'AiMessage'">
        <div class="component-icon">💬</div>
        <h2>AiMessage</h2>
        <p>消息气泡，支持 user/assistant/system 三种角色</p>
        <ul class="feature-list">
          <li>✅ 三种消息角色</li>
          <li>✅ Markdown 内容渲染</li>
          <li>✅ 可选头像和时间戳</li>
          <li>✅ 自定义头像插槽</li>
        </ul>
        <button class="btn-view">查看示例</button>
      </div>

      <div class="component-card" @click="activeComponent = 'AiLoader'">
        <div class="component-icon">⏳</div>
        <h2>AiLoader</h2>
        <p>加载状态，支持 dots/spinner/typing 三种样式</p>
        <ul class="feature-list">
          <li>✅ 打字机效果（typing）</li>
          <li>✅ 圆点效果（dots）</li>
          <li>✅ 旋转效果（spinner）</li>
          <li>✅ 可选文本和尺寸</li>
        </ul>
        <button class="btn-view">查看示例</button>
      </div>

      <div class="component-card" @click="activeComponent = 'AiMarkdown'">
        <div class="component-icon">📄</div>
        <h2>AiMarkdown</h2>
        <p>Markdown 渲染，内置代码高亮</p>
        <ul class="feature-list">
          <li>✅ 语法高亮</li>
          <li>✅ 支持 JS/TS/Python</li>
          <li>✅ 表格和列表渲染</li>
          <li>✅ 链接和引用块</li>
        </ul>
        <button class="btn-view">查看示例</button>
      </div>
    </div>

    <div class="demo-container" v-if="activeComponent">
      <div class="demo-content">
        <button @click="activeComponent = null" class="btn-close">关闭</button>
        <component :is="currentExampleComponent" v-if="currentExampleComponent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { ref, watch, computed } from 'vue'

const AiInputExample = defineAsyncComponent(() => import('../packages/core/AiInput.example.vue'))
const AiMessageExample = defineAsyncComponent(() => import('../packages/core/AiMessage.example.vue'))
const AiLoaderExample = defineAsyncComponent(() => import('../packages/core/AiLoader.example.vue'))
const AiMarkdownExample = defineAsyncComponent(() => import('../packages/markdown/AiMarkdown.example.vue'))

const activeComponent = ref<string | null>(null)

const componentMap = {
  AiInput: AiInputExample,
  AiMessage: AiMessageExample,
  AiLoader: AiLoaderExample,
  AiMarkdown: AiMarkdownExample,
}

const currentExampleComponent = computed(() => {
  return activeComponent.value ? componentMap[activeComponent.value as keyof typeof componentMap] : null
})

watch(activeComponent, (newVal) => {
  console.log('当前激活的组件示例:', newVal)
})
</script>

<style scoped>
.examples-page {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.examples-page h1 {
  color: #1f2937;
  margin-bottom: 12px;
  font-size: 32px;
}

.subtitle {
  color: #6b7280;
  font-size: 18px;
  margin-bottom: 40px;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.component-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition: all 0.3s;
  cursor: pointer;
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border-color: #6366f1;
}

.component-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.component-card h2 {
  margin: 0 0 12px 0;
  color: #1f2937;
  font-size: 20px;
}

.component-card p {
  margin: 0 0 16px 0;
  color: #6b7280;
  line-height: 1.6;
}

.feature-list {
  margin: 0 0 20px 0;
  padding-left: 0;
}

.feature-list li {
  padding: 4px 0;
  color: #374151;
  font-size: 14px;
}

.btn-view {
  width: 100%;
  padding: 10px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.btn-view:hover {
  background: #4f46e5;
}

.demo-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  padding: 40px;
}

.demo-content {
  background: #fff;
  border-radius: 12px;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  position: relative;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}

.demo-header h2 {
  margin: 0;
  color: #1f2937;
}

.btn-close {
  padding: 8px 16px;
  background: #e5e7eb;
  color: #1f2937;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  top: 10px;
  right: 20px;
  transition: background 0.2s;
}

.btn-close:hover {
  background: #d1d5db;
}
</style>
