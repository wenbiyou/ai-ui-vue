# AiMarkdown

Markdown 渲染组件，内置代码高亮，支持 GitHub Flavored Markdown，专为 AI 输出内容设计。

## 基础用法

:::demo

```vue
<template>
  <AiMarkdown :content="markdownText" />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const markdownText = ref(`
# 标题一

这是一段**加粗**文字和一段*斜体*文字。

## 二级标题

这是一个[链接](https://github.com)，带有行内代码 \`const hello = "world"\`。

> 这是一段引用blockquote

- 列表项目 1
- 列表项目 2
- 列表项目 3
`)
</script>
```

:::

## 常用 Markdown 语法展示

### 标题

:::demo

```vue
<template>
  <AiMarkdown :content="content" />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const content = ref(`
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题
`)
</script>
```

:::

### 文本格式

:::demo

```vue
<template>
  <AiMarkdown :content="content" />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const content = ref(`
**这是加粗文本**

*这是斜体文本*

***这是粗斜体***

~~这是删除线~~

这是普通文本，这是\`行内代码\`。
`)
</script>
```

:::

### 代码高亮

:::demo

```vue
<template>
  <AiMarkdown :content="content" />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const content = ref(`
\`\`\`javascript
// JavaScript 代码高亮示例
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Hello, \${name}!\`;
}

const arrowFunc = () => {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
};
\`\`\`

\`\`\`typescript
// TypeScript 代码高亮示例
interface Person {
  name: string;
  age: number;
  greet(): string;
}

class User implements Person {
  constructor(
    public name: string,
    public age: number
  ) {}

  greet(): string {
    return \`Hello, my name is \${this.name}\`;
  }
}
\`\`\`

\`\`\`vue
<template>
  <div class="component">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Hello World')
</script>
\`\`\`
`)
</script>
```

:::

### 列表

:::demo

```vue
<template>
  <AiMarkdown :content="content" />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const content = ref(`
### 无序表示例

- 第一项
- 第二项
- 第三项
  - 子项目 1
  - 子项目 2
- 第四项

### 有序表示例

1. 第一步
2. 第二步
3. 第三步
   1. 子步骤 1
   2. 子步骤 2
4. 第四步

### 任务列表

- [ ] 未完成任务
- [x] 已完成任务
- [ ] 等待处理的任务
- [x] 已发布版本
`)
</script>
```

:::

### 表格

:::demo

```vue
<template>
  <AiMarkdown :content="content" />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const content = ref(`
| 组件名 | 描述 | 状态 |
|--------|------|------|
| AiInput | Prompt 输入框 | ✅ 完成 |
| AiMessage | 消息气泡 | ✅ 完成 |
| AiLoader | 加载状态 | ✅ 完成 |
| AiMarkdown | Markdown 渲染 | ✅ 完成 |
| AiChat | 完整对话组件 | ⏳ 开发中 |
`)
</script>
```

:::

### 引用块

:::demo

```vue
<template>
  <AiMarkdown :content="content" />
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const content = ref(`
> 这是一级引用
>> 这是嵌套的二级引用
>>> 这是更深层级的引用

> **提示：** AiMarkdown 组件内置了代码高亮，支持多种编程语言，开箱即用。
`)
</script>
```

:::

## 组合场景

### 在 AiMessage 中使用（AI 回复内容渲染）

:::demo

```vue
<template>
  <div style="max-width: 600px;">
    <AiMessage role="user" content="请介绍一下 Vue3 的组合式 API" />
    <AiMessage role="assistant">
      <AiMarkdown :content="reply" />
    </AiMessage>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const reply = ref(`
组合式 API 是 Vue3 引入的一种新的代码组织方式，主要优点包括：

1. **更好的类型推断**：对 TypeScript 支持更友好
2. **更灵活的代码组织**：可以按逻辑关注点组织代码
3. **更好的逻辑复用**：更容易抽出可复用的组合式函数
4. **更小的包体积**：按需导入，Tree-shaking 友好

## 示例代码

\`\`\`vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

const increment = () => count.value++
</script>

<template>
  <div>
    <p>计数: {{ count }}</p>
    <p>双倍: {{ double }}</p>
    <button @click="increment">增加</button>
  </div>
</script>
\`\`\`

| 特性 | Options API | Composition API |
|------|-------------|-----------------|
| 类型推断 | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 代码组织 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 逻辑复用 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
`)
</script>
```

:::

### 在流式输出中使用

配合 SSE 流式输出，逐步渲染内容：

:::demo

```vue
<template>
  <div style="max-width: 600px;">
    <AiMessage role="user" content="讲一个关于程序员的笑话" />
    <AiMessage role="assistant">
      <AiMarkdown :content="content" />
      <AiLoader v-if="isLoading" type="typing" size="small" />
    </AiMessage>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { AiInput, AiMessage, AiLoader, AiMarkdown } from 'ai-ui-vue'

const content = ref('')
const isLoading = ref(true)

onMounted(() => {
  const fullText = `
为什么程序员总是分不清万圣节和圣诞节？

因为：
- **31 OCT** = 31 十月万圣节
- **25 DEC** = 25 十二月圣诞节

而在二进制中：

\`\`\`
31 in octal  = 25 in decimal
\`\`\`

所以 31 OCT = 25 DEC 😂
`

  let i = 0
  const interval = setInterval(() => {
    content.value = fullText.slice(0, i)
    i++
    if (i >= fullText.length) {
      clearInterval(interval)
      isLoading.value = false
    }
  }, 30)
})
</script>
```

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | Markdown 文本内容 | `string` | - |
| breaks | 是否启用换行转换 | `boolean` | `true` |
| gfm | 是否启用 GitHub Flavored Markdown | `boolean` | `true` |

## 支持的语法

- ✅ 标题（H1-H6）
- ✅ 段落和换行
- ✅ 强调（粗体、斜体、删除线）
- ✅ 列表（有序、无序、任务列表）
- ✅ 代码块（带语法高亮）
- ✅ 行内代码
- ✅ 表格
- ✅ 链接
- ✅ 图片
- ✅ 引用块
- ✅ 分割线
- ✅ HTML 嵌入

## 支持的代码高亮语言

- JavaScript / TypeScript / JSX / TSX
- Vue / HTML / CSS / SCSS
- Python / Java / C / C++ / Go / Rust
- JSON / YAML / XML / SQL
- Bash / Shell / Dockerfile
- 更多语言由 highlight.js 自动支持

## 样式定制

组件使用 `.ai-markdown` 类，可以通过 CSS 深度选择器自定义样式：

```css
.ai-markdown :deep(h1) {
  color: #6366f1;
  border-bottom: 1px solid #e5e7eb;
}

.ai-markdown :deep(pre) {
  background: #1f2937;
  border-radius: 6px;
}

.ai-markdown :deep(table) {
  border-collapse: collapse;
}

.ai-markdown :deep(th), .ai-markdown :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 6px 12px;
}
```
