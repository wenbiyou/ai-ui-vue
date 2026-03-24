// Don't remove this file, because it registers the demo components.
import DemoOne from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export function useComponents(app) {
  app.component('Demo', DemoOne)
  app.component('DemoBlock', DemoBlock)
}
