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

export interface AiInputProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  showFooter?: boolean
  showCharCount?: boolean
  autofocus?: boolean
  autoResize?: boolean
}

export interface AiInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<AiInputProps>(), {
  modelValue: '',
  placeholder: '输入内容...',
  disabled: false,
  readonly: false,
  showFooter: true,
  showCharCount: true,
  autofocus: false,
  autoResize: true
})

const emit = defineEmits<AiInputEmits>()

const textareaRef = ref<HTMLTextAreaElement>()
const isFocused = ref(false)

const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
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
