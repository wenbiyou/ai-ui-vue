<template>
  <div class="ai-markdown" v-html="renderedHtml"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github.css'

// 注册支持的语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)

/**
 * AiMarkdown 组件 Props 定义
 * @description Markdown 渲染组件，内置代码高亮，支持 GitHub Flavored Markdown
 */
export interface AiMarkdownProps {
  /** 需要渲染的 Markdown 文本内容 */
  content: string
  /** 是否将换行符转换为 <br> 标签 */
  breaks?: boolean
  /** 是否启用 GitHub Flavored Markdown 扩展 */
  gfm?: boolean
}

const props = withDefaults(defineProps<AiMarkdownProps>(), {
  breaks: true,
  gfm: true
})

const renderedHtml = computed(() => {
  marked.setOptions({
    breaks: props.breaks,
    gfm: props.gfm
  })
  // 使用 marked 扩展实现代码高亮
  const renderer = new marked.Renderer()
  renderer.code = function(code: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre><code class="hljs language-${lang}">${hljs.highlight(code, { language: lang }).value}</code></pre>`
    }
    return `<pre><code class="hljs">${hljs.highlightAuto(code).value}</code></pre>`
  }
  marked.use({ renderer })
  return marked.parse(props.content)
})
</script>

<style>
.ai-markdown {
  line-height: 1.7;
  font-size: 14px;
}

.ai-markdown :deep(h1),
.ai-markdown :deep(h2),
.ai-markdown :deep(h3),
.ai-markdown :deep(h4),
.ai-markdown :deep(h5),
.ai-markdown :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.ai-markdown :deep(h1) { font-size: 1.75em; }
.ai-markdown :deep(h2) { font-size: 1.5em; }
.ai-markdown :deep(h3) { font-size: 1.25em; }

.ai-markdown :deep(p) { margin: 0.5em 0; }

.ai-markdown :deep(code) {
  background: var(--ai-code-bg, #f3f4f6);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.ai-markdown :deep(pre) {
  background: var(--ai-pre-bg, #1f2937);
  color: white;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1em 0;
}

.ai-markdown :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}

.ai-markdown :deep(ul),
.ai-markdown :deep(ol) {
  padding-left: 2em;
  margin: 0.5em 0;
}

.ai-markdown :deep(li) { margin: 0.25em 0; }

.ai-markdown :deep(blockquote) {
  border-left: 4px solid var(--ai-border-color, #e5e7eb);
  padding-left: 1em;
  margin: 1em 0;
  color: var(--ai-text-secondary, #6b7280);
}

.ai-markdown :deep(a) {
  color: var(--ai-primary-color, #6366f1);
  text-decoration: underline;
}

.ai-markdown :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.ai-markdown :deep(th),
.ai-markdown :deep(td) {
  border: 1px solid var(--ai-border-color, #e5e7eb);
  padding: 8px 12px;
  text-align: left;
}

.ai-markdown :deep(th) {
  background: var(--ai-bg-secondary, #f9fafb);
  font-weight: 600;
}

.ai-markdown :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
