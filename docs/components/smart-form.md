# SmartForm

AI 辅助智能表单，支持配置化字段、AI 补全、自动校验。

## 基础用法

配置化创建表单，支持 AI 补全：

:::demo

```vue
<template>
  <div style="max-width: 600px; margin: 0 auto;">
    <SmartForm
      v-model="formData"
      :fields="fields"
      @ai-complete="handleAiComplete"
      @validate="handleValidate"
      ref="smartFormRef"
    />
    <div style="margin-top: 20px;">
      <button class="submit-btn" @click="submitForm">提交表单</button>
    </div>
    <div v-if="result" style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 6px;">
      <pre style="margin: 0; font-size: 12px;">{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SmartForm } from 'ai-ui-vue'

const formData = ref({
  name: '',
  age: '',
  bio: '',
  role: ''
})

const result = ref(null)
const smartFormRef = ref(null)

const fields = [
  {
    key: 'name',
    label: '姓名',
    type: 'text',
    required: true,
    placeholder: '请输入您的姓名',
    aiEnabled: true,
    description: 'AI 可以帮你生成个性化简介'
  },
  {
    key: 'age',
    label: '年龄',
    type: 'number',
    required: true,
    aiEnabled: false
  },
  {
    key: 'bio',
    label: '个人简介',
    type: 'textarea',
    required: false,
    aiEnabled: true,
    description: '点击 AI 补全自动生成简介'
  },
  {
    key: 'role',
    label: '角色',
    type: 'select',
    required: true,
    aiEnabled: false,
    options: [
      { label: '前端开发', value: 'frontend' },
      { label: '后端开发', value: 'backend' },
      { label: '全栈开发', value: 'fullstack' },
      { label: '产品经理', value: 'product' }
    ]
  }
]

// 模拟 AI 补全
const handleAiComplete = async (fieldKey, currentValue) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  if (fieldKey === 'name' && currentValue) {
    // 根据姓名生成个性化介绍
    formData.value.bio = `我是${currentValue}，一名热爱技术的前端开发者，专注于 AI 应用前端开发，喜欢探索新技术。`
  } else if (fieldKey === 'bio') {
    const roleField = fields.find(f => f.key === 'role')
    const roleOption = roleField?.options?.find(o => o.value === formData.value.role)
    const rolePrefix = formData.value.role ? `我是一名${roleOption?.label}，` : ''
    formData.value.bio = `${rolePrefix}拥有多年开发经验，热衷于构建高性能用户体验优秀的前端应用，近期专注探索 AI 与前端的结合。`
  }

  formData.value = { ...formData.value } // 触发响应式更新
}

const handleValidate = (isValid, errors) => {
  console.log('校验结果:', isValid, errors)
}

const submitForm = () => {
  const isValid = smartFormRef.value?.validate()
  if (isValid) {
    result.value = formData.value
  }
}
</script>

<style scoped>
.submit-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: var(--ai-primary-color, #6366f1);
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.submit-btn:hover {
  opacity: 0.9;
}
</style>
```

:::

## 全部字段类型

SmartForm 支持多种字段类型：

:::demo

```vue
<template>
  <div style="max-width: 500px;">
    <SmartForm v-model="formData" :fields="fields" :show-ai-actions="false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SmartForm } from 'ai-ui-vue'

const formData = ref({})

const fields = [
  { key: 'text', label: '单行文本', type: 'text', placeholder: '这是单行文本输入' },
  { key: 'textarea', label: '多行文本', type: 'textarea', placeholder: '这是多行文本输入' },
  { key: 'number', label: '数字', type: 'number' },
  { key: 'select', label: '下拉选择', type: 'select', options: [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' }
  ]}
]
</script>
```

:::

## API

### Props

| 参数             | 说明                       | 类型             | 默认值             |
| ---------------- | -------------------------- | ---------------- | ----------------- |
| modelValue       | 表单数据（支持 v-model）   | `Record<string, any>` | `{}` |
| fields           | 字段配置列表               | `SmartFormField[]` | - |
| disabled         | 是否禁用整个表单           | `boolean`        | `false` |
| showAiActions    | 是否显示 AI 操作按钮       | `boolean`        | `true` |

### Events

| 事件名            | 说明                 | 参数                |
| ----------------- | -------------------- | ------------------- |
| update:modelValue | 表单数据更新         | `value: Record<string, any>` |
| `ai-complete`     | 请求 AI 补全         | `fieldKey: string, currentValue: any` |
| `validate`        | 表单校验完成         | `isValid: boolean, errors: Record<string, string>` |

### SmartFormField 结构

| 字段        | 说明         | 类型                          | 必填 |
| ----------- | ------------ | ----------------------------- | ---- |
| key         | 字段唯一 key | `string`                      | ✅ |
| label       | 字段标签     | `string`                      | ✅ |
| type        | 字段类型     | `'text' \| 'number' \| 'textarea' \| 'select'` | ✅ |
| required    | 是否必填     | `boolean`                     | ❌ |
| placeholder | 占位符提示   | `string`                      | ❌ |
| description | 字段描述     | `string`                      | ❌ |
| options     | 选项（select 必填） | `Array<{label: string, value: any}>` | select ✅ |
| aiEnabled   | 是否启用 AI 补全 | `boolean`                   | ❌ |

### Exposed

组件暴露了以下方法供父组件调用：

| 方法名    | 说明         | 返回值  |
| --------- | ------------ | ------ |
| validate  | 校验所有字段 | `boolean` 是否校验通过 |
| errors    | 当前错误对象 | `Record<string, string>` |

## 主题定制

使用 CSS 变量自定义样式：

```css
.smart-form {
  --ai-border-color: #e5e7eb;
  --ai-primary-color: #6366f1;
  --ai-bg-color: #fff;
  --ai-text-color: #1f2937;
  --ai-text-secondary: #6b7280;
}
```
