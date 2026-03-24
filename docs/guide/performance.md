# 性能对比

Ai UI Vue 专为 AI 前端应用设计，专注于轻量化和高性能。

## 包体积对比

| 项目 | 压缩后大小 | gzip 大小 | 依赖数量 |
|------|-----------|-----------|----------|
| **Ai UI Vue** | **~ 13 kB** | **~ 5 kB** | 2 (marked, highlight.js) |
| Element Plus | ~ 400 kB+ | ~ 100 kB+ | 依赖较多 |
| Ant Design Vue | ~ 600 kB+ | ~ 150 kB+ | 依赖较多 |
| Vant | ~ 80 kB | ~ 25 kB | 0 |

> *数据来源：unpkg.com 最新版本测算*

## 为什么更小更快？

- **按需引入**：只引入你用到的组件
- **无额外依赖**：仅依赖 marked 和 highlight.js（AiMarkdown 可选）
- **现代化编译**：使用 Vite 构建，Tree Shaking 完美支持
- **CSS 变量主题**：不需要预处理器，运行时动态修改

## 安装速度

```bash
# npm install 耗时（网络正常情况下）
npm install ai-ui-vue
# 约 2-5 秒（因网络而异）
```

## 运行时性能

| 指标 | Ai UI Vue | 说明 |
|------|-----------|------|
| 首次渲染 | ⚡ 很快 | 组件轻量化，没有冗余逻辑 |
| 内存占用 | 📉 低 | 每个组件保持最小内存 footprint |
| 更新性能 | ⚡ 快 | 使用 Vue 原生响应式，无额外开销 |
| 包大小 | 📦 小 | gzip 后仅 5kB 左右 |

## 性能优化特点

### 1. Tree Shaking 友好

所有导出都是 ES module，打包工具可以轻松清除未使用代码：

```javascript
// 只打包你引入的组件
import { AiInput, AiMessage, AiLoader, AiMarkdown } from "../../packages"
```

### 2. CSS 按需注入

组件样式使用 scoped CSS，只有当你使用组件时才会加载对应样式。

### 3. 懒加载推荐

对于完整文档站点，你可以懒加载组件示例：

```javascript
// 示例：在文档站点中懒加载大型演示
const LiveDemo = defineAsyncComponent(() =>
  import('./LiveDemo.vue')
)
```

## 交互式包大小浏览器

你可以在这里直观感受包体积：

:::demo

```vue
<template>
  <div class="performance-panel">
    <h4>包体积对比</h4>
    <div class="performance-panel__bars">
      <div
        v-for="item in data"
        :key="item.name"
        class="performance-bar"
      >
        <div class="performance-bar__label">
          <span>{{ item.name }}</span>
          <span>{{ item.gzip }} gzip</span>
        </div>
        <div class="performance-bar__track">
          <div
            class="performance-bar__fill"
            :class="{ 'performance-bar__fill--highlight': item.highlight }"
            :style="{ width: width(item.gzip) + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <div class="performance-panel__total">
      <div class="stat-card">
        <div class="stat-card__value">{{ totalSize }} kB</div>
        <div class="stat-card__label">Ai UI Vue 完整包 (gzip)</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__value">{{ depsCount }}</div>
        <div class="stat-card__label">生产依赖数量</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__value">{{ minBrotli }} kB</div>
        <div class="stat-card__label">Brotli 压缩后</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = [
  { name: 'Ai UI Vue', gzip: 5, highlight: true },
  { name: 'Vant', gzip: 25, highlight: false },
  { name: 'Element Plus', gzip: 100, highlight: false },
  { name: 'Ant Design Vue', gzip: 150, highlight: false }
]

const width = (gzip: number) => {
  // 最大 100 kB 对应 100% 宽度
  return Math.min((gzip / 150) * 100, 100)
}

const totalSize = '~ 5'
const depsCount = '2'
const minBrotli = '~ 4'
</script>

<style scoped>
.performance-panel {
  padding: 16px;
  border: 1px solid var(--ai-border-color);
  border-radius: 8px;
  background: var(--ai-bg-color);
}

.performance-panel h4 {
  margin-top: 0;
  margin-bottom: 16px;
}

.performance-panel__bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.performance-bar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.performance-bar__label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.performance-bar__track {
  width: 100%;
  height: 24px;
  background: var(--ai-bg-secondary);
  border-radius: 12px;
  overflow: hidden;
}

.performance-bar__fill {
  height: 100%;
  background: var(--ai-text-secondary);
  transition: width 0.5s ease;
}

.performance-bar__fill--highlight {
  background: var(--ai-primary-color);
}

.performance-panel__total {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.stat-card {
  padding: 16px;
  text-align: center;
  background: var(--ai-bg-secondary);
  border-radius: 8px;
}

.stat-card__value {
  font-size: 24px;
  font-weight: 600;
  color: var(--ai-primary-color);
}

.stat-card__label {
  font-size: 12px;
  color: var(--ai-text-secondary);
  margin-top: 4px;
}
</style>

:::

## 最佳实践建议

1. **按需引入**：如果你只需要几个组件，直接引入即可，不会打包多余代码
2. **CDN 使用**：可以使用 unpkg/jsDelivr 按需加载：
   ```html
   <link rel="stylesheet" href="https://unpkg.com/ai-ui-vue/dist/style.css">
   <script src="https://unpkg.com/ai-ui-vue/dist/ai-ui-vue.umd.js"></script>
   ```
3. **Tree Shaking**：使用 Vite/Webpack 5 天然支持，无需额外配置

## 性能监测

如果你发现任何性能问题，欢迎 [提交 Issue](https://github.com/wenbiyou/ai-ui-vue/issues)，我们会持续优化。
