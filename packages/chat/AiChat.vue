<template>
  <div class="ai-chat">
    <div class="ai-chat__messages" ref="messagesRef">
      <div v-for="(message, index) in modelValue" :key="index" class="ai-chat__message-item">
        <AiMessage
          :role="message.role"
          :content="message.content"
          :show-avatar="showAvatars"
          :show-timestamp="showTimestamps"
          :timestamp="message.timestamp"
        />
      </div>
      <div v-if="loading" class="ai-chat__loading">
        <AiLoader type="dots" />
      </div>
    </div>
    <div class="ai-chat__input-wrapper">
      <AiInput
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled || loading"
        :show-footer="true"
        @submit="handleSubmit"
      >
        <template #actions>
          <button
            class="ai-chat__send-btn"
            :disabled="disabled || loading || !inputValue.trim()"
            @click="handleSubmit"
          >
            {{ loading ? '发送中...' : '发送' }}
          </button>
        </template>
      </AiInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import AiMessage from '../core/AiMessage.vue'
import AiInput from '../core/AiInput.vue'
import AiLoader from '../core/AiLoader.vue'

/**
 * AiChat 消息结构定义
 */
export interface ChatMessage {
  /** 消息角色 */
  role: 'user' | 'assistant' | 'system'
  /** 消息内容 */
  content: string
  /** 时间戳 */
  timestamp?: Date
}

/**
 * AiChat 组件 Props 定义
 * @description 完整流式对话组件，专为 AI 聊天场景设计，支持 v-model 双向绑定
 */
export interface AiChatProps {
  /** 消息列表，支持 v-model 双向绑定 */
  modelValue?: ChatMessage[]
  /** 是否加载中（流式响应时设置为 true） */
  loading?: boolean
  /** 是否禁用输入 */
  disabled?: boolean
  /** 输入框占位符 */
  placeholder?: string
  /** 是否显示头像 */
  showAvatars?: boolean
  /** 是否显示时间戳 */
  showTimestamps?: boolean
  /** 是否自动滚动到底部当消息更新 */
  autoScroll?: boolean
}

/**
 * AiChat 组件 Events 定义
 */
export interface AiChatEmits {
  /** 消息列表更新，用于 v-model 双向绑定 */
  (e: 'update:modelValue', messages: ChatMessage[]): void
  /** 用户提交消息时触发 */
  (e: 'submit', content: string): void
}

const props = withDefaults(defineProps<AiChatProps>(), {
  modelValue: () => [],
  loading: false,
  disabled: false,
  placeholder: '输入消息...',
  showAvatars: true,
  showTimestamps: false,
  autoScroll: true,
})

const emit = defineEmits<AiChatEmits>()

const inputValue = ref('')
const messagesRef = ref<HTMLDivElement>()

/** 自动滚动到底部 */
const scrollToBottom = () => {
  if (!props.autoScroll) return
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

watch(() => props.modelValue, scrollToBottom, { deep: true })
watch(() => props.loading, scrollToBottom)

const handleSubmit = () => {
  const content = inputValue.value.trim()
  if (!content || props.loading || props.disabled) return

  // 添加用户消息
  const newMessages = [
    ...props.modelValue,
    {
      role: 'user' as const,
      content,
      timestamp: new Date(),
    },
  ]

  emit('update:modelValue', newMessages)
  emit('submit', content)
  inputValue.value = ''
}
</script>

<style scoped>
.ai-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 600px;
  border: 1px solid var(--ai-border-color, #e5e7eb);
  border-radius: 12px;
  background: var(--ai-bg-color, #fff);
  overflow: hidden;
}

.ai-chat__messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.ai-chat__message-item {
  margin-bottom: 8px;
}

.ai-chat__loading {
  padding: 8px 16px;
}

.ai-chat__input-wrapper {
  border-top: 1px solid var(--ai-border-color, #e5e7eb);
  padding: 12px;
}

.ai-chat__send-btn {
  padding: 6px 16px;
  border-radius: 6px;
  border: none;
  background: var(--ai-primary-color, #6366f1);
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.ai-chat__send-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.ai-chat__send-btn:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
