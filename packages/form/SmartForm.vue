<template>
  <div class="smart-form">
    <div
      v-for="field in fields"
      :key="field.key"
      class="smart-form__field"
    >
      <label class="smart-form__label">
        {{ field.label }}
        <span v-if="field.required" class="smart-form__required">*</span>
      </label>
      <div class="smart-form__input-wrapper">
        <input
          v-if="field.type === 'text' || field.type === 'number'"
          v-model="currentModel[field.key]"
          :type="field.type"
          :placeholder="field.placeholder || `请输入${field.label}`"
          :disabled="disabled"
          class="smart-form__input"
          :class="{ 'smart-form__input--error': errors[field.key] }"
          @input="handleInput(field.key)"
          @blur="validateField(field.key)"
        />
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="currentModel[field.key]"
          :placeholder="field.placeholder || `请输入${field.label}`"
          :disabled="disabled"
          class="smart-form__textarea smart-form__input"
          :class="{ 'smart-form__input--error': errors[field.key] }"
          @input="handleInput(field.key)"
          @blur="validateField(field.key)"
        />
        <select
          v-else-if="field.type === 'select'"
          v-model="currentModel[field.key]"
          :disabled="disabled"
          class="smart-form__select smart-form__input"
          :class="{ 'smart-form__input--error': errors[field.key] }"
          @change="validateField(field.key)"
        >
          <option value="">请选择</option>
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <button
          v-if="showAiActions && field.aiEnabled"
          class="smart-form__ai-btn"
          :disabled="disabled || aiCompleting === field.key"
          @click="triggerAiCompletion(field.key)"
        >
          <AiLoader v-if="aiCompleting === field.key" type="spinner" size="small" />
          <span v-else>✨ AI 补全</span>
        </button>
      </div>
      <div v-if="errors[field.key]" class="smart-form__error">
        {{ errors[field.key] }}
      </div>
      <div v-if="field.description" class="smart-form__description">
        {{ field.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AiLoader from '../core/AiLoader.vue'

/**
 * SmartForm 字段配置定义
 */
export interface SmartFormField {
  /** 字段唯一 key */
  key: string
  /** 字段标签 */
  label: string
  /** 字段类型 */
  type: 'text' | 'number' | 'textarea' | 'select'
  /** 是否必填 */
  required?: boolean
  /** 占位符提示 */
  placeholder?: string
  /** 字段描述 */
  description?: string
  /** 选项（select 类型必填） */
  options?: Array<{ label: string; value: any }>
  /** 是否启用 AI 功能 */
  aiEnabled?: boolean
}

/**
 * SmartForm 组件 Props 定义
 * @description AI 辅助智能表单，支持配置化字段、AI 补全、自动校验
 */
export interface SmartFormProps {
  /** 表单数据，支持 v-model 双向绑定 */
  modelValue?: Record<string, any>
  /** 字段配置列表 */
  fields: SmartFormField[]
  /** 是否禁用整个表单 */
  disabled?: boolean
  /** 是否显示 AI 操作按钮 */
  showAiActions?: boolean
}

/**
 * SmartForm 组件 Events 定义
 */
export interface SmartFormEmits {
  /** 表单数据更新，用于 v-model */
  (e: 'update:modelValue', value: Record<string, any>): void
  /** 请求 AI 补全 */
  (e: 'ai-complete', fieldKey: string, currentValue: any): void
  /** 表单校验完成 */
  (e: 'validate', isValid: boolean, errors: Record<string, string>): void
}

const props = withDefaults(defineProps<SmartFormProps>(), {
  modelValue: () => ({}),
  disabled: false,
  showAiActions: true
})

const emit = defineEmits<SmartFormEmits>()

const currentModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const errors = ref<Record<string, string>>({})
const aiCompleting = ref<string | null>(null)

const validateField = (key: string) => {
  const field = props.fields.find(f => f.key === key)
  if (!field) return true

  let error = ''
  const value = currentModel.value[key]

  if (field.required && (value === undefined || value === '' || value === null)) {
    error = `${field.label}不能为空`
  }

  errors.value = { ...errors.value, [key]: error }
  return !error
}

const validateAll = () => {
  let isValid = true
  errors.value = {}

  for (const field of props.fields) {
    if (!validateField(field.key)) {
      isValid = false
    }
  }

  emit('validate', isValid, errors.value)
  return isValid
}

const handleInput = (key: string) => {
  // 清除错误
  if (errors.value[key]) {
    errors.value = { ...errors.value, [key]: '' }
  }
  emit('update:modelValue', currentModel.value)
}

const triggerAiCompletion = (key: string) => {
  aiCompleting.value = key
  emit('ai-complete', key, currentModel.value[key])
}

// 暴露给父组件
const expose = {
  validate: validateAll,
  errors: errors
}

defineExpose(expose)
</script>

<style scoped>
.smart-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.smart-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.smart-form__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--ai-text-color, #1f2937);
}

.smart-form__required {
  color: #ef4444;
  margin-left: 4px;
}

.smart-form__input-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.smart-form__input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--ai-border-color, #e5e7eb);
  border-radius: 6px;
  font-size: 14px;
  color: var(--ai-text-color, #1f2937);
  background: var(--ai-bg-color, #fff);
  transition: border-color 0.2s;
  outline: none;
}

.smart-form__input:focus {
  border-color: var(--ai-primary-color, #6366f1);
}

.smart-form__input--error {
  border-color: #ef4444;
}

.smart-form__textarea {
  min-height: 80px;
  resize: vertical;
}

.smart-form__select {
  cursor: pointer;
}

.smart-form__ai-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 12px;
  border: 1px dashed var(--ai-primary-color, #6366f1);
  border-radius: 6px;
  background: transparent;
  color: var(--ai-primary-color, #6366f1);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.smart-form__ai-btn:hover:not(:disabled) {
  background: var(--ai-primary-color, #6366f1);
  color: white;
}

.smart-form__ai-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.smart-form__error {
  font-size: 12px;
  color: #ef4444;
}

.smart-form__description {
  font-size: 12px;
  color: var(--ai-text-secondary, #6b7280);
}
</style>
