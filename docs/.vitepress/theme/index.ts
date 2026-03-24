import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import './demo.css'
import { useComponents } from './useComponents'

// 全局注册我们的组件，确保 demos 可以正常使用
import AiInput from '../../../packages/core/AiInput.vue'
import AiMessage from '../../../packages/core/AiMessage.vue'
import AiLoader from '../../../packages/core/AiLoader.vue'
import AiMarkdown from '../../../packages/markdown/AiMarkdown.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    useComponents(ctx.app)
    // 注册我们的 AI 组件
    ctx.app.component('AiInput', AiInput)
    ctx.app.component('AiMessage', AiMessage)
    ctx.app.component('AiLoader', AiLoader)
    ctx.app.component('AiMarkdown', AiMarkdown)
  }
} satisfies Theme
