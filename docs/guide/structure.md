# 项目结构

## 目录结构

```
ai-ui-vue/
├── packages/              # 组件源码
│   ├── core/            # 核心组件
│   │   ├── AiInput.vue
│   │   ├── AiMessage.vue
│   │   ├── AiLoader.vue
│   │   └── *.example.vue # 组件示例
│   ├── markdown/         # Markdown 相关组件
│   │   ├── AiMarkdown.vue
│   │   └── *.example.vue
│   └── index.ts         # 统一导出入口
├── tests/                # 单元测试
│   └── *.test.ts
├── examples/             # 完整示例
│   └── index.vue
├── docs/                 # Vitepress 文档
│   ├── .vitepress/
│   │   └── config.ts   # Vitepress 配置
│   ├── index.md          # 文档首页
│   ├── guide/            # 指南文档
│   └── components/       # 组件文档
├── src/                  # 开发模式入口
│   ├── main.ts
│   ├── style.css
│   └── App.vue
├── dist/                 # 构建产物（自动生成）
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vitest.config.ts
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

## 各目录说明

### packages/

**组件源码目录**，包含所有组件的实现。

- `core/` - 核心组件（AiInput、AiMessage、AiLoader）
- `markdown/` - Markdown 相关组件（AiMarkdown）
- `index.ts` - 统一导出所有组件

### tests/

**单元测试目录**，使用 Vitest + Vue Test Utils。

### examples/

**完整示例目录**，包含实际使用场景的演示。

### docs/

**Vitepress 文档目录**，包含：
- 配置文件：`.vitepress/config.ts`
- 首页：`index.md`
- 指南：`guide/getting-started.md`
- 组件：`components/*.md`

### src/

**开发模式入口**，用于本地开发测试组件。

### dist/

**构建产物目录**，通过 `npm run build` 生成：

```
dist/
├── ai-ui-vue.es.js       # ES Module 格式
├── ai-ui-vue.umd.js      # UMD 格式
└── style.css             # 样式文件
```

## 组件开发流程

1. 在 `packages/` 对应目录创建组件文件
2. 编写组件逻辑和样式
3. 在 `packages/index.ts` 导出组件
4. 在 `tests/` 编写单元测试
5. 运行 `npm run test` 验证
6. 更新 `docs/components/` 添加文档

## 示例开发流程

1. 在 `examples/` 创建示例页面
2. 实际使用组件展示功能
3. 运行 `npm run dev` 预览效果
4. 验证功能正常
