import { defineConfig } from 'vitepress'
import demoblock from 'vitepress-theme-demoblock'
import { resolve } from 'path'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        'ai-ui-vue': resolve(__dirname, '../../'),
      }
    }
  },
  title: 'Ai UI Vue',
  description: 'Vue3 AI 应用专用组件库',
  lang: 'zh-CN',
  base: '/ai-ui-vue/',

  markdown: {
    frontmatter: false,
    config: (md) => {
      md.use(demoblock)
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/wenbiyou/ai-ui-vue' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wenbiyou/ai-ui-vue' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '项目结构', link: '/guide/structure' }
          ]
        },
        {
          text: '定制',
          items: [
            { text: '主题定制', link: '/guide/theme-customization' }
          ]
        },
        {
          text: '示例',
          items: [
            { text: 'SSE 流式响应', link: '/guide/sse-demo' }
          ]
        },
        {
          text: '适配',
          items: [
            { text: '移动端适配', link: '/guide/mobile' }
          ]
        },
        {
          text: '性能',
          items: [
            { text: '性能对比', link: '/guide/performance' }
          ]
        }
      ],
      '/components/': [
        {
          text: '核心组件',
          items: [
            { text: 'AiInput', link: '/components/ai-input' },
            { text: 'AiMessage', link: '/components/ai-message' },
            { text: 'AiLoader', link: '/components/ai-loader' }
          ]
        },
        {
          text: '功能组件',
          items: [
            { text: 'AiMarkdown', link: '/components/ai-markdown' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/wenbiyou/ai-ui-vue/edit/main/:path'
    },

    lastUpdated: true,
    contributors: false
  },

  // 忽略死链接检查
  ignoreDeadLinks: true
})
