import { createApp } from 'vue'
import './style.css'

// 导入组件用于开发测试
// import AiInput from '../packages/core/AiInput.vue'
// import AiMessage from '../packages/core/AiMessage.vue'
// import AiLoader from '../packages/core/AiLoader.vue'
// import AiMarkdown from '../packages/markdown/AiMarkdown.vue'

const app = createApp({
  template: `
    <div style="padding: 40px; font-family: system-ui, -apple-system, sans-serif;">
      <h1 style="color: #6366f1; margin-bottom: 20px;">🎉 Ai UI Vue - Development</h1>
      <p style="color: #6b7280; margin-bottom: 40px;">
        Vue3 AI 应用专用组件库开发环境
      </p>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin-top: 0;">✅ 组件列表</h2>
        <ul style="margin-top: 10px; line-height: 1.8; color: #374151;">
          <li><strong>AiInput</strong> - Prompt 输入框</li>
          <li><strong>AiMessage</strong> - 消息气泡</li>
          <li><strong>AiLoader</strong> - 加载状态</li>
          <li><strong>AiMarkdown</strong> - Markdown 渲染</li>
        </ul>
      </div>

      <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #6366f1;">
        <h2 style="margin-top: 0;">🚀 快速开始</h2>
        <p style="margin-top: 10px; color: #4b5563;">
          克隆项目后，查看 README.md 了解如何使用组件。
        </p>
        <code style="display: block; background: #1f2937; color: #ecfdf5; padding: 10px; border-radius: 4px; font-family: monospace;">
          npm install
          npm run dev
        </code>
      </div>
    </div>
  `
})

app.mount('#app')
