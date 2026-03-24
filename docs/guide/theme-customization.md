# 主题定制实时预览

Ai UI Vue 使用 CSS 变量实现主题定制，你可以通过修改 CSS 变量来自定义组件样式。

下面是一个实时预览编辑器，调整颜色看看效果：

:::demo

```vue
<template>
  <div class="theme-preview">
    <div class="theme-preview__controls">
      <div v-for="(item, key) in theme" :key="key" class="theme-preview__control">
        <label>{{ item.label }}</label>
        <div class="theme-preview__control-row">
          <input
            type="color"
            :value="item.value"
            @input="updateTheme(key, ($event.target).value)"
          />
          <input
            type="text"
            :value="item.value"
            @input="updateTheme(key, ($event.target).value)"
          />
        </div>
      </div>
      <button class="theme-preview__reset" @click="resetTheme">
        重置默认主题
      </button>
    </div>

    <div class="theme-preview__preview" :style="customThemeStyle">
      <h4>预览效果</h4>
      <AiInput
        v-model="inputValue"
        placeholder="输入内容看看主题效果..."
        :show-char-count="true"
      />
      <div style="margin-top: 16px; display: flex; gap: 16px;">
        <AiMessage role="user" content="这是用户消息" />
      </div>
      <div style="margin-top: 16px; display: flex; gap: 16px;">
        <AiMessage role="assistant" content="这是 AI 助手消息，在自定义主题下展示效果" />
      </div>
      <div style="margin-top: 16px;">
        <AiLoader type="typing" text="AI 正在思考..." />
      </div>
    </div>

    <div class="theme-preview__code">
      <h4>CSS 变量代码</h4>
      <pre><code>{{ cssCode }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "ai-ui-vue"

const defaultTheme = {
  '--ai-primary-color': { label: '主色', value: '#6366f1' },
  '--ai-border-color': { label: '边框色', value: '#e5e7eb' },
  '--ai-bg-color': { label: '背景色', value: '#ffffff' },
  '--ai-bg-secondary': { label: '次要背景', value: '#f9fafb' },
  '--ai-text-color': { label: '文本色', value: '#1f2937' },
  '--ai-text-secondary': { label: '次要文本', value: '#6b7280' }
}

const theme = ref({ ...defaultTheme })
const inputValue = ref('')

const updateTheme = (key, value) => {
  theme.value[key].value = value
  document.documentElement.style.setProperty(key, value)
}

const resetTheme = () => {
  theme.value = JSON.parse(JSON.stringify(defaultTheme))
  Object.keys(defaultTheme).forEach(key => {
    document.documentElement.style.setProperty(key, defaultTheme[key].value)
  })
}

const customThemeStyle = computed(() => {
  const style = {}
  Object.entries(theme.value).forEach(([key, item]) => {
    style[key] = item.value
  })
  return style
})

const cssCode = computed(() => {
  return `:root {
${Object.entries(theme.value).map(([key, item]) => `  ${key}: ${item.value};`).join('\n')}
}`
})
</script>

<style scoped>
.theme-preview {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.theme-preview__controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--ai-border-color);
  border-radius: 8px;
  background: var(--ai-bg-secondary);
}

.theme-preview__control {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.theme-preview__control label {
  font-size: 13px;
  font-weight: 500;
  color: var(--ai-text-color);
}

.theme-preview__control-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.theme-preview__control-row input[type="color"] {
  width: 40px;
  height: 32px;
  padding: 2px;
  border: 1px solid var(--ai-border-color);
  border-radius: 4px;
  cursor: pointer;
  background: white;
}

.theme-preview__control-row input[type="text"] {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid var(--ai-border-color);
  border-radius: 4px;
  font-size: 13px;
  font-family: monospace;
}

.theme-preview__reset {
  grid-column: 1 / -1;
  padding: 8px 16px;
  border: 1px solid var(--ai-primary-color);
  border-radius: 6px;
  background: white;
  color: var(--ai-primary-color);
  cursor: pointer;
  transition: all 0.2s;
}

.theme-preview__reset:hover {
  background: var(--ai-primary-color);
  color: white;
}

.theme-preview__preview {
  padding: 24px;
  border: 1px solid var(--ai-border-color);
  border-radius: 8px;
}

.theme-preview__preview h4 {
  margin-top: 0;
  margin-bottom: 16px;
}

.theme-preview__code {
  padding: 16px;
  border: 1px solid var(--ai-border-color);
  border-radius: 8px;
  background: #1f2937;
  color: #e5e7eb;
}

.theme-preview__code h4 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #f9fafb;
}

.theme-preview__code pre {
  margin: 0;
  padding: 0;
}

.theme-preview__code code {
  background: transparent;
  padding: 0;
  color: inherit;
}
</style>

:::

## 使用说明

在你的项目根 CSS 中覆盖这些 CSS 变量即可自定义主题：

```css
:root {
  /* 主色 - 用于边框焦点、用户消息背景 */
  --ai-primary-color: #6366f1;
  /* 边框颜色 */
  --ai-border-color: #e5e7eb;
  /* 背景颜色 */
  --ai-bg-color: #ffffff;
  /* 次要背景颜色 - 用于 AI 消息 */
  --ai-bg-secondary: #f9fafb;
  /* 主要文本颜色 */
  --ai-text-color: #1f2937;
  /* 次要文本颜色 - 用于占位符、计数 */
  --ai-text-secondary: #6b7280;
  /* 代码块背景 */
  --ai-code-bg: #f3f4f6;
}
```

## 深色模式示例

如果你的网站支持深色模式，可以通过媒体查询自动切换：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --ai-border-color: #374151;
    --ai-bg-color: #1f2937;
    --ai-bg-secondary: #374151;
    --ai-text-color: #f9fafb;
    --ai-text-secondary: #9ca3af;
    --ai-code-bg: #374151;
  }
}
```
