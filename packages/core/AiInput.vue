<template>
  <div class="ai-input" :class="{ 'ai-input--focused': isFocused }">
    <textarea
      ref="textareaRef"
      v-model="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      class="ai-input__textarea"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="handleInput"
      @keydown="handleKeydown"
    />
    <div v-if="showFooter" class="ai-input__footer">
      <span v-if="showCharCount" class="ai-input__char-count">
        {{ currentLength }}{{ maxlength ? ` / ${maxlength}` : '' }}
      </span>
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

/**
 * AiInput 组件 Props 定义
 * @description Prompt 输入框，专为 AI 对话场景设计，支持自动调整高度、字符计数、键盘快捷键
 */
export interface AiInputProps {
  /** 输入框的值，支持 v-model 双向绑定 */
  modelValue?: string
  /** 占位符提示文本 */
  placeholder?: string
  /** 是否禁用输入 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 最大输入字符长度，不限制则不设置 */
  maxlength?: number
  /** 是否显示底部操作栏 */
  showFooter?: boolean
  /** 是否显示当前字符计数 */
  showCharCount?: boolean
  /** 是否在组件挂载后自动聚焦 */
  autofocus?: boolean
  /** 是否自动调整高度随内容变化 */
  autoResize?: boolean
}

/**
 * AiInput 组件 Events 定义
 */
export interface AiInputEmits {
  /** 输入内容更新时触发，用于 v-model 双向绑定 */
  (e: 'update:modelValue', value: string): void
  /** 用户按下 Enter（不按住 Shift）提交时触发 */
  (e: 'submit'): void
  /** 用户按下 Escape 取消输入时触发 */
  (e: 'cancel'): void
}

/**
 * AiInput 组件 Slots 定义
 * @slot actions - 底部操作栏右侧自定义内容，比如发送按钮
 */
const props = withDefaults(defineProps<AiInputProps>(), {
  modelValue: '',
  placeholder: '输入内容...',
  disabled: false,
  readonly: false,
  showFooter: true,
  showCharCount: true,
  autofocus: false,
  autoResize: true,
})

/** 组件事件发射 */
const emit = defineEmits<AiInputEmits>()

const textareaRef = ref<HTMLTextAreaElement>()
const isFocused = ref(false)

const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const currentLength = computed(() => innerValue.value.length)

watch(() => props.autofocus, (val) => {
  if (val) {
    nextTick(() => {
      textareaRef.value?.focus()
    })
  }
})

const handleInput = () => {
  if (props.autoResize && textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('submit')
  } else if (e.key === 'Escape') {
    emit('cancel')
  }
}
</script>

<style scoped>
.ai-input {
  position: relative;
  border: 1px solid var(--ai-border-color, #e5e7eb);
  border-radius: 8px;
  background: var(--ai-bg-color, #fff);
  transition: border-color 0.2s;
}

.ai-input--focused {
  border-color: var(--ai-primary-color, #6366f1);
}

.ai-input__textarea {
  width: 100%;
  min-height: 60px;
  max-height: 300px;
  padding: 12px 16px;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ai-text-color, #1f2937);
  background: transparent;
  font-family: inherit;
}

.ai-input__textarea::placeholder {
  color: var(--ai-placeholder-color, #9ca3af);
}

.ai-input__textarea:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ai-input__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: 1px solid var(--ai-border-color, #e5e7eb);
}

.ai-input__char-count {
  font-size: 12px;
  color: var(--ai-text-secondary, #6b7280);
}
</style>
