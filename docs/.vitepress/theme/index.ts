import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import './demo.css'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

// 全局注册我们的组件，确保 demos 可以正常使用
import AiInput from '../../../packages/core/AiInput.vue'
import AiMessage from '../../../packages/core/AiMessage.vue'
import AiLoader from '../../../packages/core/AiLoader.vue'
import AiMarkdown from '../../../packages/markdown/AiMarkdown.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
    app.component('AiInput', AiInput)
    app.component('AiMessage', AiMessage)
    app.component('AiLoader', AiLoader)
    app.component('AiMarkdown', AiMarkdown)
  }
} satisfies Theme
