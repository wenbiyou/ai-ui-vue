# 贡献指南

感谢你对 Ai UI Vue 的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能
- 📖 改进文档
- 🎨 优化代码

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone git@github.com:wenbiyou/ai-ui-vue.git
cd ai-ui-vue
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 运行测试

```bash
npm run test
```

## 📁 项目结构

```
ai-ui-vue/
├── packages/          # 组件源码
│   ├── core/        # 核心组件（AiInput、AiMessage、AiLoader）
│   ├── markdown/    # Markdown 相关组件（AiMarkdown）
│   └── index.ts     # 统一导出入口
├── tests/            # 单元测试
├── examples/         # 示例代码（TODO）
├── docs/            # 文档源码（TODO - Vitepress）
├── dist/            # 构建产物（自动生成）
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## 🛠️ 开发指南

### 新增组件

1. **创建组件文件**

在 `packages/` 下创建新的 Vue 组件：

```vue
<template>
  <div class="ai-component">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
export interface AiComponentProps {
  // 定义 Props 类型
}

const props = defineProps<AiComponentProps>()
</script>

<style scoped>
.ai-component {
  /* 组件样式 */
}
</style>
```

2. **导出组件**

在 `packages/index.ts` 中导出新组件：

```typescript
export { default as AiComponent } from './core/AiComponent.vue'
export type { AiComponentProps } from './core/AiComponent.vue'
```

### 组件规范

- ✅ **TypeScript** - 所有组件必须使用 TypeScript
- ✅ **命名规范** - 组件名以 `Ai` 开头（如 `AiButton`）
- ✅ **Props 定义** - 明确定义 Props 和 Emits 类型
- ✅ **CSS 变量** - 使用 CSS 变量支持主题定制
- ✅ **单元测试** - 每个组件必须有测试覆盖

### 主题系统

组件使用 CSS 变量支持主题：

```css
.ai-component {
  border: 1px solid var(--ai-border-color, #e5e7eb);
  background: var(--ai-bg-color, #fff);
  color: var(--ai-text-color, #1f2937);
}
```

## 🧪 测试指南

### 编写测试

使用 Vitest + Vue Test Utils：

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiComponent from '../packages/core/AiComponent.vue'

describe('AiComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(AiComponent)
    expect(wrapper.find('.ai-component').exists()).toBe(true)
  })

  it('emits events', async () => {
    const wrapper = mount(AiComponent)
    await wrapper.find('.ai-component').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

### 运行测试

```bash
# 运行所有测试
npm run test

# 运行测试 UI 模式
npm run test:ui

# 查看测试覆盖率
npm run test -- --coverage
```

## 📝 提交规范

### Commit Message 格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**

- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式调整（不影响功能）
- `refactor` - 重构（既不是新增功能也不是修复 Bug）
- `test` - 增加测试
- `chore` - 构建过程或辅助工具的变动
- `perf` - 性能优化
- `ci` - CI 配置文件和脚本的变动
- `build` - 影响构建系统或外部依赖的变动

**Scope 范围：**

- 组件名（如 `AiInput`、`AiMessage`）
- `core` - 核心逻辑
- `docs` - 文档
- `test` - 测试
- `build` - 构建配置

**示例：**

```
feat(AiInput): 支持自动调整高度

- 添加 autoResize prop
- 监听 input 事件动态调整高度
- 默认启用

Closes #1
```

### Commit Message Checklist

- [ ] Commit message 格式正确
- [ ] 代码通过 ESLint 检查：`npm run lint`
- [ ] 代码通过 Prettier 格式化：`npm run format`
- [ ] 所有测试通过：`npm run test`
- [ ] 构建成功：`npm run build`

## 🔄 Pull Request 流程

### PR Checklist

- [ ] 遵循本项目代码规范
- [ ] 更新了相关文档
- [ ] 添加了必要的测试用例
- [ ] 所有测试通过
- [ ] 没有引入新的警告
- [ ] PR 标题格式正确：`feat: 新功能` 或 `fix: 修复 Bug`

### PR 标题格式

```
<type>: <简短描述>
```

例如：
```
feat: 添加 AiChat 流式对话组件
fix: 修复 AiMessage 在暗黑模式下的样式问题
```

## 🏗️ 构建

### 开发构建

```bash
npm run build
```

构建产物在 `dist/` 目录，包含：
- `ai-ui-vue.es.js` - ES Module 格式
- `ai-ui-vue.umd.js` - UMD 格式
- `style.css` - 样式文件

### 文档构建（TODO）

```bash
npm run docs:dev    # 开发模式
npm run docs:build   # 构建文档
```

## 🤔 常见问题

### Q: 如何本地测试组件？

A: 在 `examples/` 目录下创建示例页面，或在 `tests/` 目录下编写测试用例。

### Q: 主题变量有哪些？

A: 参考现有组件中使用的 CSS 变量：
- `--ai-primary-color` - 主题色（默认 #6366f1）
- `--ai-border-color` - 边框色（默认 #e5e7eb）
- `--ai-bg-color` - 背景色（默认 #fff）
- `--ai-text-color` - 文本色（默认 #1f2937）
- `--ai-text-secondary` - 次要文字色（默认 #6b7280）

### Q: 如何发布新版本？

A: 维护者会定期发布新版本，通过以下流程：
1. 更新 `package.json` 中的 `version`
2. 运行 `npm run build`
3. 生成 CHANGELOG.md
4. 提交并打 Tag
5. 发布到 NPM

## 📧 行为准则

- [ ] 尊重他人的代码
- [ ] 代码审查要建设性
- [ ] 避免重复劳动
- [ ] 关注问题，不仅仅是代码

## 📞 联系方式

- 🐛 提交 Bug：[GitHub Issues](https://github.com/wenbiyou/ai-ui-vue/issues)
- 💡 功能建议：[GitHub Discussions](https://github.com/wenbiyou/ai-ui-vue/discussions)
- 📧 其他问题：[GitHub Issues](https://github.com/wenbiyou/ai-ui-vue/issues)

---

**再次感谢你的贡献！** 🎉
